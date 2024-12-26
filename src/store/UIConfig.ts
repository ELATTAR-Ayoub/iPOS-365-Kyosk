import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIConfig {
  count: number;
}

const initialState: UIConfig = {
  count: 0,
};

const UIConfigSlice = createSlice({
  name: "UIConfig",
  initialState,
  reducers: {
    setUIState(_state, action: PayloadAction<UIConfig>) {
      return action.payload;
    },
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export const { setUIState, increment, decrement } = UIConfigSlice.actions;
export default UIConfigSlice.reducer;
