import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

import { createSelector } from "reselect";
import { retrievePausedOrders, } from "./selector";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/ordersService";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Perfume } from "../../../lib/types/perfume";
import moment from "moment";

/** REDUX SLICE & SELECTOR */
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    // Handlers
    const deleteOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw Error(Messages.error2)
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.CANCELLED,
            };

            const confirmation = window.confirm("Do you want to delete order");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                //Order rebuild 
                setOrderBuilder(new Date());
            }
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    }

    const processOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw Error(Messages.error2)
            //PAYMENT

            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.PROCESSING,
            };

            const confirmation = window.confirm("Do you want to proceed with payment");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                //Order rebuild 
                // Process Order
                setValue("2")
                setOrderBuilder(new Date());
            }
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    }

    return (
        <TabPanel value="1">
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className="order-main-box">
                            <Box className="order-box-scroll">
                                {order?.orderItems?.map((item: OrderItem) => {
                                    const perfume: Perfume = order.perfumeDate.filter(
                                        (ele: Perfume) => item.perfumeId === ele._id
                                    )[0];
                                    console.log(order.perfumeDate, "perfume in process order");

                                    const imagePath =
                                        perfume?.perfumeImages?.[0]
                                            ? `${serverApi}/${perfume.perfumeImages[0]}`
                                            : "/img/bedroom.png"; return (
                                                <Box key={item._id} className="orders-name-price">
                                                    <img
                                                        src={imagePath}
                                                        className="order-dish-img"
                                                    />
                                                    <p className="title-dish">{perfume.perfumeName}</p>
                                                    <Box className="price-box">
                                                        <p>{"$" + item.itemPrice}</p>
                                                        <img src="/icons/close.svg" />
                                                        <p>${item.itemQuantity}</p>
                                                        <img src="/icons/pause.svg"
                                                        />
                                                        <p
                                                            style={{ marginLeft: "15px" }}
                                                        >${item.itemQuantity * item.itemPrice}</p>
                                                    </Box>
                                                </Box>
                                            );
                                })}
                            </Box>

                            <Box className="total-price-box">
                                <Box className="box-total">
                                    <Box className="box-total">
                                        <p>Perfume price</p>

                                        <p>${order.orderTotal}</p>
                                    </Box>
                                    <p className="data-compl">
                                        {moment().format("YY-MM-DD HH:mm")}
                                    </p>
                                </Box>

                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className="cancel-button"
                                    onClick={deleteOrderHandler}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    value={order._id}
                                    onClick={processOrderHandler}
                                    variant="contained"
                                    className="pay-button"
                                >
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!pausedOrders || (pausedOrders.length === 0) && (
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                    >
                        <img
                            src={"/icons/noimage-list.svg"}
                            style={{ width: 300, height: 300 }}
                        />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}
