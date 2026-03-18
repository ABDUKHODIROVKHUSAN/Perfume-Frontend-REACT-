import { useState, SyntheticEvent, useEffect, useMemo } from "react";
import { Container, Stack, Box } from "@mui/joy";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";
import {
  setFinishedOrders,
  setPausedOrders,
  setProcessOrders,
} from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/ordersService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { Order, OrderInquiry } from "../../../lib/types/order";
import {
  retrieveFinishedOrders,
  retrievePausedOrders,
  retrieveProcessOrders,
} from "./selector";
import { getPaymentProfile, PaymentMethodId } from "../../../lib/paymentProfile";

const PAYMENT_METHODS = [
  { id: "visa", label: "Visa", icon: "/icons/visa-card.svg" },
  { id: "mastercard", label: "MasterCard", icon: "/icons/master-card.svg" },
  { id: "paypal", label: "PayPal", icon: "/icons/paypal-card.svg" },
  { id: "western", label: "Western", icon: "/icons/western-card.svg" },
];

export default function OrdersPage() {
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId>("visa");
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const memberKey = authMember?._id ? String(authMember._id) : "guest";

  const pausedOrders = useSelector(retrievePausedOrders);
  const processOrders = useSelector(retrieveProcessOrders);
  const finishedOrders = useSelector(retrieveFinishedOrders);

  useEffect(() => {
    const order = new OrderService();
    const orderInquiry: OrderInquiry = {
      page: 1,
      limit: 5,
      orderStatus: OrderStatus.PENDING,
    };

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PENDING })
      .then((data) => dispatch(setPausedOrders(data)));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESSING })
      .then((data) => dispatch(setProcessOrders(data)));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.DELIVERED })
      .then((data) => dispatch(setFinishedOrders(data)));
  }, [dispatch, orderBuilder]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const currentTabOrders = useMemo(() => {
    if (value === "1") return pausedOrders ?? [];
    if (value === "2") return processOrders ?? [];
    return finishedOrders ?? [];
  }, [value, pausedOrders, processOrders, finishedOrders]);

  const paymentProfile = useMemo(() => getPaymentProfile(memberKey), [memberKey]);

  useEffect(() => {
    setSelectedPaymentMethod(paymentProfile.preferredMethod || "visa");
  }, [paymentProfile.preferredMethod]);

  const paymentMethods = useMemo(
    () =>
      PAYMENT_METHODS.map((method) => ({
        ...method,
        number:
          method.id === "paypal"
            ? "PAYPAL WALLET"
            : method.id === "western"
            ? "WIRE PAYMENT"
            : paymentProfile.cardNumber || "0000 0000 0000 0000",
      })),
    [paymentProfile.cardNumber]
  );

  const selectedMethod = useMemo(
    () => paymentMethods.find((method) => method.id === selectedPaymentMethod) || paymentMethods[0],
    [selectedPaymentMethod, paymentMethods]
  );

  const amountInCurrentTab = useMemo(
    () => currentTabOrders.reduce((acc: number, order: Order) => acc + (order.orderTotal || 0), 0),
    [currentTabOrders]
  );

  const pendingAmount = useMemo(
    () => (pausedOrders ?? []).reduce((acc: number, order: Order) => acc + (order.orderTotal || 0), 0),
    [pausedOrders]
  );

  const deliveredAmount = useMemo(
    () => (finishedOrders ?? []).reduce((acc: number, order: Order) => acc + (order.orderTotal || 0), 0),
    [finishedOrders]
  );

  if (!authMember) history.push("/");

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-top-panels">
          {/* USER INFO */}
          <Box className="order-info-box">
            <div className="order-info-header">
              <p className="order-info-kicker">Member Profile</p>
              <span className="order-user-role-badge">
                {authMember?.memberType || "Member"}
              </span>
            </div>

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

            <div className="order-user-meta">
              <div>
                <span>Contact</span>
                <p>{authMember?.memberPhone || "No phone available"}</p>
              </div>
              <div>
                <span>Membership</span>
                <p>{authMember?.memberType || "Classic"}</p>
              </div>
            </div>

            <div className="order-stats-grid">
              <div className="order-stat-card">
                <span>Paused</span>
                <p>{(pausedOrders ?? []).length}</p>
              </div>
              <div className="order-stat-card">
                <span>Processing</span>
                <p>{(processOrders ?? []).length}</p>
              </div>
              <div className="order-stat-card">
                <span>Delivered</span>
                <p>{(finishedOrders ?? []).length}</p>
              </div>
            </div>

            <div className="liner" />

            <div className="order-user-address">
              <LocationOnIcon />
              <span>{authMember?.memberAddress || "Address not added yet"}</span>
            </div>
          </Box>

          {/* PAYMENT */}
          <Box className="payment-info-box">
            <div className="payment-header">
              <p className="payment-kicker">Payment Process</p>
              <h4>Secure Checkout Overview</h4>
              <span>Choose method and track your current order flow.</span>
            </div>

            <div className="payment-card-preview">
              <div className="payment-card-top">
                <span>{selectedMethod.label}</span>
                <img src={selectedMethod.icon} alt={selectedMethod.label} />
              </div>
              <p className="payment-card-number">{selectedMethod?.number}</p>
              <div className="payment-card-meta">
                <div>
                  <span>Card Holder</span>
                  <p>{paymentProfile.cardHolder || authMember?.memberNick || "Guest User"}</p>
                </div>
                <div>
                  <span>Expiry</span>
                  <p>{paymentProfile.expiry || "07 / 29"}</p>
                </div>
                <div>
                  <span>CVV</span>
                  <p>{paymentProfile.cvv ? "*".repeat(Math.min(paymentProfile.cvv.length, 4)) : "***"}</p>
                </div>
              </div>
            </div>

            <div className="payment-method-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-method-btn ${selectedPaymentMethod === method.id ? "active" : ""}`}
                  onClick={() => setSelectedPaymentMethod(method.id as PaymentMethodId)}
                >
                  <img src={method.icon} alt={method.label} />
                  <span>{method.label}</span>
                </button>
              ))}
            </div>

            <div className="payment-summary">
              <div className="payment-summary-row">
                <span>Orders in this tab</span>
                <strong>{currentTabOrders.length}</strong>
              </div>
              <div className="payment-summary-row">
                <span>Amount in this tab</span>
                <strong>${amountInCurrentTab.toLocaleString()}</strong>
              </div>
              <div className="payment-summary-row">
                <span>Pending total</span>
                <strong>${pendingAmount.toLocaleString()}</strong>
              </div>
              <div className="payment-summary-row">
                <span>Delivered total</span>
                <strong>${deliveredAmount.toLocaleString()}</strong>
              </div>
            </div>

            <div className="payment-security-note">
              <span className="dot" />
              Encrypted checkout. Payment credentials are protected.
            </div>
          </Box>
        </Stack>

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
      </Container>
    </div>
  );
}
