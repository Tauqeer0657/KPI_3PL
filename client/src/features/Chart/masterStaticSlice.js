
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



//all delivery by chart data 
export const fetchDashboardStatisticsByYearMonth = createAsyncThunk(
  'data/fetchDashboardStatisticsByYearMonth',
  async (yearMonth) => {
    const response = await fetch(`/api/master/fetchDashboardStatisticsBasedOnCustomerAndMonth/C001/${yearMonth}/`);
    return response.json();
  }
);


//all delivery onclick by chart show
export const fetchMasterStaticData = createAsyncThunk(
  'masterStaticData/fetchMasterStaticData',
  async ({ selectedSegment, queryName, yearMonth }) => {
    try {
      const response = await axios.get(`/api/master/fetchDashboardStatisticsBasedOnCustomerAndMonth/C001/${yearMonth}?${queryName}=${selectedSegment}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch master static data');
    }
  }
);



// delivery wise data fetch
export const fetchDeliveryByPlants = createAsyncThunk(
  'masterStaticData/fetchDeliveryByPlants',
  async ({ selectedCity , yearMonth}) => {
    try {
      const response = await axios.get(`/api/master/fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant/C001/${yearMonth}/${selectedCity}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch delivery by plants data');
    }
  }
);



//all delivery onclick by chart show
export const fetchMasterByPlants = createAsyncThunk(
  'masterStaticData/fetchMasterByPlants',
  async ({ selectedSegment, queryName, yearMonth }) => {
    try {
      const response = await axios.get(`/api/master/fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant/C001/${yearMonth}/HMC?${queryName}=${selectedSegment}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch master static data');
    }
  }
);


const masterStaticSlice = createSlice({
  name: 'masterStaticData',
  initialState: {
    selectedSegment: null,
    selectedCityByDeliveryPlant: null,
    masterData: [],
    deliveryByData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedSegment: (state, action) => {
      state.selectedSegment = action.payload;
    },
    setSelectedCityByDeliveryPlant: (state, action) => {
      state.selectedCityByDeliveryPlant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatisticsByYearMonth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStatisticsByYearMonth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryByData = action.payload;
      })
      .addCase(fetchDashboardStatisticsByYearMonth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMasterStaticData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMasterStaticData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.masterData = action.payload;
      })
      .addCase(fetchMasterStaticData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMasterByPlants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMasterByPlants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.masterData = action.payload;
      })
      .addCase(fetchMasterByPlants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchDeliveryByPlants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryByPlants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryByData = action.payload;
      })
      .addCase(fetchDeliveryByPlants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedSegment, setSelectedCityByDeliveryPlant } = masterStaticSlice.actions;

export default masterStaticSlice.reducer;
