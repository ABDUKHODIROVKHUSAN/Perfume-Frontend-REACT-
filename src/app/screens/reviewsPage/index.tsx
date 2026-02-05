import * as React from "react";
import Box from "@mui/material/Box";
import ReviewCard from "./ReviewCrad";

const reviews = [
  {
    id: 1,
    productName: "Modern Sofa",
    customerName: "Alice Johnson",
    customerProfilePic: "/icons/img/customer-paying.png",
    productImage: "/img/livingR.png",
    rating: 5,
    description: "So stylish and cozy — my dog stole it from me.",
  },
  {
    id: 2,
    productName: "Black Sofa",
    customerName: "Bob Smith",
    customerProfilePic: "",
    productImage: "/img/black-sofa.png",
    rating: 4,
    description: "Minimalist and sleek. Great for my workspace.",
  },
  {
    id: 3,
    productName: "Office Desk",
    customerName: "Carla Green",
    customerProfilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    productImage: "/img/office.png",
    rating: 3,
    description: "Looks nice, but smaller than expected.",
  },
];

export default function ReviewsPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f6f0df, #efe4c6)",
        padding: "90px 28px 120px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 8,
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#b89b5e",
          }}
        >
          Client Stories
        </Box>
        <Box
          component="h2"
          sx={{
            mt: 1.5,
            fontFamily: "Playfair Display, serif",
            fontSize: 48,
            fontWeight: 500,
            color: "#3a2e12",
          }}
        >
          Golden Reviews
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1300,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "70px 48px",
          justifyItems: "center",
        }}
      >
        {reviews.map((review, i) => (
          <Box
            key={review.id}
            sx={{
              width: "100%",
              maxWidth: 340,
              animation: "fadeUp 0.8s ease forwards",
              animationDelay: `${i * 100}ms`,
              opacity: 0,
            }}
          >
            <ReviewCard {...review} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
