import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Stack, TextField, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/auth.css";

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  // Reset form when modal closes
  useEffect(() => {
    if (!signupOpen && !loginOpen) {
      setMemberNick("");
      setMemberPhone("");
      setMemberPassword("");
    }
  }, [signupOpen, loginOpen]);

  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (signupOpen) handleSignupClose();
        if (loginOpen) handleLoginClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [signupOpen, loginOpen, handleSignupClose, handleLoginClose]);

  return (
    <>
      {/* Signup Modal */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        className="auth-modal-container"
        BackdropComponent={Backdrop}
        BackdropProps={{
          className: "auth-modal-backdrop",
          timeout: 400,
        }}
        closeAfterTransition
      >
        <Box
          className="auth-modal-paper"
          onClick={(e) => e.stopPropagation()}
        >
          <Box className="auth-modal-close" onClick={handleSignupClose}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </Box>
          <Stack className="auth-modal-content" direction="row">
            {/* Image Panel */}
            <Box className="auth-modal-image-panel">
              <img src={`${process.env.PUBLIC_URL || ''}/img/banner.jpg`} alt="Luxury Jewellery" />
            </Box>
            {/* Form Panel */}
            <Box className="auth-modal-form-panel">
              <h2 className="auth-modal-title">Create Account</h2>
              <p className="auth-modal-subtitle">Join Facet & Gold</p>
              <Box className="auth-form-container">
                <Box className="auth-form-field-wrapper">
                  <label className="auth-form-label">Username</label>
                  <TextField
                    className="auth-form-input"
                    id="signup-username"
                    name="memberNick"
                    variant="outlined"
                    placeholder="Enter your username"
                    value={memberNick}
                    onChange={handleUsername}
                    fullWidth
                  />
                </Box>
                <Box className="auth-form-field-wrapper">
                  <label className="auth-form-label">Phone Number</label>
                  <TextField
                    className="auth-form-input"
                    id="signup-phone"
                    name="memberPhone"
                    variant="outlined"
                    placeholder="Enter your phone number"
                    value={memberPhone}
                    onChange={handlePhone}
                    fullWidth
                  />
                </Box>
                <Box className="auth-form-field-wrapper">
                  <label className="auth-form-label">Password</label>
                  <TextField
                    className="auth-form-input"
                    id="signup-password"
                    name="memberPassword"
                    type="password"
                    variant="outlined"
                    placeholder="Enter your password"
                    value={memberPassword}
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                    fullWidth
                  />
                </Box>
                <Button
                  className="auth-submit-button"
                  onClick={handleSignupRequest}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        className="auth-modal-container"
        BackdropComponent={Backdrop}
        BackdropProps={{
          className: "auth-modal-backdrop",
          timeout: 400,
        }}
        closeAfterTransition
      >
        <Box
          className="auth-modal-paper"
          onClick={(e) => e.stopPropagation()}
        >
          <Box className="auth-modal-close" onClick={handleLoginClose}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </Box>
          <Stack className="auth-modal-content" direction="row">
            {/* Image Panel */}
            <Box className="auth-modal-image-panel">
              <img src={`${process.env.PUBLIC_URL || ''}/img/banner.jpg`} alt="Luxury Jewellery" />
            </Box>
            {/* Form Panel */}
            <Box className="auth-modal-form-panel">
              <h2 className="auth-modal-title">Welcome Back</h2>
              <p className="auth-modal-subtitle">Sign in to your account</p>
              <Box className="auth-form-container">
                <Box className="auth-form-field-wrapper">
                  <label className="auth-form-label">Username</label>
                  <TextField
                    className="auth-form-input"
                    id="login-username"
                    name="memberNick"
                    variant="outlined"
                    placeholder="Enter your username"
                    value={memberNick}
                    onChange={handleUsername}
                    fullWidth
                  />
                </Box>
                <Box className="auth-form-field-wrapper">
                  <label className="auth-form-label">Password</label>
                  <TextField
                    className="auth-form-input"
                    id="login-password"
                    name="memberPassword"
                    type="password"
                    variant="outlined"
                    placeholder="Enter your password"
                    value={memberPassword}
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                    fullWidth
                  />
                </Box>
                <Button
                  className="auth-submit-button"
                  onClick={handleLoginRequest}
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
