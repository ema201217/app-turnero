import { createSlice } from "@reduxjs/toolkit";

export const reservaSlice = createSlice({
  name: "reserva",
  initialState: [
    {
      days: [],
      range: {},
      grade: "",
      beenBefore: false,
    },
  ],
  reducers: {
    SET_RESERVA: (state, action) => {
      state.reserva = action.payload;
    },
  },
});

export const { SET_RESERVA } = reservaSlice.actions;

export const selectDays = (state) => state.reserva.days;
export const selectRange = (state) => state.reserva.range;
export const selectGrade = (state) => state.reserva.grade;
export const selectBeenBefore = (state) => state.reserva.beenBefore;

export default reservaSlice.reducer;
