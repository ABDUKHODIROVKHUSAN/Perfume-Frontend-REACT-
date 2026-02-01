import React, { useState } from "react";
import {
  Modal,
  Fade,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  Person,
  Lock,
  PhoneAndroid,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import MemberService from "../../services/memberService";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { memberStatus, memberType } from "../../../lib/enums/member.enum";

const ModalImg = styled.img`
  width: 50%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;

  const [memberNick, setMemberNick] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") handleLoginRequest();
  };

  const handleSignUpRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword) {
        throw new Error(Messages.error3);
      }

      const signUpInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
        memberType: memberType.USER,
        memberStatus: memberStatus.ACTIVE,
        memberPoints: 0,
      };

      const member = new MemberService();
      const result = await member.signup(signUpInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) {
        throw new Error(Messages.error3);
      }

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(Messages.error1);
    }
  };

  const darkInputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#eaeaea",
      backgroundColor: "#111",
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "#2a2a2a",
      },
      "&:hover fieldset": {
        borderColor: "#e3c08d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e3c08d",
        boxShadow: "0 0 10px rgba(227,192,141,0.3)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#888",
    },
  };

  return (
    <div>
      {/* SIGN UP MODAL */}
      <Modal open={signupOpen} onClose={handleSignupClose} closeAfterTransition>
        <Fade in={signupOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 820,
              height: 460,
              display: "flex",
              borderRadius: "24px",
              overflow: "hidden",
              bgcolor: "#0b0b0b",
            }}
          >
            <Box
              sx={{
                width: "45%",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.7)), url('/img/singup.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Box
              sx={{
                width: "55%",
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
                <TextField label="Username" onChange={handleUsername} sx={darkInputStyle} />
                <TextField label="Phone" onChange={handlePhone} sx={darkInputStyle} />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handlePassword}
                  sx={darkInputStyle}
                />
                <Button onClick={handleSignUpRequest} startIcon={<PersonAddIcon />}>
                  SIGN UP
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal open={loginOpen} onClose={handleLoginClose} closeAfterTransition>
        <Fade in={loginOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              borderRadius: "22px",
              bgcolor: "#0b0b0b",
              p: 4,
            }}
          >
            <Stack spacing={2}>
              <TextField label="Username" onChange={handleUsername} sx={darkInputStyle} />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={darkInputStyle}
              />
              <Button onClick={handleLoginRequest} endIcon={<LoginIcon />}>
                LOGIN
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
