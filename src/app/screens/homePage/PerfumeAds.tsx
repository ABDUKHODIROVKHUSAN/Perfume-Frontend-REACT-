import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./PerfumeAds.css";

const videos = [
  "/video/Boss.mp4",
  "/video/Dior.mp4",
  "/video/ronaldo.mp4",
];

const PopularPerfume = () => {
  return (
    <Box className="celebrity-page">
      <Typography className="celebrity-title">
        Chosen by Icons. Worn by Legends.
      </Typography>

     <Swiper
        className="celebrity-swiper"
        slidesPerView={1}
        loop
        navigation
        speed={1400}
        allowTouchMove
      >


        {videos.map((src, index) => (
          <SwiperSlide key={index}>
            <video
              className="celebrity-video"
              src={src}
              autoPlay
              muted
              loop
              playsInline
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PopularPerfume;
