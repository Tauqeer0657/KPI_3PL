import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setDisplayedMonthYear } from '../../features/Date/dateSlice';

// Function to get the previous month and year
const getPreviousMonthYear = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 2);
  return dayjs(currentDate);
};

const DateComponent = () => {
  const dispatch = useDispatch();

  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(getPreviousMonthYear());

  useEffect(() => {
    if (selectedDate) {
     
      const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
      ];
      const month = monthNames[selectedDate.month()]; 
      const year = selectedDate.year(); 
      dispatch(setDisplayedMonthYear(`${month}${year}`)); 
    }
  }, [selectedDate, dispatch]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          openTo="month"
          views={["year", "month"]}
          value={selectedDate}
          onChange={handleDateChange}
        
          renderInput={(params) => <TextField {...params}  />}
          
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateComponent;
