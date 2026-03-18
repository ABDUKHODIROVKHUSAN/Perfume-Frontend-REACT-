import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { retrieveProcessOrders, } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/ordersService";
import { sweetConfirmAlert, sweetErrorHandling } from "../../../lib/sweetAlert";
import { Perfume } from "../../../lib/types/perfume";

/** REDUX SLICE & SELECTOR */
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({ processOrders })
);
 
interface ProcessOrderProps {
    setValue: (input:string) => void;
}

export default function ProcessOrders(props:ProcessOrderProps) {

    const { processOrders } = useSelector(processOrdersRetriever);
    const {setValue} = props;
    const {authMember, setOrderBuilder} = useGlobals();

    //Handlers
    const finishOrderHandler = async (e:T) => {
        try {
            if(!authMember ) throw Error(Messages.error2)

            const orderId = e.target.value;
            const input:OrderUpdateInput = {
                orderId: orderId,
                orderStatus:OrderStatus.DELIVERED,
            };
        
            const confirmation = await sweetConfirmAlert(
                "I confirm I have received this order.",
                "Yes, confirm"
            );
            if(confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);

                setValue("3")
                setOrderBuilder(new Date());
            }
        } catch (err) {
            sweetErrorHandling(err).then();
        }}
    

    return (
        <TabPanel value={"2"}>
            <Stack spacing={6} className="gold-orders-wrapper">
                {processOrders?.map((order: Order) => {
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
                                <Button
                                variant="contained"
                                className="gold-btn-solid"
                                value={order._id}
                                onClick={finishOrderHandler}
                                >
                                    Verify to Fulfil
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {/* No Image Fallback */}
                {(!processOrders || processOrders.length === 0) && (
                    <Box className="gold-empty-state">
                        <img src="/icons/noimage-list.svg" width={200} alt="No processing orders" />
                        <h4>No processing orders yet</h4>
                        <p>Move a paused order to payment and track progress here.</p>
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}
