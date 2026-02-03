import React from "react";
import {
  Box,
  Button,
  Stack,
  IconButton,
  Badge,
  Menu,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/ordersService";
import { CartItem } from "../../../lib/types/search";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  const totalPrice = itemPrice.toFixed(1);

  const [anchorEl, setAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className="hover-line">
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={cartItems.length}
          sx={{
            "& .MuiBadge-badge": {
              background: "linear-gradient(135deg,#f2d6a2,#e0b97c)",
              color: "#3b2f1c",
              fontWeight: 700,
            },
          }}
        >
          <ShoppingCartIcon sx={{ color: "#c8a76a" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: 380,
            mt: 2,
            borderRadius: 4,
            background:
              "linear-gradient(180deg,#ffffff,#f6f3ee)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            color: "#2b2b2b",
          },
        }}
      >
        <Stack p={3} spacing={3}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: 18,
                letterSpacing: 1,
                color: "#9f7a3f",
              }}
            >
              Your Selection
            </Typography>

            {cartItems.length > 0 && (
              <DeleteForeverIcon
                onClick={onDeleteAll}
                sx={{
                  cursor: "pointer",
                  color: "#c8a76a",
                  "&:hover": { color: "#9f7a3f" },
                }}
              />
            )}
          </Stack>

          {/* Empty */}
          {cartItems.length === 0 && (
            <Typography sx={{ color: "#888", textAlign: "center" }}>
              Your collection is empty
            </Typography>
          )}

          {/* Items */}
          {cartItems.map((item) => {
            const imagePath = `${serverApi}/${item.image}`;
            return (
              <Stack
                key={item._id}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  background:
                    "linear-gradient(180deg,#ffffff,#f2efe9)",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={imagePath}
                  style={{
                    width: 55,
                    height: 55,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <Box flex={1}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#2a2a2a",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#9f7a3f" }}>
                    ${item.price} × {item.quantity}
                  </Typography>
                </Box>

                <Stack spacing={0.5} alignItems="center">
                  <CancelIcon
                    onClick={() => onDelete(item)}
                    sx={{
                      fontSize: 18,
                      cursor: "pointer",
                      color: "#aaa",
                      "&:hover": { color: "#9f7a3f" },
                    }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      onClick={() => onRemove(item)}
                      sx={{
                        minWidth: 26,
                        background: "#eee",
                        color: "#333",
                      }}
                    >
                      −
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onAdd(item)}
                      sx={{
                        minWidth: 26,
                        color: "#3b2f1c",
                        background:
                          "linear-gradient(135deg,#f2d6a2,#e0b97c)",
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}

          {/* Footer */}
          {cartItems.length > 0 && (
            <Stack spacing={2}>
              <Typography
                sx={{
                  fontWeight: 600,
                  letterSpacing: 1,
                  textAlign: "right",
                }}
              >
                Total{" "}
                <span style={{ color: "#9f7a3f" }}>
                  ${totalPrice}
                </span>
              </Typography>

              <Button
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={proceedOrderHandler}
                sx={{
                  py: 1.4,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#3b2f1c",
                  background:
                    "linear-gradient(135deg,#f2d6a2,#e0b97c)",
                  boxShadow:
                    "0 10px 25px rgba(200,167,106,0.45)",
                  "&:hover": {
                    boxShadow:
                      "0 16px 35px rgba(200,167,106,0.65)",
                  },
                }}
              >
                Proceed to Order
              </Button>
            </Stack>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
