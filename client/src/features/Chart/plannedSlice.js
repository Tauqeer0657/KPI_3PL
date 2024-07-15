// src/features/chart/plannedSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPlannedDashboardData = createAsyncThunk(
  'planned/fetchData',
  async (yearMonth) => {
    const response = await fetch(`api/master/fetchPlannedDCGRDashboardBasedOnCustomerAndMonth/C001/${yearMonth}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  }
);

const plannedSlice = createSlice({
  name: 'planned',
  initialState: {
    data: [],
    sumOfTslSavingIRSData: [],
    averagePlannedAndActualDCGRData: [],
    sumOfPlannedAndActual3PLInvoiceData: [],
    totalSumOfTslSavingIRS: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannedDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlannedDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const jsonData = action.payload;
        state.sumOfTslSavingIRSData = jsonData.SumOfTslSavingIRSByDeliveryPlant;
        state.averagePlannedAndActualDCGRData = jsonData.AveragePlannedAndActualDCGRPercentageByDeliveryPlant;
        state.sumOfPlannedAndActual3PLInvoiceData = jsonData.SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant;
        state.totalSumOfTslSavingIRS = jsonData.SumOftslSavingIRS;
        state.data = jsonData;
      })
      .addCase(fetchPlannedDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default plannedSlice.reducer;
