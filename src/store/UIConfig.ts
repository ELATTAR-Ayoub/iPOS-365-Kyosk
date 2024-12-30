import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIConfig {
  menuSearch: string;
}

const initialState: UIConfig = {
  menuSearch: "",
};

const UIConfigSlice = createSlice({
  name: "UIConfig",
  initialState,
  reducers: {
    setUIState(_state, action: PayloadAction<UIConfig>) {
      return action.payload;
    },
    setMenuSearch(state, action: PayloadAction<string>) {
      state.menuSearch = action.payload;
    },
  },
});

export const { setUIState, setMenuSearch } = UIConfigSlice.actions;
export default UIConfigSlice.reducer;
