import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling, premiumDeleteConfirm, premiumPaymentConfirm, premiumConfirmAlert } from "../../../lib/sweetAlert";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { retrievePausedOrders, retrieveProcessOrders, retrieveFinishedOrders } from "./selector";
import moment from "moment";

interface OrdersListProps {
  status: OrderStatus;
}

export default function OrdersList(props: OrdersListProps) {
  const { status } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderBuilder, authMember, setOrderBuilder } = useGlobals();

  // Get orders based on status
  const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
  );
  const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({ processOrders })
  );
  const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
  );

  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { processOrders } = useSelector(processOrdersRetriever);
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  // Get the correct orders array based on status
  const orders = 
    status === OrderStatus.PAUSE ? pausedOrders :
    status === OrderStatus.PROCESS ? processOrders :
    finishedOrders;

  // Fetch all orders (same as original logic)
  useEffect(() => {
    const order = new OrderService();
    const orderInquiry = {
      page: 1,
      limit: 5,
    };

    // Fetch all order types (same as original)
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data: Order[]) => dispatch(setPausedOrders(data)))
      .catch((err: any) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data: Order[]) => dispatch(setProcessOrders(data)))
      .catch((err: any) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data: Order[]) => dispatch(setFinishedOrders(data)))
      .catch((err: any) => console.log(err));
  }, [orderBuilder, dispatch]);

  // Handlers for PAUSE status
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const result = await premiumDeleteConfirm("this order");
      if (result.isConfirmed) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      
      // Navigate to checkout page with orderId
      history.push(`/checkout?orderId=${orderId}`);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // Handler for PROCESS status
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const result = await premiumConfirmAlert(
        "Confirm Receipt",
        "Have you received your order?",
        "Yes, Received",
        "Cancel"
      );
      if (result.isConfirmed) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
        history.push("/orders/finished");
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack>
      {orders && Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                
                {/* Show date for PROCESS orders */}
                {status === OrderStatus.PROCESS && (
                  <p className={"data-compl"}>
                    {moment().format("YY-MM-DD HH:mm")}
                  </p>
                )}

                {/* Buttons based on status */}
                {status === OrderStatus.PAUSE && (
                  <>
                    <Button
                      value={order._id}
                      variant="contained"
                      color="secondary"
                      className={"cancel-button"}
                      onClick={deleteOrderHandler}
                    >
                      Cancel
                    </Button>
                    <Button
                      value={order._id}
                      variant="contained"
                      className={"pay-button"}
                      onClick={processOrderHandler}
                    >
                      Payment
                    </Button>
                  </>
                )}
                
                {status === OrderStatus.PROCESS && (
                  <Button
                    value={order._id}
                    variant="contained"
                    className={"verify-button"}
                    onClick={finishOrderHandler}
                  >
                    Verify to Fulfil
                  </Button>
                )}
              </Box>
            </Box>
          );
        })
      ) : (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <img
            src={"/icons/noimage-list.svg"}
            style={{ width: 300, height: 300 }}
          />
        </Box>
      )}
    </Stack>
  );
}
