import { Box, IconButton, InputBase } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar";
import "./History.css";



import HistoryCards from "./HistoryCards";
import PlantChart from "../Dashboard/Chart/PlantChart";


const History = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
    
        <HistoryCards />
        <PlantChart/>
      </Box>

     
    </Box>
  );
};

export default History;
