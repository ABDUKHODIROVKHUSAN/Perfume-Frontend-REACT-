import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/types/search";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
  setLoginOpen: (isOpen: boolean) => void;
  setSignUpOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setLoginOpen,
    handleCloseLogout,
    handleLogoutClick,
    anchorEl,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        backdropFilter: "blur(12px)",
        background:
          "linear-gradient(180deg, rgba(20,20,20,0.92), rgba(10,10,10,0.92))",
        boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          {/* Brand */}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 2,
                background:
                  "linear-gradient(135deg, #e3c08d, #b8945e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ENIGMATIC PERFUMES
            </Typography>
          </NavLink>

          {/* Links */}
          <Stack direction="row" spacing={5} alignItems="center">
            {[
              { label: "Home", path: "/" },
              { label: "Perfumes", path: "/perfumes" },
              { label: "Reviews", path: "/reviews" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    color: "#e8e8e8",
                    fontWeight: 500,
                    letterSpacing: 1,
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: -6,
                      left: 0,
                      background:
                        "linear-gradient(90deg, #e3c08d, #b8945e)",
                      transition: "0.3s ease",
                    },
                    "&:hover": {
                      color: "#e3c08d",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              </NavLink>
            ))}

            {authMember && (
              <NavLink to="/orders" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#e8e8e8",
                    fontWeight: 500,
                    letterSpacing: 1,
                    "&:hover": { color: "#e3c08d" },
                  }}
                >
                  Orders
                </Typography>
              </NavLink>
            )}

            {authMember && (
              <NavLink to="/member-page" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#e8e8e8",
                    fontWeight: 500,
                    letterSpacing: 1,
                    "&:hover": { color: "#e3c08d" },
                  }}
                >
                  My Page
                </Typography>
              </NavLink>
            )}

            {/* Basket */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              onRemove={onRemove}
            />

            {/* Auth */}
            {!authMember ? (
              <Button
                onClick={() => setLoginOpen(true)}
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 50,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#000",
                  background:
                    "linear-gradient(135deg, #e3c08d, #b8945e)",
                  boxShadow:
                    "0 10px 25px rgba(184,148,94,0.45)",
                  transition: "0.35s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 18px 40px rgba(184,148,94,0.65)",
                  },
                }}
              >
                Login
              </Button>
            ) : (
              <Box
                component="img"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/img/black-chair.png"
                }
                onClick={handleLogoutClick}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid #b8945e",
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow:
                      "0 0 0 6px rgba(184,148,94,0.25)",
                  },
                }}
              />
            )}

            {/* Logout Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 3,
                  background:
                    "linear-gradient(180deg, #1b1b1b, #121212)",
                  color: "#fff",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.6)",
                },
              }}
            >
              <MenuItem
                onClick={handleLogoutRequest}
                sx={{
                  gap: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(227,192,141,0.15), transparent)",
                  },
                }}
              >
                <ListItemIcon>
                  <Logout sx={{ color: "#e3c08d" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
