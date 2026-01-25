import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import PerfumePageReducer from "./screens/PerfumePage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";

export const store = configureStore({
  reducer: {
    homepage: HomePageReducer, 
    perfumePage:PerfumePageReducer,
    ordersPage:OrdersPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
