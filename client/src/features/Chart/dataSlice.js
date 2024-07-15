import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// correct
export const fetchDeliveryPlants = createAsyncThunk(    
  'data/fetchDeliveryPlants',
  async () => {
    const response = await fetch('/api/customerDeliveryPlant/C001');
    return response.json();
  }
);


// Create the slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    deliveryPlants: [],
    loading: false,
    error: null,
    selectedSegment: null,
  },
  reducers: {
    setSelectedSegment: (state, action) => {
      state.selectedSegment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchDeliveryPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryPlants.fulfilled, (state, action) => {
        state.deliveryPlants = action.payload;
        state.loading = false;
      })
      .addCase(fetchDeliveryPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setSelectedSegment } = dataSlice.actions;

export default dataSlice.reducer;