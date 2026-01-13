import React from "react";
import { Container, Box, Typography } from "@mui/material";
import OrdersList from "./OrdersList";
import OrdersNavigation from "./OrdersNavigation";
import { OrderStatus } from "../../../lib/enums/order.enum";
import "../../../css/order.css";

export default function PausedOrdersPage() {
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Box className="order-header">
          <Typography variant="h4" className="order-page-title">Order History</Typography>
        </Box>
        
        <OrdersNavigation />

        <Box className={"order-main-content"}>
          <OrdersList status={OrderStatus.PAUSE} />
        </Box>
      </Container>
    </div>
  );
}
