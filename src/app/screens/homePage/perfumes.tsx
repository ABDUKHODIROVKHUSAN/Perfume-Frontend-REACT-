import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";

type Perfume = {
  name: string;
  image: string;
  collection: string;
};

const rooms: Perfume[] = [
  {
    name: "Margot Robbie",
    image: "/img/Margoth.jpg",
    collection: "Woman",
  },
  {
    name: "Chris Pine",
    image: "/img/Pine.jpg",
    collection: "Man",
  },
  {
    name: "Cristiano Ronaldo",
    image: "/img/cr7.jpg",
    collection: "OFFICE",
  },
];

const RoomsSection: React.FC = () => {
  const history = useHistory();

  const handleRoomClick = (collection: string) => {
    history.push(`/perfumes?collection=${collection}`);
  };

  const handleShowAll = () => {
    history.push("/perfumes?collection=ALL");
  };

  return (
    <Box
      sx={{
        py: 18,
        background:
          "linear-gradient(180deg, #faf7f2 0%, #f1ece3 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={10}
          alignItems="center"
        >
          {/* LEFT — ROOM CARDS */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {rooms.map((room) => (
              <Box
                key={room.name}
                onClick={() => handleRoomClick(room.collection)}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)",
                  },
                  height: 270,
                  borderRadius: 6,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.5)",
                  transition: "all 0.45s ease",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow:
                      "0 40px 80px rgba(0,0,0,0.7)",
                  },
                  "&:hover img": {
                    transform: "scale(1.12)",
                  },
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={room.image}
                  alt={room.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "0.6s ease",
                  }}
                />

                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    transition: "0.4s ease",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.85))",
                  }}
                />

                {/* Title */}
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 26,
                    fontFamily: "Playfair Display",
                    fontSize: 24,
                    color: "#e3c08d",
                    letterSpacing: 1,
                    zIndex: 2,
                  }}
                >
                  {room.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* RIGHT — TEXT */}
          <Stack
            spacing={4}
            sx={{
              maxWidth: 420,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: 40,
                color: "#e3c08d",
              }}
            >
              Celebrity Choices
            </Typography>

            <Typography
              sx={{
                color: "#6b6b6b",
                fontSize: 16,
                lineHeight: 1.9,
              }}
            >
              Celebrities do not chase trends; they define them. And often, their first statement is a fragrance that speaks long before words are needed.
            </Typography>

            <Button
              onClick={handleShowAll}
              sx={{
                alignSelf: {
                  xs: "center",
                  md: "flex-start",
                },
                px: 6,
                py: 1.5,
                borderRadius: 50,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: 16,
                color: "#000",
                background:
                  "linear-gradient(135deg, #e3c08d, #b8945e)",
                boxShadow:
                  "0 18px 40px rgba(227,192,141,0.45)",
                transition: "all 0.35s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow:
                    "0 28px 60px rgba(227,192,141,0.65)",
                },
              }}
            >
              Show All Collections →
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default RoomsSection;
