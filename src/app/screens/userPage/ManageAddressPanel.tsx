import React from "react";
import { Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";
import { MemberUpdateInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

export default function ManageAddressPanel() {
  const { authMember, setAuthMember } = useGlobals();
  const [address, setAddress] = useState<string>(
    authMember?.memberAddress || ""
  );

  const handleAddressChange = (e: T) => {
    setAddress(e.target.value);
  };

  const handleSaveAddress = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (address === "") {
        throw new Error("Address cannot be empty");
      }

      const member = new MemberService();
      const updateInput: MemberUpdateInput = {
        memberNick: authMember.memberNick,
        memberPhone: authMember.memberPhone,
        memberAddress: address,
        memberDesc: authMember.memberDesc,
        memberImage: authMember.memberImage,
      };
      const result = await member.updateMember(updateInput);
      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Address updated successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Card className="checkout-form-card" elevation={0}>
      <CardContent className="checkout-form-content">
        <Typography className="account-panel-title">Manage Address</Typography>
        
        <Stack spacing={2.5} className="checkout-form-stack">
          <TextField
            label="Address *"
            placeholder="Enter your full address"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            multiline
            rows={4}
            className="checkout-form-field"
            required
          />
          <Button
            variant="contained"
            className="checkout-place-order-btn"
            onClick={handleSaveAddress}
            fullWidth
          >
            Save Address
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
