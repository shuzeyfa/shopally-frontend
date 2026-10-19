import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CompareState {
  selectedProductIds: string[];
}

const initialState: CompareState = {
  selectedProductIds: [],
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    toggleCompareProduct: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedProductIds.indexOf(id);
      if (index >= 0) {
        state.selectedProductIds.splice(index, 1);
      } else if (state.selectedProductIds.length < 4) {
        state.selectedProductIds.push(id);
      }
    },
    removeCompareProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductIds = state.selectedProductIds.filter(
        (id) => id !== action.payload,
      );
    },
    clearCompare: (state) => {
      state.selectedProductIds = [];
    },
    setCompareProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProductIds = action.payload.slice(0, 4);
    },
  },
});

export const {
  toggleCompareProduct,
  removeCompareProduct,
  clearCompare,
  setCompareProducts,
} = compareSlice.actions;

export default compareSlice.reducer;
