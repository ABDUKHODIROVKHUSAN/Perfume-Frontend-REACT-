import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

type ReviewCardProps = {
  productName: string;
  customerName: string;
  customerProfilePic?: string;
  productImage: string;
  rating: number;
  description: string;
};

export default function ReviewCard({
  productName,
  customerName,
  customerProfilePic,
  productImage,
  rating,
  description,
}: ReviewCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [emoji, setEmoji] = React.useState("😍");

  const renderStars = (count: number) => (
    <Box sx={{ display: "flex", mb: 1 }}>
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            fontSize: 18,
            color: i < Math.round(count) ? "#9b5f46" : "#e1cbbd",
          }}
        >
          ★
        </Box>
      ))}
    </Box>
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(122,71,52,0.18)",
        background: "linear-gradient(180deg, #fffefc, #f8efe8)",
        boxShadow: "0 20px 45px rgba(74,47,36,0.16)",
        transition: "transform 0.45s ease",
        "&:hover": {
          transform: "translateY(-10px)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={customerProfilePic || "/icons/img/Gucci.png"}
            sx={{
              border: "2px solid #c27a5d",
              bgcolor: "#fff3eb",
            }}
          />
        }
        title={
          <Typography
            sx={{
              fontWeight: 600,
              color: "#3a2a21",
            }}
          >
            {customerName}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontSize: 13,
              letterSpacing: 1,
              color: "#8a6f5c",
            }}
          >
            {productName}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="210"
        image={productImage}
        alt={productName}
        sx={{
          objectFit: "cover",
          borderRadius: "0 0 18px 18px",
        }}
      />

      <CardContent>
        {renderStars(rating)}
        <Typography
          sx={{
            fontSize: 14,
            color: "#665749",
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Tooltip title="React">
            <IconButton onClick={() => setEmoji(emoji === "😍" ? "😎" : "😍")}>
              <EmojiEmotionsIcon sx={{ color: "#9b5f46" }} />
              <Box component="span" sx={{ ml: 0.5 }}>
                {emoji}
              </Box>
            </IconButton>
          </Tooltip>

          <Tooltip title="Like">
            <IconButton onClick={() => setLiked(!liked)}>
              <ThumbUpAltIcon sx={{ color: liked ? "#6f3f2e" : "#9b5f46" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Bookmark">
            <IconButton onClick={() => setBookmarked(!bookmarked)}>
              <BookmarkIcon sx={{ color: bookmarked ? "#6f3f2e" : "#9b5f46" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Share">
          <IconButton>
            <ShareIcon sx={{ color: "#9b5f46" }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
