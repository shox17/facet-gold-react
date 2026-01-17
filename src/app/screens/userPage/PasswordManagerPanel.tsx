import React from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
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
    <Card className="checkout-form-card" elevation={0}>
      <CardContent className="checkout-form-content">
        <Typography className="account-panel-title">Password Manager</Typography>
        
        <Stack spacing={2.5} className="checkout-form-stack">
          <TextField
            label="Current Password *"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            fullWidth
            className="checkout-form-field"
            required
          />
          <TextField
            label="New Password *"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            className="checkout-form-field"
            required
          />
          <TextField
            label="Confirm New Password *"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            className="checkout-form-field"
            required
          />
          <Button
            variant="contained"
            className="checkout-place-order-btn"
            onClick={handleChangePassword}
            fullWidth
          >
            Change Password
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
