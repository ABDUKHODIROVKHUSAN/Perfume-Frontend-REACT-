import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #2c2929 0%, #2c2a2a 100%)",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 0 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Item */}
          <StatItem
            icon="/icons/Delivery.svg"
            title="Complimentary Delivery"
            subtitle="Luxury fragrances delivered with care"
          />

          <LuxuryDivider />

          <StatItem
            icon="/icons/Shield.svg"
            title="Authenticity Guaranteed"
            subtitle="100% original, premium perfumes only"
          />

          <LuxuryDivider />

          <StatItem
            icon="/icons/Guaranteed.svg"
            title="Quality Promise"
            subtitle="Crafted by the world’s finest houses"
          />

          <LuxuryDivider />

          <StatItem
            icon="/icons/Tools.svg"
            title="Expert Packaging"
            subtitle="Perfectly presented, ready to impress"
          />
        </Stack>
      </Container>
    </Box>
  );
}

/* ---------- Reusable Components ---------- */

function StatItem({ icon, title, subtitle }: any) {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      spacing={1.5}
      sx={{
        px: 3,
        transition: "all 0.3s ease",
        "&:hover img": {
          transform: "scale(1.1)",
          filter: "drop-shadow(0 0 12px rgba(212,175,55,0.6))",
        },
      }}
    >
      <Box
        component="img"
        src={icon}
        alt=""
        sx={{
          width: 52,
          height: 52,
          mb: 1,
          transition: "all 0.3s ease",
        }}
      />

      <Typography
        sx={{
          color: "#D4AF37", // luxury gold
          fontWeight: 600,
          letterSpacing: "0.5px",
          fontSize: "1rem",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#cfcfcf",
          fontSize: "0.85rem",
          maxWidth: 180,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}

function LuxuryDivider() {
  return (
    <Divider
      height="70"
      width="1"
      bg="linear-gradient(180deg, transparent, #D4AF37, transparent)"
    />
  );
}
