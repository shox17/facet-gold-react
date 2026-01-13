import React from "react";
import { Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export default function OrdersNavigation() {
  const location = useLocation();

  return (
    <Box className={"order-nav-frame"}>
      <Box className="order-nav-links">
        <NavLink
          to="/orders/paused"
          className={`order-nav-link ${location.pathname === "/orders/paused" ? "active" : ""}`}
        >
          Paused Orders
        </NavLink>
        <NavLink
          to="/orders/process"
          className={`order-nav-link ${location.pathname === "/orders/process" ? "active" : ""}`}
        >
          Process Orders
        </NavLink>
        <NavLink
          to="/orders/finished"
          className={`order-nav-link ${location.pathname === "/orders/finished" ? "active" : ""}`}
        >
          Finished Orders
        </NavLink>
      </Box>
    </Box>
  );
}
