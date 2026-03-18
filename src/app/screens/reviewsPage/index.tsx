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
        background: "linear-gradient(180deg, #faf4ee, #f6eee7)",
        padding: "86px 24px 110px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
          gap: 3,
          mb: 7,
        }}
      >
        <Box
          sx={{
            borderRadius: 4,
            border: "1px solid rgba(122,71,52,0.2)",
            background: "linear-gradient(180deg, #fffaf4, #f6e9dd)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#9b5f46",
            }}
          >
            Client Stories
          </Box>
          <Box
            component="h2"
            sx={{
              mt: 1.5,
              mb: 1.5,
              fontFamily: "Playfair Display, serif",
              fontSize: { xs: 38, md: 52 },
              fontWeight: 600,
              color: "#3a261f",
              lineHeight: 1.04,
            }}
          >
            Reviews as Editorial Notes
          </Box>
          <Box sx={{ maxWidth: 640, color: "#6e5a4c", lineHeight: 1.7 }}>
            Honest fragrance diaries from our community, crafted into a cleaner
            magazine-style wall so each voice feels intentional and easy to scan.
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 4,
            border: "1px solid rgba(122,71,52,0.2)",
            background: "#fffdfb",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ color: "#9b5f46", letterSpacing: 2, fontSize: 11 }}>
            CURRENT ISSUE
          </Box>
          <Box sx={{ mt: 1, color: "#3f2d24", fontSize: 26, fontFamily: "Playfair Display, serif" }}>
            {reviews.length} Featured testimonials
          </Box>
          <Box sx={{ mt: 1.5, color: "#766456", fontSize: 14 }}>
            Includes reactions, likes, and saved posts without changing any backend flow.
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1240,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: "28px",
        }}
      >
        {reviews.map((review, i) => (
          <Box
            key={review.id}
            sx={{
              width: "100%",
              transition: "transform 0.35s ease",
              alignSelf: i === 1 ? "stretch" : "start",
              "&:hover": {
                transform: "translateY(-6px)",
              },
            }}
          >
            <ReviewCard {...review} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
