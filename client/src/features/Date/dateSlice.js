// src/features/dateSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  displayedMonthYear: "",
};


const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {

    setDisplayedMonthYear: (state, action) => {
      if (typeof action.payload === 'string') {
        state.displayedMonthYear = action.payload;
      } else {
        console.error('Payload should be a string representing the month and year');
      }
    },
  },
});


export const { setDisplayedMonthYear } = dateSlice.actions;


export default dateSlice.reducer;
