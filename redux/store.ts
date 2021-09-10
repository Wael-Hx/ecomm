import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import filtersSlice from "../components/brandPage/filtersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
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
