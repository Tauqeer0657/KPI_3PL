import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";



// creating task data
export const uplodDnFile = createAsyncThunk(
  "task/createTaskData",
  async (taskData) => {
    try {
      const response = await axios.post('', taskData);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);