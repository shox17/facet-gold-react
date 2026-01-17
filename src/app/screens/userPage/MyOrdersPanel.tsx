import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, Chip, Divider } from "@mui/material";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { retrievePausedOrders, retrieveProcessOrders, retrieveFinishedOrders } from "../../screens/ordersPage/selector";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "../../screens/ordersPage/slice";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling, premiumDeleteConfirm, premiumConfirmAlert } from "../../../lib/sweetAlert";
import moment from "moment";
import "../../../css/myOrders.css";

export default function MyOrdersPanel() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderBuilder, authMember, setOrderBuilder } = useGlobals();

  // Redux selectors
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

  // Fetch all orders
  useEffect(() => {
    const order = new OrderService();
    const orderInquiry = {
      page: 1,
      limit: 100,
    };

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

  // Handlers
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const order = new OrderService();
      const input = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const result = await premiumDeleteConfirm("this order");
      if (result.isConfirmed) {
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
      history.push(`/checkout?orderId=${orderId}`);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const renderOrderCard = (order: Order, status: OrderStatus) => {
    const itemsCount = order.orderItems?.length || 0;
    const firstProduct: Product = order.productData?.[0];
    const imagePath = firstProduct?.productImages?.[0]
      ? `${serverApi}/${firstProduct.productImages[0]}`
      : "/icons/default-product.svg";

    return (
      <Card key={order._id} className="my-orders-card" elevation={0}>
        <CardContent className="my-orders-card-content">
          <Box className="my-orders-card-header">
            <Box className="my-orders-card-info">
              <Typography className="my-orders-order-id">
                Order #{order._id.substring(0, 12).toUpperCase()}
              </Typography>
              <Typography className="my-orders-order-date">
                {moment(order.createdAt).format("MMM DD, YYYY")}
              </Typography>
            </Box>
            <Chip
              label={
                status === OrderStatus.PAUSE
                  ? "Unpaid"
                  : status === OrderStatus.PROCESS
                  ? "On Delivery"
                  : "Completed"
              }
              className={`my-orders-status-chip ${
                status === OrderStatus.PAUSE
                  ? "status-unpaid"
                  : status === OrderStatus.PROCESS
                  ? "status-delivery"
                  : "status-completed"
              }`}
              size="small"
            />
          </Box>

          <Divider className="my-orders-card-divider" />

          <Box className="my-orders-card-body">
            <img src={imagePath} alt="Product" className="my-orders-product-image" />
            <Box className="my-orders-card-details">
              <Typography className="my-orders-items-count">
                {itemsCount} {itemsCount === 1 ? "item" : "items"}
              </Typography>
              <Typography className="my-orders-total-price">
                ${order.orderTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Box className="my-orders-card-actions">
            {status === OrderStatus.PAUSE && (
              <>
                <Typography className="my-orders-warning-text">
                  Payment pending
                </Typography>
                <Box className="my-orders-action-buttons">
                  <Button
                    value={order._id}
                    variant="outlined"
                    className="my-orders-action-btn cancel"
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="my-orders-action-btn primary"
                    onClick={processOrderHandler}
                  >
                    Pay Now
                  </Button>
                </Box>
              </>
            )}

            {status === OrderStatus.PROCESS && (
              <>
                <Typography className="my-orders-delivery-status">
                  Being delivered • Expected: {moment().add(7, "days").format("MMM DD, YYYY")}
                </Typography>
                <Button
                  component={NavLink}
                  to={`/orders/${order._id}/manage`}
                  variant="contained"
                  className="my-orders-action-btn primary"
                  fullWidth
                >
                  Track & Manage Order
                </Button>
              </>
            )}

            {status === OrderStatus.FINISH && (
              <Box className="my-orders-action-buttons">
                <Button
                  component={NavLink}
                  to={`/orders/${order._id}/manage`}
                  variant="outlined"
                  className="my-orders-action-btn"
                >
                  View Details
                </Button>
                <Button
                  component={NavLink}
                  to={`/order-actions/${order._id}`}
                  variant="contained"
                  className="my-orders-action-btn primary"
                >
                  Write Review
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="account-panel-card" elevation={0}>
      <CardContent className="account-panel-content">
        <Typography className="account-panel-title">My Orders</Typography>
        <Box className="account-panel-body">
          {/* Paused Orders Section */}
          <Box className="my-orders-section">
            <Box className="my-orders-section-header">
              <Typography className="my-orders-section-title">
                Paused Orders
              </Typography>
              <Typography className="my-orders-section-subtitle">
                Payment pending
              </Typography>
            </Box>
            <Box className="my-orders-cards-grid">
              {pausedOrders && pausedOrders.length > 0 ? (
                pausedOrders.map((order: Order) => renderOrderCard(order, OrderStatus.PAUSE))
              ) : (
                <Box className="my-orders-empty">
                  <Typography className="my-orders-empty-text">
                    No paused orders
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Process Orders Section */}
          <Box className="my-orders-section">
            <Box className="my-orders-section-header">
              <Typography className="my-orders-section-title">
                Process Orders
              </Typography>
              <Typography className="my-orders-section-subtitle">
                On delivery
              </Typography>
            </Box>
            <Box className="my-orders-cards-grid">
              {processOrders && processOrders.length > 0 ? (
                processOrders.map((order: Order) => renderOrderCard(order, OrderStatus.PROCESS))
              ) : (
                <Box className="my-orders-empty">
                  <Typography className="my-orders-empty-text">
                    No orders in process
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Finished Orders Section */}
          <Box className="my-orders-section">
            <Box className="my-orders-section-header">
              <Typography className="my-orders-section-title">
                Finished Orders
              </Typography>
              <Typography className="my-orders-section-subtitle">
                Delivered & completed
              </Typography>
            </Box>
            <Box className="my-orders-cards-grid">
              {finishedOrders && finishedOrders.length > 0 ? (
                finishedOrders.map((order: Order) => renderOrderCard(order, OrderStatus.FINISH))
              ) : (
                <Box className="my-orders-empty">
                  <Typography className="my-orders-empty-text">
                    No completed orders
            </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
