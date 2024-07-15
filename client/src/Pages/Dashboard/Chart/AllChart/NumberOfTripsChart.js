import CanvasJSReact from "@canvasjs/react-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMasterStaticData } from '../../../../features/Chart/masterStaticSlice';
import { useEffect } from "react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NumberOfTripsChart = ({ data }) => {
  const dispatch = useDispatch();
  const { masterData, selectedSegment: testData } = useSelector((state) => state.master);


  useEffect(() => {
    dispatch(fetchMasterStaticData());
  }, [dispatch]);


  const disPatchData = masterData.TransactionNumberByDeliveryPlant
  const dataToDisplay = testData ? disPatchData : data;
  const validDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];

   // Define unique colors for each deliveryPlant
   const colorMap = {
    "HMC": "#7FFF00",
    "JAMADOBA": "#1E90FF",
    "JODA": "#ff0037",
    "KHONDBOND":"#ffb700",
    "NINL": "#9966FF",
    "NOAMUNDI": "#E49BFF",
    "TSJ":  "#B0EBB4",
    "TSK" : "#FF70AB",
    "TSM": "#AF8F6F",
    "WB": "#FFAA80",
   
  };

  // Create colored data using the color map
  const coloredData = validDataToDisplay.map((item) => ({
    ...item,
    color: colorMap[item.deliveryPlant] || ["#0099ff","#FF5580", "#E1AFD1"] // Default color if plant is not in the map
  }));


  const options = {
    animationEnabled: true,
    title: {
      text: "Plant Wise - No. of Trips",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    axisX: {
      labelFontFamily: "Arial",
      labelFontSize: 8,
    },
    axisY: {
      labelFontFamily: "Arial",
      labelFontSize: 8,
      labelFontColor: "#777",
      gridThickness: 0,
    },
    height: 180,
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontSize: 9,
      cursor: "pointer",
      itemclick: (e) => {
        e.dataSeries.dataPoints[e.dataPointIndex].visible =
          !e.dataSeries.dataPoints[e.dataPointIndex].visible;
        e.chart.render();
      },
    },
    data: [
      {
        type: "column",
        dataPoints: coloredData.map((item) => ({
          label: item.deliveryPlant,
          y: item.TransactionNumber,
          visible: true,
          color: item.color, 
          indexLabel: `${item.TransactionNumber}`,
        })),
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default NumberOfTripsChart;
