import React from "react";
import SideBar from "../../component/SideBar";
import { Box } from "@mui/material";
import PlannedvsActualChart from "./PlannedvsActualChart/PlannedvsActualChart";
import "./PlannedDcgr.css";

const PlannedDcgr = () => {
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
        <PlannedvsActualChart />
      </Box>
    </Box>
  );
};

export default PlannedDcgr;
