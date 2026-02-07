import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/joy";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setFinishedOrders,
  setPausedOrders,
  setProcessOrders,
} from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/ordersService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { Order, OrderInquiry } from "../../../lib/types/order";

/* REDUX DISPATCH */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const [value, setValue] = useState("1");
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PENDING,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PENDING })
      .then(setPausedOrders);

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESSING })
      .then(setProcessOrders);

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.DELIVERED })
      .then(setFinishedOrders);
  }, [orderInquiry, orderBuilder]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Tabs
                value={value}
                onChange={handleChange}
                className="gold-tabs"
              >
                <Tab label="Paused Orders" value="1" />
                <Tab label="Processing Orders" value="2" />
                <Tab label="Finished Orders" value="3" />
              </Tabs>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          {/* USER INFO */}
          <Box className="order-info-box">
            <div className="member-box">
              <div className="order-user-img">
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className="order-user-avatar"
                  alt="user"
                />
                <div className="order-user-icon-box">
                  <img src="/icons/user-badge.svg" alt="badge" />
                </div>
              </div>
              <span className="order-user-name">
                {authMember?.memberNick}
              </span>
              <span className="order-user-prof">
                {authMember?.memberType}
              </span>
            </div>

            <div className="liner" />

            <div className="order-user-address">
              <LocationOnIcon />
              <span>{authMember?.memberAddress}</span>
            </div>
          </Box>

          {/* PAYMENT */}
          <Box className="payment-info-box">
            <input
              className="payment-input-field"
              value="5243 4090 2002 7495"
              readOnly
            />
            <div className="payment-input-row">
              <input className="payment-input-half" value="07 / 24" readOnly />
              <input className="payment-input-half" value="CVV 010" readOnly />
            </div>
            <input
              className="payment-input-field"
              value={authMember?.memberNick}
              readOnly
            />

            <div className="payment-methods">
              <img src="/icons/visa-card.svg" />
              <img src="/icons/master-card.svg" />
              <img src="/icons/paypal-card.svg" />
              <img src="/icons/western-card.svg" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
