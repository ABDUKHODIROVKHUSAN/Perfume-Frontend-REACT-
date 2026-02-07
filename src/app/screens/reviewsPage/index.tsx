import * as React from "react";
import Box from "@mui/material/Box";
import ReviewCard from "./ReviewCrad";

const reviews = [
  {
    id: 1,
    productName: "About Chanel N5",
    customerName: "Duncan Tall",
    customerProfilePic: "/img/tall.png",
    productImage: "/img/ch5.jpg",
    rating: 5,
    description: "Elegant, confident, timeless. It smells like silk blouses, red lipstick, and quiet power. ”",
  },
  {
    id: 2,
    productName: "Black Sofa",
    customerName: "Walter White",
    customerProfilePic: "img/ww.png",
    productImage: "/img/ddd.png",
    rating: 4,
    description: "Warm and comforting vanilla, sandalwood, and a touch of powdery musk that lingers on skin for hours.",
  },
  {
    id: 3,
    productName: "Office Desk",
    customerName: "Emily Clark",
    customerProfilePic: "img/dragon.jpg",
    productImage: "/img/diorw.png",
    rating: 3.5,
    description: "Brilliant, confident, timeless. It smells like silk blouses, pink lipstick, and quiet power.",
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
