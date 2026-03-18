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
import MenuIcon from "@mui/icons-material/Menu";

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
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Perfumes", to: "/perfumes" },
    { label: "Reviews", to: "/reviews" },
  ];

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
     background:
          "linear-gradient(180deg, rgba(55,34,26,0.95), rgba(35,23,18,0.95))",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(225,181,159,0.25)",
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
          color: "#f4d7c8",
          textDecoration: "none",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -6,
            width: "100%",
            height: 2,
            background: "linear-gradient(90deg, #c27a5d, transparent)",
          },
        }}
      >
        ENIGMATIC PERFUMES
      </Typography>

      {/* Desktop Menu */}
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            style={{
              textDecoration: "none",
              color: "#f5f5f5",
              fontWeight: 500,
              letterSpacing: 1,
            }}
            activeStyle={{ color: "#f4d7c8" }}
          >
            {item.label}
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
              activeStyle={{ color: "#f4d7c8" }}
            >
              Orders
            </NavLink>

            <NavLink
              to="/member-page"
              style={{
                textDecoration: "none",
                color: "#f5f5f5",
                fontWeight: 500,
                letterSpacing: 1,
              }}
              activeStyle={{ color: "#f4d7c8" }}
            >
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
              background: "linear-gradient(135deg, #c27a5d, #7a4734)",
              boxShadow: "0 8px 25px rgba(122,71,52,0.35)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(122,71,52,0.5)",
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
                  : "/icons/default-user.svg"
              }
              sx={{
                cursor: "pointer",
                width: 38,
                height: 38,
                border: "2px solid #c27a5d",
                boxShadow: "0 0 15px rgba(122,71,52,0.45)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            />
          </IconButton>
        )}
      </Stack>

      {/* Mobile Menu */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ display: { xs: "flex", md: "none" } }}
      >
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
              px: 2.2,
              py: 0.8,
              borderRadius: "24px",
              fontWeight: 600,
              letterSpacing: 1.2,
              fontSize: 12,
              color: "#000",
              background: "linear-gradient(135deg, #c27a5d, #7a4734)",
            }}
          >
            LOGIN
          </Button>
        ) : (
          <IconButton onClick={handleLogoutClick}>
            <Avatar
              src={
                authMember.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
              }
              sx={{
                width: 34,
                height: 34,
                border: "2px solid #c27a5d",
              }}
            />
          </IconButton>
        )}

        <IconButton
          onClick={(event) => setMobileMenuAnchorEl(event.currentTarget)}
          sx={{ color: "#f4d7c8" }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  </Container>
</AppBar>
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={mobileMenuOpen}
      onClose={() => setMobileMenuAnchorEl(null)}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        sx: {
          minWidth: 180,
          background: "rgba(24,24,24,0.95)",
          color: "#f5f5f5",
          border: "1px solid rgba(225,181,159,0.3)",
        },
      }}
    >
      {navItems.map((item) => (
        <MenuItem
          key={item.label}
          component={Link}
          to={item.to}
          onClick={() => setMobileMenuAnchorEl(null)}
          sx={{ color: "#f5f5f5" }}
        >
          {item.label}
        </MenuItem>
      ))}
      {authMember && (
        <MenuItem
          component={Link}
          to="/orders"
          onClick={() => setMobileMenuAnchorEl(null)}
          sx={{ color: "#f5f5f5" }}
        >
          Orders
        </MenuItem>
      )}
      {authMember && (
        <MenuItem
          component={Link}
          to="/member-page"
          onClick={() => setMobileMenuAnchorEl(null)}
          sx={{ color: "#f5f5f5" }}
        >
          My Page
        </MenuItem>
      )}
    </Menu>
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
                                    <Logout fontSize="small" style={{ color: '#9b5f46' }} />
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
                  color: "#f2ccb9",
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
                      "linear-gradient(135deg, #c27a5d, #7a4734)",
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
<Box
  sx={{
    py: 14,
    background:
      "linear-gradient(180deg, #fdf9f5 0%, #f8f1ea 100%)",
  }}
>
  <Container maxWidth="lg">
    {/* Title */}
    <Stack alignItems="center" spacing={2} mb={10}>
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          fontSize: { xs: 32, md: 40 },
          letterSpacing: 1,
          color: "#1a1a1a",
        }}
      >
        Featured Fragrances
      </Typography>

      <Typography
        sx={{
          maxWidth: 520,
          textAlign: "center",
          color: "#6b6b6b",
          fontSize: 16,
        }}
      >
        Handpicked scents that define elegance, confidence, and
        unforgettable presence.
      </Typography>

      <Box
        sx={{
          width: 90,
          height: 3,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, #c27a5d, #7a4734)",
        }}
      />
    </Stack>
    

    {/* Cards */}
    <Stack
      direction="row"
      justifyContent="center"
      spacing={7}
      flexWrap="wrap"
    >
      {featuredPerfumes.map((item) => (
        <Box
          key={item._id.toString()}
          sx={{
            width: 280,
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(180deg, #ffffff 0%, #f7f4ef 100%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
            transition: "all 0.45s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-14px)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.28)",
            },
            "&:hover .image": {
              transform: "scale(1.12)",
            },
            "&:hover .overlay": {
              opacity: 1,
            },
          }}
        >
          {/* Image */}
          <Box sx={{ height: 230, overflow: "hidden" }}>
            <Box
              component="img"
              src={`${serverApi}/${item.perfumeImages?.[0]}`}
              alt={item.perfumeName}
              className="image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "0.6s ease",
              }}
            />
          </Box>

          {/* Hover Overlay */}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(122, 71, 52, 0) 30%, rgba(74, 47, 36, 0.7))",
              opacity: 0,
              transition: "0.4s ease",
            }}
          />

          {/* Content */}
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontWeight: 700,
                fontSize: 18,
                mb: 0.5,
              }}
            >
              {item.perfumeName}
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 16,
                color: "#9b5f46",
              }}
            >
              ${item.perfumePrice}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>

    {/* Button */}
    <Box textAlign="center" mt={12}>
      <Button
        component={Link}
        to="/perfumes"
        sx={{
          px: 7,
          py: 1.7,
          borderRadius: 50,
          fontWeight: 700,
          letterSpacing: 1,
          fontSize: 14,
          color: "#000",
          background:
            "linear-gradient(135deg, #c27a5d, #7a4734)",
          boxShadow: "0 15px 35px rgba(122,71,52,0.45)",
          transition: "all 0.35s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 25px 50px rgba(122,71,52,0.55)",
          },
        }}
      >
        View All Fragrances
      </Button>
    </Box>
  </Container>
</Box>
</>
  );
}
