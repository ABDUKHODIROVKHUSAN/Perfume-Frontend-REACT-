import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Divider,
  Fab,
  useTheme,
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
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import MemberService from "../../services/memberService";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { memberStatus, memberType } from "../../../lib/enums/member.enum";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(4),
  },
}));

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
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
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
      if (!memberNick || !memberPhone || !memberPassword)
        throw new Error(Messages.error3);

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
      if (!memberNick || !memberPassword)
        throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log("error", err);
      handleLoginClose();
      sweetErrorHandling(Messages.error1).then();
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
      {/* Sign Up Modal */}
<Modal
  open={signupOpen}
  onClose={handleSignupClose}
  closeAfterTransition
  sx={{
    backdropFilter: "blur(6px)",
  }}
>
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
        boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
        bgcolor: "#0b0b0b",
      }}
    >
      {/* LEFT – PERFUME IMAGE */}
      <Box
        sx={{
          width: "45%",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.75)), url('/img/singup.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: 3,
        }}
      >
        <Typography
          sx={{
            color: "#e3c08d",
            fontSize: 14,
            letterSpacing: 4,
            fontWeight: 500,
          }}
        >
          EAU DE PARFUM
        </Typography>
      </Box>

      {/* RIGHT – FORM */}
      <Box
        sx={{
          width: "55%",
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, rgba(20,20,20,0.95), rgba(0,0,0,1))",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#e3c08d",
            fontWeight: 600,
            letterSpacing: 2,
            textAlign: "center",
            mb: 1,
          }}
        >
          CREATE ACCOUNT
        </Typography>

        <Typography
          sx={{
            color: "#888",
            fontSize: 12,
            letterSpacing: 1,
            textAlign: "center",
            mb: 3,
          }}
        >
          JOIN THE WORLD OF LUXURY FRAGRANCE
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            fullWidth
            onChange={handleUsername}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#777" }} />
                </InputAdornment>
              ),
            }}
            sx={darkInputStyle}
          />

          <TextField
            label="Phone Number"
            fullWidth
            onChange={handlePhone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroid sx={{ color: "#777" }} />
                </InputAdornment>
              ),
            }}
            sx={darkInputStyle}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            onChange={handlePassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#777" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "#aaa" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={darkInputStyle}
          />

          <Button
            onClick={handleSignUpRequest}
            startIcon={<PersonAddIcon />}
            sx={{
              mt: 2,
              py: 1.4,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#000",
              bgcolor: "#e3c08d",
              borderRadius: "30px",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#f0d9a6",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(227,192,141,0.4)",
              },
            }}
          >
            SIGN UP
          </Button>
        </Stack>
      </Box>
    </Box>
  </Fade>
</Modal>


{/* Login Modal */}
<Modal
  open={loginOpen}
  onClose={handleLoginClose}
  closeAfterTransition
  sx={{ backdropFilter: "blur(6px)" }}
>
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
        boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
        p: 4,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          color: "#e3c08d",
          fontWeight: 600,
          letterSpacing: 2,
          textAlign: "center",
          mb: 1,
        }}
      >
        LOGIN
      </Typography>

      <Typography
        sx={{
          color: "#888",
          fontSize: 12,
          letterSpacing: 1,
          textAlign: "center",
          mb: 3,
        }}
      >
        ACCESS YOUR ACCOUNT
      </Typography>

      {/* Form */}
      <Stack spacing={2}>
        <TextField
          label="Username"
          fullWidth
          onChange={handleUsername}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#777" }} />
              </InputAdornment>
            ),
          }}
          sx={darkInputStyle}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          onChange={handlePassword}
          onKeyDown={handlePasswordKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#777" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ color: "#aaa" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={darkInputStyle}
        />

        {/* Button */}
        <Button
          onClick={handleLoginRequest}
          endIcon={<LoginIcon />}
          sx={{
            mt: 2,
            py: 1.4,
            fontWeight: 600,
            letterSpacing: 2,
            color: "#000",
            bgcolor: "#e3c08d",
            borderRadius: "30px",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#f0d9a6",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 30px rgba(227,192,141,0.4)",
            },
          }}
        >
          LOGIN
        </Button>
      </Stack>
    </Box>
  </Fade>
</Modal>


    </div>
  );
}
