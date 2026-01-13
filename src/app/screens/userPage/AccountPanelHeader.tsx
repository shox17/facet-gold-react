import React from "react";
import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";

export default function AccountPanelHeader() {
  return (
    <Box className="account-header-section">
      <Box className="account-header-container">
        <Typography className="account-header-title">My Account</Typography>
        <Box className="account-breadcrumbs">
          <NavLink to="/" className="breadcrumb-item">
            Home
          </NavLink>
          <NavigateNextIcon className="breadcrumb-separator" />
          <Typography className="breadcrumb-item active">My Account</Typography>
        </Box>
      </Box>
    </Box>
  );
}
