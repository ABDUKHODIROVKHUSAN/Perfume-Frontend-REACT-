import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";


export default function Statistics() {
   return <div className="static-frame">
        <Container>
            <Stack className="info">
                <Stack className="static-box">
                    <img src="/icons/Delivery.svg" alt="" />
                    <Box className="static-text">Free Delivery</Box>
                </Stack>

                <Divider height="64" width="2" bg="white" />

                <Stack className="static-box">
                    <img src="/icons/Shield.svg" alt="" />
                    <Box className="static-text">Safe & Reliable</Box>
                </Stack>

                <Divider height="64" width="2" bg="white" />

                <Stack className="static-box">
                    <img src="/icons/Guaranteed.svg" alt="" />
                    <Box className="static-text">Guaranteed</Box>
                </Stack>

                <Divider height="64" width="2" bg="white" />

                <Stack className="static-box">
                    <img src="/icons/Tools.svg" alt="/" />
                    <Box className="static-text">FREE Installation</Box>
                </Stack> 

            </Stack>
        </Container>
    </div>
}