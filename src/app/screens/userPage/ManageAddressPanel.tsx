import React from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
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
    <Card className="account-panel-card" elevation={0}>
      <CardContent className="account-panel-content">
        <Typography className="account-panel-title">Manage Address</Typography>
        <Box className="account-panel-body">
          <TextField
            label="Address"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            multiline
            rows={4}
            className="account-form-field"
          />
          <Button
            variant="contained"
            className="account-panel-save-btn"
            onClick={handleSaveAddress}
          >
            Save Address
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
