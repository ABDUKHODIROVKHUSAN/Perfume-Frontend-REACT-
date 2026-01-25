import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Perfume } from "../../../lib/types/perfume";
import { Order, OrderItem } from "../../../lib/types/order";
import moment from "moment";

/** REDUX SLICE & SELECTOR */
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);

    return (
        <TabPanel value="3">
            <Stack>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className="order-main-box" style={{ marginRight: "-100px" }}>
                            <Box className="order-box-scroll">
                                {order?.orderItems?.map((item: OrderItem) => {
                                    const perfume: Perfume = order.perfumeDate.filter(
                                        (ele: Perfume) => item.perfumeId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${perfume.perfumeImages[0]}`;

                                    return (
                                        <Box key={item._id} className="orders-name-price">
                                            <img
                                                src={imagePath}
                                                className="order-dish-img"
                                            />
                                            <p className="title-dish">{perfume.perfumeName}</p>
                                            <Box className="price-box">
                                                <p>{"$" + item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>${item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className="total-price-box">
                                <Box className="box-total">
                                    <p>Perfume price</p>

                                    <p>${order.orderTotal}</p>
                                </Box>
                                <p className="data-compl">
                                    {moment().format("YY-MM-DD HH:mm")}
                                </p>
                            </Box>
                        </Box>
                      
            );
                })}

            {!finishedOrders || finishedOrders.length === 0 && (
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                >
                    <img
                        src={"/icons/noimage-list.svg"}
                        style={{ width: 300, height: 300 }}
                    />
                </Box>
            )}


        </Stack>
        </TabPanel >
    );
}
