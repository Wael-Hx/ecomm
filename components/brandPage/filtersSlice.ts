import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterOptions } from "../../types";

export const initialState: FilterOptions = {
  price: 100,
  ram: 4,
  size: 4,
  storage: 8,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setShopFilters(state, action: PayloadAction<Partial<FilterOptions>>) {
      Object.assign(state, action.payload);
    },
    resetShopFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setShopFilters, resetShopFilters } = filterSlice.actions;
export default filterSlice.reducer;
