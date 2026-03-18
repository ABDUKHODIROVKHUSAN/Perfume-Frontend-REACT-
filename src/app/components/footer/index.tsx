import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useGlobals } from "../../hooks/useGlobals";

/* ===== STYLES ===== */

const FooterWrapper = styled(Box)`
  width: 100%;
  background: radial-gradient(
      circle at top,
      rgba(194, 122, 93, 0.15),
      transparent 60%
    ),
    linear-gradient(160deg, #3a251d, #241813);
  color: #f2ccb9;
  padding: 80px 0 40px;
`;

const BrandTitle = styled(Typography)`
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
  color: #eaded4;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;

  &:hover {
    color: #f6d9ca;
    transform: translateX(6px);
  }
`;

const SocialIcon = styled(IconButton)`
  color: #f2ccb9;
  border: 1px solid rgba(225, 181, 159, 0.35);
  backdrop-filter: blur(4px);
  transition: all 0.35s ease;

  &:hover {
    color: #2f1f18;
    background: #f2ccb9;
    transform: translateY(-4px) scale(1.15);
    box-shadow: 0 10px 30px rgba(122, 71, 52, 0.4);
  }
`;

const SoftText = styled(Typography)`
  color: #d7c4b8;
  font-size: 14px;
  line-height: 1.7;
`;

/* ===== COMPONENT ===== */

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <FooterWrapper>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          justifyContent="space-between"
        >
          {/* BRAND / MESSAGE */}
          <Box maxWidth={380}>
            <BrandTitle variant="h4" sx={{ color: "#fff" }}>
             ENIGMATIC CARE
            </BrandTitle>

            <Typography
              variant="h6"
              sx={{ mt: 2, color: "#f2ccb9", fontWeight: 500 }}
            >
              Crafted for moments that linger
            </Typography>

            <SoftText sx={{ mt: 2 }}>
              We curate premium fragrances that express personality, emotion,
              and elegance — delivered with care and passion.
            </SoftText>

            <Stack direction="row" spacing={2} mt={4}>
              <SocialIcon>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon>
                <YouTubeIcon />
              </SocialIcon>
            </Stack>
          </Box>

          {/* LINKS */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
            >
              Explore
            </Typography>

            <Stack spacing={1.2}>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/perfumes">Perfumes</FooterLink>
              {authMember && <FooterLink to="/orders">Orders</FooterLink>}
              <FooterLink to="/reviews">Reviews</FooterLink>
              {authMember && <FooterLink to="/member-page">My Page</FooterLink>}
            </Stack>
          </Box>

          {/* CONTACT */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
            >
              Contact
            </Typography>

            <Stack spacing={1.2}>
              <SoftText>Busan, South Korea</SoftText>
              <SoftText>+82 60 331 11 31</SoftText>
              <SoftText>sentryvoid@gmail.com</SoftText>
              <SoftText>Open 24 / 7</SoftText>
            </Stack>
          </Box>
        </Stack>

        <Divider
          sx={{
            mt: 6,
            mb: 3,
            backgroundColor: "#f2ccb9",
            opacity: 0.15,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#d7c4b8",
            fontSize: 13,
          }}
        >
          © {new Date().getFullYear()}  ENIGMATIC PERFUMES — Crafted with elegance.
        </Typography>
      </Container>
    </FooterWrapper>
  );
}
