import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";


import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { Perfume } from "../../../lib/types/perfume";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
  setSignUpOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    handleCloseLogout,
    handleLogoutClick,
    anchorEl,
    handleLogoutRequest,
    setSignUpOpen,
    setLoginOpen,
  } = props;

  const { authMember } = useGlobals();
  const [featuredPerfumes, setFeaturedPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get(`${serverApi}/perfume/random`);
        setFeaturedPerfumes(res.data.perfumes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPerfumes();
  }, []);

  return (
    <>
      {/* ================= LUXURY NAVBAR ================= */}
      <AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: "linear-gradient(180deg, rgba(31, 29, 29, 0.85), rgba(0,0,0,0.65))",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(227,192,141,0.15)",
  }}
>
  <Container maxWidth="lg">
    <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
      {/* Brand */}
      <Typography
        component={NavLink}
        to="/"
        sx={{
          fontFamily: "Playfair Display",
          fontSize: 26,
          letterSpacing: 3,
          color: "#e3c08d",
          textDecoration: "none",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -6,
            width: "100%",
            height: 2,
            background: "linear-gradient(90deg, #e3c08d, transparent)",
          },
        }}
      >
        ENIGMATIC PERFUMES
      </Typography>

      {/* Menu */}
      <Stack direction="row" spacing={4} alignItems="center">
        {["Home", "Perfumes", "Reviews"].map((item) => (
          <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                style={{
                    textDecoration: "none",
                    color: "#f5f5f5",
                    fontWeight: 500,
                    letterSpacing: 1,
                }}
                activeStyle={{
                    color: "#e3c08d",
                }}
                >
                {item}
        </NavLink>

        ))}

        {authMember && (
          <>
            <NavLink
                to="/orders"
                style={{
                    textDecoration: "none",
                    color: "#f5f5f5",
                    fontWeight: 500,
                    letterSpacing: 1,
                }}
                activeStyle={{ color: "#e3c08d" }}
                >
                Orders
            </NavLink>

            <NavLink 
                to="/member-page" 
                style= {{
                    textDecoration: "none",
                    color: "#f5f5f5",
                    fontWeight: 500,
                    letterSpacing: 1,
                }}
                activeStyle={{ color: "#e3c08d" }}>
              My Page
            </NavLink>
          </>
        )}

        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          onRemove={onRemove}
        />

        {!authMember ? (
          <Button
            onClick={() => setLoginOpen(true)}
            sx={{
              px: 3.5,
              py: 1,
              borderRadius: "30px",
              fontWeight: 600,
              letterSpacing: 1.5,
              color: "#000",
              background: "linear-gradient(135deg, #e3c08d, #b8945e)",
              boxShadow: "0 8px 25px rgba(227,192,141,0.35)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(227,192,141,0.5)",
              },
            }}
          >
            LOGIN
          </Button>
        ) : (
          <IconButton>
  <Avatar
    onClick={handleLogoutClick}
    src={
      authMember.memberImage
        ? `${serverApi}/${authMember.memberImage}`
        : "/img/black-chair.png"
    }
    sx={{
      cursor: "pointer",
      width: 38,
      height: 38,
      border: "2px solid #e3c08d",
      boxShadow: "0 0 15px rgba(227,192,141,0.5)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.08)",
      },
    }}
  />
</IconButton>

        )}
      </Stack>
    </Toolbar>
  </Container>
</AppBar>
     <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClick={handleCloseLogout}
                            onClose={handleCloseLogout}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}                        >
                            <MenuItem
                                onClick={handleLogoutRequest}

                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: 'blue' }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>


      {/* ================= HERO ================= */}
      <Box
  sx={{
    minHeight: "90vh",
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.47)), url('/img/main.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  }}
>

        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={6}
          >
            <Box maxWidth={500}>
              <Typography
                sx={{
                  fontFamily: "Playfair Display",
                  fontSize: 54,
                  lineHeight: 1.1,
                  color: "#e3c08d",
                }}
              >
                A scent that
                <br />
                defines you
              </Typography>

              <Typography sx={{ mt: 3, color: "#dddddd", fontSize: 18 }}>
                Discover fragrances crafted to express elegance,
                confidence, and timeless beauty.
              </Typography>

              {!authMember && (
                <Button
                  onClick={() => setSignUpOpen(true)}
                  sx={{
                    mt: 4,
                    px: 5,
                    py: 1.5,
                    borderRadius: 50,
                    fontSize: 16,
                    background:
                      "linear-gradient(135deg, #e3c08d, #b8945e)",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  Explore Collection
                </Button>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ================= FEATURED ================= */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: 36,
            mb: 6,
            textAlign: "center",
          }}
        >
          Featured Fragrances
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={4} flexWrap="wrap">
          {featuredPerfumes.map((item) => (
            <Box
              key={item._id.toString()}
              sx={{
                width: 260,
                p: 2,
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, #ffffff, #f3f3f3)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                textAlign: "center",
                transition: "0.4s",
                "&:hover": { transform: "translateY(-8px)" },
              }}
            >
              <img
                src={`${serverApi}/${item.perfumeImages?.[0]}`}
                alt={item.perfumeName}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />

              <Typography mt={2} fontWeight={600}>
                {item.perfumeName}
              </Typography>

              <Typography color="text.secondary">
                ${item.perfumePrice}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box textAlign="center" mt={6}>
          <Button
            component={Link}
            to="/perfumes"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 50,
              background: "#000",
              color: "#e3c08d",
              fontWeight: 600,
            }}
          >
            View All
          </Button>
        </Box>
      </Container>
    </>
  );
}
