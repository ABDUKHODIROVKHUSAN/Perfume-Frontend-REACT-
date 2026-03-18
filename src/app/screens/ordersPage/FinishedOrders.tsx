import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { Perfume } from "../../../lib/types/perfume";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import moment from "moment";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/ordersService";
import { sweetConfirmAlert, sweetErrorHandling } from "../../../lib/sweetAlert";

/** REDUX SLICE & SELECTOR */
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);
    const { authMember, setOrderBuilder } = useGlobals();

    const removeFinishedOrder = async (orderId: string) => {
        try {
            if (!authMember) throw Error(Messages.error2);
            const confirmation = await sweetConfirmAlert(
                "Remove this finished order from your list?",
                "Yes, remove"
            );
            if (!confirmation) return;

            const input: OrderUpdateInput = {
                orderId,
                orderStatus: OrderStatus.CANCELLED,
            };

            const orderService = new OrderService();
            await orderService.updateOrder(input);
            setOrderBuilder(new Date());
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    };

    const clearAllFinishedOrders = async () => {
        try {
            if (!authMember) throw Error(Messages.error2);
            if (!finishedOrders?.length) return;

            const confirmation = await sweetConfirmAlert(
                "Clear all finished orders from this list?",
                "Yes, clear all"
            );
            if (!confirmation) return;

            const orderService = new OrderService();
            await Promise.all(
                finishedOrders.map((order: Order) =>
                    orderService.updateOrder({
                        orderId: order._id,
                        orderStatus: OrderStatus.CANCELLED,
                    })
                )
            );
            setOrderBuilder(new Date());
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value="3">
            <Stack spacing={6} className="gold-orders-wrapper">
                {!!finishedOrders?.length && (
                    <Box className="gold-finished-toolbar">
                        <Button className="gold-btn-outline" onClick={clearAllFinishedOrders}>
                            Clear All
                        </Button>
                    </Box>
                )}
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className="gold-order-card">
                            <Box className="gold-order-items">
                                {order?.orderItems?.map((item: OrderItem) => {
                                    const perfume = order.perfumeDate.find(
                                        (ele: Perfume) => item.perfumeId === ele._id
                                    );
                                    const imagePath = perfume?.perfumeImages?.[0]
                                        ? `${serverApi}/${perfume.perfumeImages[0]}`
                                        : "/img/bedroom.png";

                                    return (
                                        <Box key={item._id} className="gold-order-item">
                                            <div className="gold-order-img">
                                                <img
                                                    src={imagePath}
                                                    alt={perfume?.perfumeName || "Unknown perfume"}
                                                />
                                            </div>
                                            <div className="gold-order-info">
                                                <h4>{perfume?.perfumeName || "Unknown Perfume"}</h4>
                                                <p>
                                                    ${item.itemPrice} x {item.itemQuantity}
                                                </p>
                                            </div>
                                            <div className="gold-order-total">
                                                ${item.itemQuantity * item.itemPrice}
                                            </div>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className="gold-order-footer">
                                <div>
                                    <p className="gold-order-label">Perfume price</p>
                                    <p className="gold-order-price">${order.orderTotal}</p>
                                    <span className="gold-order-date">
                                        {moment((order as any).createdAt || order.createAt || new Date()).format("YY-MM-DD HH:mm")}
                                    </span>
                                </div>
                                <div className="gold-order-actions">
                                    <Button
                                        className="gold-btn-outline"
                                        onClick={() => removeFinishedOrder(order._id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                      
            );
                })}

            {(!finishedOrders || finishedOrders.length === 0) && (
                <Box className="gold-empty-state">
                    <img src="/icons/noimage-list.svg" width={200} alt="No finished orders" />
                    <h4>No finished orders yet</h4>
                    <p>Completed orders will appear here with remove options.</p>
                </Box>
            )}


        </Stack>
        </TabPanel >
    );
}
