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
import { sweetErrorHandling } from "../../../lib/sweetAlert";
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
        
            const confirmation = window.confirm("I confirm recieved order");
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
            <Stack>
                {processOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className="order-main-box">
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
                                            <img src="/icons/close.svg" />
                                            <p>${item.itemQuantity}</p>                                    
                                            <img src="/icons/pause.svg" />
                                            <p>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            {/* Summary Section */}
                            <Box className="total-price-box">
                                <Box className="box-total">
                                    <p>Perfume price</p>
                        
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <p className="data-compl">
                                    {moment().format("YY-MM-DD HH:mm")}
                                </p>
                                <Button variant="contained" className="verify-button"
                                value = {order._id}
                                onClick={finishOrderHandler}
                                >
                                    Verify to Fulfil
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {/* No Image Fallback */}
                {!processOrders || processOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                            src="/icons/noimage-list.svg"
                            style={{ width: 300, height: 300 }}
                        />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}
