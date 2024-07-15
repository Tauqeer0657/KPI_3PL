// menuItems.js
import React from "react";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export const menuItems = [
  { text: "Dashboard", icon: <LeaderboardIcon  />, path: "/dashboard" },
  { text: "Planned DCGR", icon: <LeaderboardIcon  />, path: "/PlannedDcgr" },
  { text: "History", icon: <CalendarMonthIcon />, path: "/history" },
];
