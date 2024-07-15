// In store.js
import { configureStore } from "@reduxjs/toolkit";

import ChartDataReducer from '../features/Chart/dataSlice';

import masterStaticSlice from "../features/Chart/masterStaticSlice";
import dateReducer from '../features/Date/dateSlice'
import plannedReducer from '../features/Chart/plannedSlice'



export const store = configureStore({
  reducer: {
    chartData: ChartDataReducer,
    master: masterStaticSlice,
    date: dateReducer,
    planned: plannedReducer,


  },
});
