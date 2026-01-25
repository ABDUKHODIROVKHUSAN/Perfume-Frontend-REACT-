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

/* ===== STYLES ===== */

const FooterWrapper = styled(Box)`
  width: 100%;
  background: radial-gradient(
      circle at top,
      rgba(227, 192, 141, 0.08),
      transparent 60%
    ),
    linear-gradient(160deg, #1c1c1c, #111);
  color: #e3c08d;
  padding: 80px 0 40px;
`;

const BrandTitle = styled(Typography)`
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
  color: #cfcfcf;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;

  &:hover {
    color: #e3c08d;
    transform: translateX(6px);
  }
`;

const SocialIcon = styled(IconButton)`
  color: #e3c08d;
  border: 1px solid rgba(227, 192, 141, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.35s ease;

  &:hover {
    color: #111;
    background: #e3c08d;
    transform: translateY(-4px) scale(1.15);
    box-shadow: 0 10px 30px rgba(227, 192, 141, 0.4);
  }
`;

const SoftText = styled(Typography)`
  color: #b9b9b9;
  font-size: 14px;
  line-height: 1.7;
`;

/* ===== COMPONENT ===== */

export default function Footer() {
  const authMember = null;

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
              sx={{ mt: 2, color: "#e3c08d", fontWeight: 500 }}
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
              <FooterLink to="/perfume">Perfumes</FooterLink>
              {authMember && <FooterLink to="/orders">Orders</FooterLink>}
              <FooterLink to="/review">Reviews</FooterLink>
              <FooterLink to="/help">My Page</FooterLink>
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
              <SoftText>📍 Busan, South Korea</SoftText>
              <SoftText>📞 +82 60 331 11 31</SoftText>
              <SoftText>✉ SentryVoid@gmail.com</SoftText>
              <SoftText>⏰ Open 24 / 7</SoftText>
            </Stack>
          </Box>
        </Stack>

        <Divider
          sx={{
            mt: 6,
            mb: 3,
            backgroundColor: "#e3c08d",
            opacity: 0.15,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#9a9a9a",
            fontSize: 13,
          }}
        >
          © {new Date().getFullYear()}  ENIGMATIC PERFUMES — Crafted with elegance.
        </Typography>
      </Container>
    </FooterWrapper>
  );
}
