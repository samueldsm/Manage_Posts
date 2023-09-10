import { createSlice } from "@reduxjs/toolkit";

export interface CounterIdState {
  value: number;
}

// Workaround: cast state instead of declaring variable type
const initialState = {
  value: 101,
} as CounterIdState;

export const counterIdSlice = createSlice({
  name: "counterId",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, reset } = counterIdSlice.actions;

export default counterIdSlice.reducer;
