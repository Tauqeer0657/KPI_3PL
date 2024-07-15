


// import React, { useEffect, useState } from "react";
// import Cards2 from "../ChartCards/Cards2";
// import { Box, Grid } from "@mui/material";
// import CanvasJSReact from "@canvasjs/react-charts";
// import { useDispatch, useSelector } from "react-redux";
// import { setDisplayedMonthYear } from '../../../features/Date/dateSlice'

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const cardStyle = {
//   height: "210px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   padding: "10px",
//   boxSizing: "border-box",
// };

// const cardStyle2 = {
//   height: "435px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   padding: "10px",
//   boxSizing: "border-box",
// };

// const PlannedvsActualChart = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   const [sumOfTslSavingIRSData, setSumOfTslSavingIRSData] = useState([]);
//   const [averagePlannedAndActualDCGRData, setAveragePlannedAndActualDCGRData] = useState([]);
//   const [sumOfPlannedAndActual3PLInvoiceData, setSumOfPlannedAndActual3PLInvoiceData] = useState([]);
//   const [totalSumOfTslSavingIRS, setTotalSumOfTslSavingIRS] = useState(0);

//   const displayedMonthYear = useSelector((state) => state.date.displayedMonthYear);

//   const yearMonth = displayedMonthYear;

//   useEffect(() => {
//     dispatch(setDisplayedMonthYear());
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `api/master/fetchPlannedDCGRDashboardBasedOnCustomerAndMonth/C001/${yearMonth}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok.");
//         }
//         const jsonData = await response.json();

//         setSumOfTslSavingIRSData(jsonData.SumOfTslSavingIRSByDeliveryPlant);
//         setAveragePlannedAndActualDCGRData(jsonData.AveragePlannedAndActualDCGRPercentageByDeliveryPlant);
//         setSumOfPlannedAndActual3PLInvoiceData(jsonData.SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant);
//         setTotalSumOfTslSavingIRS(jsonData.SumOftslSavingIRS);
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const colorMap = {
//     HMC: "#7FFF00",
//     JAMADOBA: "#1E90FF",
//     JODA: "#ff0037",
//     KHONDBOND: "#ffb700",
//     NINL: "#9966FF",
//     NOAMUNDI: "#E49BFF",
//     TSJ: "#B0EBB4",
//     TSK: "#FF70AB",
//     TSM: "#AF8F6F",
//     WB: "#FFAA80",
//   };

//   const sortedSumOfTslSavingIRSData = [...sumOfTslSavingIRSData].sort(
//     (a, b) => b.SumOfTslSavingIRS - a.SumOfTslSavingIRS
//   );
//   const sortedAveragePlannedAndActualDCGRData = [...averagePlannedAndActualDCGRData].sort(
//     (a, b) => b.AvgPlannedDCGRPercentage - a.AvgPlannedDCGRPercentage
//   );
//   const sortedSumOfPlannedAndActual3PLInvoiceData = [...sumOfPlannedAndActual3PLInvoiceData].sort(
//     (a, b) => b.SumPlanned3PLInvoiceValue - a.SumPlanned3PLInvoiceValue
//   );

  


//   const averagePlannedAndActualDCGROptions = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "3PL DCGR% Planned Vs Actual",
//       fontSize: 12,
//       fontFamily: "Arial",
//       fontWeight: "bold",
//     },
//     axisY: {
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       gridThickness: 0,
//       labelFormatter: function () {
//         return "";
//       },
//     },
//     axisX: {
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       labelFontColor: "#777",
//     },
//     height: 185,
//     dataPointWidth: 20,
//     legend: {
//       horizontalAlign: "right",
//       verticalAlign: "center",
//       fontSize: 9,
//       cursor: "pointer",
//     },
//     data: [
//       {
//         type: "column",
//         name: "Planned DCGR",
//         showInLegend: true,
//         toolTipContent: "{name}({label}): {y}%",
//         indexLabel: "{y}%",
//         indexLabelFontSize: 11,
//         indexLabelOrientation: "horizontal",
//         dataPoints: sortedAveragePlannedAndActualDCGRData.map((item) => ({
//           label: item.deliveryPlant,
//           y: item.AvgPlannedDCGRPercentage * 100,
//           color: colorMap[item.deliveryPlant],
//         })),
//       },
//       {
//         type: "line",
//         name: "Actual DCGR",
//         showInLegend: true,
//         toolTipContent: "{name}({label}): {y}%",
//         indexLabel: "{y}%",
//         indexLabelFontSize: 10,
//         indexLabelOrientation: "horizontal",
//         indexLabelFontColor: "black",
//         dataPoints: sortedAveragePlannedAndActualDCGRData.map((item) => ({
//           label: item.deliveryPlant,
//           y: item.AvgThreePLActualDCGRPercentage,
//         })),
//       },
//     ],
//   };

//   const sumOfPlannedAndActual3PLInvoiceOptions = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "3PL Invoice Value Planned Vs Actual",
//       fontSize: 12,
//       fontFamily: "Arial",
//       fontWeight: "bold",
//     },
//     axisY: {
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       gridThickness: 0,
//       labelFormatter: function () {
//         return "";
//       },
//     },
//     axisX: {
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       labelFontColor: "#777",
//     },
//     height: 185,
//     legend: {
//       horizontalAlign: "right",
//       verticalAlign: "center",
//       fontSize: 9,
//       cursor: "pointer",
//     },
//     data: [
//       {
//         type: "column",
//         name: "Planned 3PL Invoice",
//         showInLegend: true,
//         toolTipContent: "{name}({label}): {y}",
//         indexLabel: "{y}",
//         indexLabelFontSize: 10,
//         indexLabelFontColor: "black",
//         indexLabelOrientation: "vertical",
//         dataPoints: sortedSumOfPlannedAndActual3PLInvoiceData.map((item) => ({
//           label: item.deliveryPlant,
//           y: item.SumPlanned3PLInvoiceValue,
//           color: colorMap[item.deliveryPlant],
//         })),
//       },
//       {
//         type: "column",
//         name: "Actual 3PL Invoice",
//         showInLegend: true,
//         toolTipContent: "{name}({label}): {y}",
//         indexLabel: "{y}",
//         indexLabelFontSize: 9,
//         indexLabelOrientation: "vertical",
//         dataPoints: sortedSumOfPlannedAndActual3PLInvoiceData.map((item) => ({
//           label: item.deliveryPlant,
//           y: item.SumThreePLInvoiceValue,
//         })),
//       },
//     ],
//   };

//   const sumOfTslSavingIRSOptions = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "TSL Saving from 3PL Project (IRS)",
//       fontSize: 14,
//       fontFamily: "Arial",
//       fontWeight: "bold",
//     },
//     axisY: {
//       prefix: "₹",
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       minimum: 0,
//       interval: 5000000,
//     },
//     axisX: {
//       labelFontFamily: "Arial",
//       labelFontSize: 8,
//       labelFontColor: "#777",
//     },
//     height: 415,
//     dataPointWidth: 20,
//     data: [
//       {
//         type: "waterfall",
//         toolTipContent: "{label}: {y}",
//         indexLabel: "{y}",
//         indexLabelFontSize: 11,
//         indexLabelFontColor: "black",
//         indexLabelOrientation: "vertical",
//         dataPoints: [
//           ...sortedSumOfTslSavingIRSData.map((item) => ({
//             label: item.deliveryPlant,
//             y: item.SumOfTslSavingIRS,
//             color: colorMap[item.deliveryPlant],
//           })),
//           { label: "Total", y: totalSumOfTslSavingIRS },
//         ],
//       },
//     ],
//   };

//   return (
//     <>
//       <Cards2
//         data={data}

//       />
//       <Box
//         component="main"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           width: "100%",
//           height: "70vh",
//           marginTop: "10px",
//         }}
//       >
//         <Grid
//           container
//           sx={{
//             width: "50%",
//             height: "100%",
//             alignItems: "center",
//             justifyContent: "flex-start"
//           }}
//         >
//           <Grid item md={11.5} sx={{ ...cardStyle }}>
//             <CanvasJSChart options={averagePlannedAndActualDCGROptions} />
//           </Grid>
//           <Grid item md={11.5} sx={{ ...cardStyle }}>
//             <CanvasJSChart options={sumOfPlannedAndActual3PLInvoiceOptions} />
//           </Grid>
//         </Grid>
//         <Grid
//           container
//           sx={{
//             width: "50%",
//             height: "100%",
//             alignItems: "center",
//             justifyContent: "flex-end"
//           }}
//         >
//           <Grid item md={12} sx={{ ...cardStyle2 }}>
//             <CanvasJSChart options={sumOfTslSavingIRSOptions} />
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default PlannedvsActualChart;




// src/components/PlannedvsActualChart/PlannedvsActualChart.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchPlannedDashboardData } from '../../../features/Chart/plannedSlice';
import { setDisplayedMonthYear } from '../../../features/Date/dateSlice';
import Cards2 from '../ChartCards/Cards2';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const cardStyle = {
  height: '210px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '10px',
  boxSizing: 'border-box',
};

const cardStyle2 = {
  height: '435px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '10px',
  boxSizing: 'border-box',
};

const PlannedvsActualChart = () => {
  const dispatch = useDispatch();
  const {
    data,
    sumOfTslSavingIRSData,
    averagePlannedAndActualDCGRData,
    sumOfPlannedAndActual3PLInvoiceData,
    totalSumOfTslSavingIRS,
  } = useSelector((state) => state.planned);

  const displayedMonthYear = useSelector((state) => state.date.displayedMonthYear);

  console.log(displayedMonthYear)

  const handClick = (e) => {
    console.log(`Clicked on: ${e.dataPoint.label}, Value: ${e.dataPoint.y}`);
 
  };
  

  useEffect(() => {
    dispatch(setDisplayedMonthYear());
    dispatch( fetchPlannedDashboardData(displayedMonthYear));
  }, [dispatch, displayedMonthYear]);

  const colorMap = {
    HMC: '#7FFF00',
    JAMADOBA: '#1E90FF',
    JODA: '#ff0037',
    KHONDBOND: '#ffb700',
    NINL: '#9966FF',
    NOAMUNDI: '#E49BFF',
    TSJ: '#B0EBB4',
    TSK: '#FF70AB',
    TSM: '#AF8F6F',
    WB: '#FFAA80',
  };

  const sortedSumOfTslSavingIRSData = [...sumOfTslSavingIRSData].sort(
    (a, b) => b.SumOfTslSavingIRS - a.SumOfTslSavingIRS
  );
  const sortedAveragePlannedAndActualDCGRData = [...averagePlannedAndActualDCGRData].sort(
    (a, b) => b.AvgPlannedDCGRPercentage - a.AvgPlannedDCGRPercentage
  );
  const sortedSumOfPlannedAndActual3PLInvoiceData = [...sumOfPlannedAndActual3PLInvoiceData].sort(
    (a, b) => b.SumPlanned3PLInvoiceValue - a.SumPlanned3PLInvoiceValue
  );

  const averagePlannedAndActualDCGROptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: '3PL DCGR% Planned Vs Actual',
      fontSize: 12,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    },
    axisY: {
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      gridThickness: 0,
      labelFormatter: function () {
        return '';
      },
    
    },
    axisX: {
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      labelFontColor: '#777',
    },
    height: 185,
    dataPointWidth: 20,
    legend: {
      horizontalAlign: 'right',
      verticalAlign: 'center',
      fontSize: 9,
      cursor: 'pointer',
    },
    data: [
      {
        type: 'column',
        name: 'Planned DCGR',
        showInLegend: true,
        toolTipContent: '{name}({label}): {y}%',
        indexLabel: '{y}%',
        indexLabelFontSize: 11,
        indexLabelOrientation: 'horizontal',
        dataPoints: sortedAveragePlannedAndActualDCGRData.map((item) => ({
          label: item.deliveryPlant,
          y: item.AvgPlannedDCGRPercentage * 100,
          color: colorMap[item.deliveryPlant],
          cursor: 'pointer',
          click: handClick,
        })),
      },
      {
        type: 'line',
        name: 'Actual DCGR',
        showInLegend: true,
        toolTipContent: '{name}({label}): {y}%',
        indexLabel: '{y}%',
        indexLabelFontSize: 10,
        indexLabelOrientation: 'horizontal',
        indexLabelFontColor: 'black',
        dataPoints: sortedAveragePlannedAndActualDCGRData.map((item) => ({
          label: item.deliveryPlant,
          y: item.AvgThreePLActualDCGRPercentage,
          click: handClick,
        })),
      },
    ],
  };

  const sumOfPlannedAndActual3PLInvoiceOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: '3PL Invoice Value Planned Vs Actual',
      fontSize: 12,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    },
    axisY: {
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      gridThickness: 0,
      labelFormatter: function () {
        return '';
      },
    },
    axisX: {
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      labelFontColor: '#777',
    },
    height: 185,
    legend: {
      horizontalAlign: 'right',
      verticalAlign: 'center',
      fontSize: 9,
      cursor: 'pointer',
    },
    data: [
      {
        type: 'column',
        name: 'Planned 3PL Invoice',
        showInLegend: true,
        toolTipContent: '{name}({label}): {y}',
        indexLabel: '{y}',
        indexLabelFontSize: 10,
        indexLabelFontColor: 'black',
        indexLabelOrientation: 'vertical',
        dataPoints: sortedSumOfPlannedAndActual3PLInvoiceData.map((item) => ({
          label: item.deliveryPlant,
          y: item.SumPlanned3PLInvoiceValue,
          color: colorMap[item.deliveryPlant],
        })),
      },
      {
        type: 'column',
        name: 'Actual 3PL Invoice',
        showInLegend: true,
        toolTipContent: '{name}({label}): {y}',
        indexLabel: '{y}',
        indexLabelFontSize: 9,
        indexLabelOrientation: 'vertical',
        dataPoints: sortedSumOfPlannedAndActual3PLInvoiceData.map((item) => ({
          label: item.deliveryPlant,
          y: item.SumThreePLInvoiceValue,
        })),
      },
    ],
  };

  const sumOfTslSavingIRSOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'TSL Saving from 3PL Project (IRS)',
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    },
    axisY: {
      prefix: '₹',
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      minimum: 0,
      interval: 5000000,
    },
    axisX: {
      labelFontFamily: 'Arial',
      labelFontSize: 8,
      labelFontColor: '#777',
    },
    height: 415,
    dataPointWidth: 20,
    data: [
      {
        type: 'waterfall',
        toolTipContent: '{label}: {y}',
        indexLabel: '{y}',
        indexLabelFontSize: 11,
        indexLabelFontColor: 'black',
        indexLabelOrientation: 'vertical',
        dataPoints: [
          ...sortedSumOfTslSavingIRSData.map((item) => ({
            label: item.deliveryPlant,
            y: item.SumOfTslSavingIRS,
            color: colorMap[item.deliveryPlant],
          })),
          { label: 'Total', y: totalSumOfTslSavingIRS },
        ],
      },
    ],
  };

  return (
    <>
      <Cards2 data={data} />
      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '70vh',
          marginTop: '10px',
        }}
      >
        <Grid
          container
          sx={{
            width: '50%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Grid item md={11.5} sx={{ ...cardStyle }}>
            <CanvasJSChart options={averagePlannedAndActualDCGROptions} />
          </Grid>
          <Grid item md={11.5} sx={{ ...cardStyle }}>
            <CanvasJSChart options={sumOfPlannedAndActual3PLInvoiceOptions} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: '50%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Grid item md={12} sx={{ ...cardStyle2 }}>
            <CanvasJSChart options={sumOfTslSavingIRSOptions} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlannedvsActualChart;
