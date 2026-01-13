import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function MyOrdersPanel() {
  const history = useHistory();

  return (
    <Card className="account-panel-card" elevation={0}>
      <CardContent className="account-panel-content">
        <Typography className="account-panel-title">My Orders</Typography>
        <Box className="account-panel-body">
          <Box className="account-panel-placeholder">
            <Typography className="account-panel-placeholder-text">
              View and manage your order history
            </Typography>
            <Button
              variant="contained"
              className="account-panel-action-btn"
              onClick={() => history.push("/orders/paused")}
            >
              View Orders
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
