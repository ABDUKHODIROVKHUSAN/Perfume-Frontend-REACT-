import * as React from 'react';
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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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
  const [emoji, setEmoji] = React.useState('😍');

  const toggleLike = () => setLiked(!liked);
  const toggleBookmark = () => setBookmarked(!bookmarked);

  const renderStars = (count: number) => {
    return (
      <Box sx={{ display: 'flex', mb: 1 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ fontSize: '18px', color: i < count ? '#FFD700' : '#ccc' }}>
            ★
          </span>
        ))}
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            src={customerProfilePic || '/icons/img/auth.jpeg'}
            sx={{ border: '2px solid #eee' }}
          />
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {customerName}
          </Typography>
        }
        subheader={productName}
      />

      <CardMedia component="img" height="200" image={productImage} alt={productName} />

      <CardContent>
        {renderStars(rating)}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title="React with emoji">
            <IconButton onClick={() => setEmoji(emoji === '😍' ? '😎' : '😍')}>
              <EmojiEmotionsIcon />
              <span style={{ fontSize: '16px', marginLeft: 4 }}>{emoji}</span>
            </IconButton>
          </Tooltip>

          <Tooltip title="Like">
            <IconButton onClick={toggleLike}>
              <ThumbUpAltIcon sx={{ color: liked ? 'green' : 'gray' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Bookmark">
            <IconButton onClick={toggleBookmark}>
              <BookmarkIcon sx={{ color: bookmarked ? 'orange' : 'gray' }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Share this review">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
