import React from "react";

import Box from "@mui/material/Box";
import SideBar from "../../component/SideBar";
import PlantChart from "./Chart/PlantChart";

import "./Dashboard.css"

export const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "55px",
          height: "93vh",
        }}
      >
        
        <PlantChart />
      </Box>
    </Box>
  );
};
