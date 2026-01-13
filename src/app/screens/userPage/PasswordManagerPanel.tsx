import React from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { T } from "../../../lib/types/common";

export default function PasswordManagerPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (e: T) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e: T) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e: T) => setConfirmPassword(e.target.value);

  const handleChangePassword = () => {
    // Placeholder - implement password change logic if needed
    console.log("Change password");
  };

  return (
    <Card className="account-panel-card" elevation={0}>
      <CardContent className="account-panel-content">
        <Typography className="account-panel-title">Password Manager</Typography>
        <Box className="account-panel-body">
          <TextField
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            fullWidth
            className="account-form-field"
          />
          <TextField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            className="account-form-field"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            className="account-form-field"
          />
          <Button
            variant="contained"
            className="account-panel-save-btn"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
