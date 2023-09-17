import { createSlice } from "@reduxjs/toolkit";

type CounterIdState = {
  value: number;
};

const initialState = {
  value: 101,
} as CounterIdState;

export const counterId = createSlice({
  name: "counterId",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment, reset } = counterId.actions;

export default counterId.reducer;
