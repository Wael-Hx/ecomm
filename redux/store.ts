import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import filtersSlice from "../components/brandPage/filtersSlice";
import cartSlice from "../components/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    cart: cartSlice,
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
