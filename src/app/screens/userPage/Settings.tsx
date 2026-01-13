import { Box, TextField, Button, Stack, Avatar, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { Messages, serverApi } from "../../../lib/config";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  /** HANDLERS **/

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className="personal-info-form">
      {/* Profile Image Section */}
      <Box className="personal-info-avatar-section">
        <Box className="personal-info-avatar-wrapper">
          <Avatar
            src={memberImage}
            alt="Profile"
            className="personal-info-avatar"
          />
          <Box className="personal-info-avatar-overlay">
            <Button
              component="label"
              className="personal-info-avatar-upload-btn"
              onChange={handleImageViewer}
            >
              <PhotoCameraIcon className="personal-info-avatar-icon" />
              <input type="file" accept="image/jpeg,image/jpg,image/png" hidden />
            </Button>
          </Box>
        </Box>
        <Box className="personal-info-avatar-info">
          <Typography className="personal-info-avatar-title">Profile Photo</Typography>
          <Typography className="personal-info-avatar-subtitle">
            JPG, JPEG, PNG formats only. Max size 5MB
          </Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <Stack spacing={2.5} className="personal-info-form-fields">
        <TextField
          label="Username *"
          placeholder="Enter your username"
          value={memberUpdateInput.memberNick || ""}
          onChange={memberNickHandler}
          fullWidth
          required
          className="personal-info-field"
        />

        <Box className="personal-info-form-row">
          <TextField
            label="Phone *"
            placeholder="Enter your phone number"
            value={memberUpdateInput.memberPhone || ""}
            onChange={memberPhoneHandler}
            fullWidth
            required
            className="personal-info-field"
          />
          <TextField
            label="Address *"
            placeholder="Enter your address"
            value={memberUpdateInput.memberAddress || ""}
            onChange={memberAddressHandler}
            fullWidth
            required
            className="personal-info-field"
          />
        </Box>

        <TextField
          label="Description *"
          placeholder="Tell us about yourself..."
          value={memberUpdateInput.memberDesc || ""}
          onChange={memberDescriptionHandler}
          fullWidth
          multiline
          rows={4}
          required
          className="personal-info-field"
        />

        <Box className="personal-info-save-section">
          <Button
            variant="contained"
            onClick={handleSubmitButton}
            className="personal-info-save-btn"
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
