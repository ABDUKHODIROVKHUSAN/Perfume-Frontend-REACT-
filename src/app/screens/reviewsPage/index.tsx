import * as React from 'react';
import Box from '@mui/material/Box';
import ReviewCard from './ReviewCrad';

const reviews = [
  {
    id: 1,
    productName: 'Modern Sofa',
    customerName: 'Alice Johnson',
    customerProfilePic: '/icons/img/customer-paying.png',
    productImage: '/img/livingR.png',
    rating: 5,
    description: 'So stylish and cozy — my dog stole it from me.',
  },
  {
    id: 2,
    productName: 'Black Sofa',
    customerName: 'Bob Smith',
    customerProfilePic: '',
    productImage: '/img/black-sofa.png',
    rating: 4,
    description: 'Minimalist and sleek. Great for my workspace.',
  },
  {
    id: 3,
    productName: 'Office Desk',
    customerName: 'Carla Green',
    customerProfilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    productImage: '/img/office.png',
    rating: 3,
    description: 'Looks nice, but smaller than expected.',
  },
];

export default function ReviewsPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        padding: 3,
      }}
    >
      {reviews.map((review) => (
        <Box key={review.id} sx={{ flex: '1 1 300px', maxWidth: '350px' }}>
          <ReviewCard {...review} />
        </Box>
      ))}
    </Box>
  );
}
