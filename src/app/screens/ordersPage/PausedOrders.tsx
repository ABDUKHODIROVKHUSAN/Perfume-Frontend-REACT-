import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { sweetConfirmAlert, sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/ordersService";
import { Order, OrderItem } from "../../../lib/types/order";
import { Perfume } from "../../../lib/types/perfume";
import moment from "moment";
import { useHistory } from "react-router-dom";

/** REDUX */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders({ setValue }: PausedOrdersProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const history = useHistory();

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      const orderId = e.target.value;

      const confirmation = await sweetConfirmAlert(
        "Do you want to cancel this order?",
        "Yes, cancel"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder({
          orderId,
          orderStatus: OrderStatus.CANCELLED,
        });
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      const orderId = e.target.value;

      const confirmation = await sweetConfirmAlert(
        "Do you want to proceed with payment?",
        "Yes, proceed"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder({
          orderId,
          orderStatus: OrderStatus.PROCESSING,
        });
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1">
      <Stack spacing={6} className="gold-orders-wrapper">
        {pausedOrders?.map((order: Order) => (
          <Box key={order._id} className="gold-order-card">
            <Box className="gold-order-items">
              {order.orderItems.map((item: OrderItem) => {
                const perfume: Perfume = order.perfumeDate.find(
                  (p) => p._id === item.perfumeId
                ) as Perfume;

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
                      <h4>{perfume?.perfumeName}</h4>
                      <p>
                        ${item.itemPrice} × {item.itemQuantity}
                      </p>
                    </div>

                    <div className="gold-order-total">
                      ${item.itemPrice * item.itemQuantity}
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
                  value={order._id}
                  className="gold-btn-outline"
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>

                <Button
                  value={order._id}
                  className="gold-btn-solid"
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </div>
            </Box>
          </Box>
        ))}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box className="gold-empty-state">
            <img src="/icons/noimage-list.svg" width={200} alt="No paused orders" />
            <h4>No paused orders yet</h4>
            <p>Create your first order and it will appear here.</p>
            <Button className="gold-btn-solid" onClick={() => history.push("/perfumes")}>
              Explore Perfumes
            </Button>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
