import React, { useState } from "react";
import {
  Modal,
  Fade,
  Backdrop,
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
import MemberService from "../../services/memberService";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { memberStatus, memberType } from "../../../lib/enums/member.enum";

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

  const modalInputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#f8f0ea",
      backgroundColor: "rgba(63, 36, 27, 0.36)",
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "rgba(194, 122, 93, 0.34)",
      },
      "&:hover fieldset": {
        borderColor: "#c27a5d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c27a5d",
        boxShadow: "0 0 0 3px rgba(194, 122, 93, 0.22)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#c8ab98",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#f4d7c8",
    },
    "& .MuiInputAdornment-root svg": {
      color: "#d6b19d",
    },
  };

  const ctaButtonSx = {
    mt: 0.5,
    py: 1.25,
    borderRadius: "999px",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontWeight: 700,
    color: "#fff7f2",
    background: "linear-gradient(135deg, #c27a5d, #7a4734)",
    boxShadow: "0 10px 26px rgba(122, 71, 52, 0.38)",
    "&:hover": {
      background: "linear-gradient(135deg, #b76f53, #6e4030)",
      boxShadow: "0 12px 30px rgba(122, 71, 52, 0.48)",
    },
  };

  return (
    <div>
      {/* SIGN UP MODAL */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 350 } }}
      >
        <Fade in={signupOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", md: 900 },
              maxHeight: "92vh",
              display: "flex",
              borderRadius: "26px",
              overflow: "hidden",
              bgcolor: "#281a14",
              border: "1px solid rgba(194,122,93,0.35)",
              boxShadow: "0 28px 90px rgba(18, 9, 6, 0.6)",
            }}
          >
            <Box
              sx={{
                width: { xs: "0%", md: "42%" },
                display: { xs: "none", md: "block" },
                backgroundImage:
                  "linear-gradient(rgba(34,20,14,.62), rgba(34,20,14,.78)), url('/img/singup.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Box
              sx={{
                width: { xs: "100%", md: "58%" },
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                background:
                  "linear-gradient(180deg, rgba(67,40,30,0.95), rgba(43,26,20,0.97))",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: { xs: 28, md: 36 },
                    color: "#f5d8c9",
                    lineHeight: 1.05,
                  }}
                >
                  Join the House
                </Typography>
                <Typography sx={{ mt: 1, color: "#c9ab98", fontSize: 13 }}>
                  Create your member profile and start curating your signature scent.
                </Typography>
              </Box>

              <Stack spacing={1.8}>
                <TextField
                  label="Username"
                  onChange={handleUsername}
                  sx={modalInputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Phone"
                  onChange={handlePhone}
                  sx={modalInputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroid fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handlePassword}
                  sx={modalInputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={handleSignUpRequest}
                  startIcon={<PersonAddIcon />}
                  sx={ctaButtonSx}
                >
                  SIGN UP
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
      >
        <Fade in={loginOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", sm: 460 },
              borderRadius: "22px",
              border: "1px solid rgba(194,122,93,0.35)",
              bgcolor: "#281a14",
              p: { xs: 3, sm: 4 },
              boxShadow: "0 24px 70px rgba(18, 9, 6, 0.58)",
              background:
                "linear-gradient(180deg, rgba(67,40,30,0.95), rgba(43,26,20,0.97))",
            }}
          >
            <Stack spacing={1.8}>
              <Typography
                sx={{
                  mb: 0.5,
                  fontFamily: "Playfair Display, serif",
                  fontSize: { xs: 30, sm: 34 },
                  color: "#f5d8c9",
                  lineHeight: 1.05,
                }}
              >
                Welcome Back
              </Typography>
              <Typography sx={{ color: "#c9ab98", fontSize: 13, mb: 1 }}>
                Login to access orders, reviews, and your member profile.
              </Typography>
              <TextField
                label="Username"
                onChange={handleUsername}
                sx={modalInputStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={modalInputStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button onClick={handleLoginRequest} endIcon={<LoginIcon />} sx={ctaButtonSx}>
                LOGIN
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
