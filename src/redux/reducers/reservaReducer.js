import { createSlice } from "@reduxjs/toolkit";

export const reservaSlice = createSlice({
  name: "reserva",
  initialState: {
    days: [],
    range:{}
  },
  reducers: {
    SET_RESERVA: (state, action) => {
      state.reserva = action.payload;
    },
  },
});

export const { SET_RESERVA } = reservaSlice.actions;


export const selectDays = (state) => state.reserva.days;
export const selectRange = (state) => state.reserva.days;

export default reservaSlice.reducer;
