import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Settings } from "./Settings";

export default function PersonalInformationPanel() {
  return (
    <Card className="account-panel-card" elevation={0}>
      <CardContent className="account-panel-content">
        <Typography className="account-panel-title">Personal Information</Typography>
        <Box className="account-panel-body">
          <Settings />
        </Box>
      </CardContent>
    </Card>
  );
}
