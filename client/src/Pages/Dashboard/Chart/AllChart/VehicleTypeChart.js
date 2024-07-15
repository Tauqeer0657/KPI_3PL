import CanvasJSReact from "@canvasjs/react-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMasterStaticData } from '../../../../features/Chart/masterStaticSlice';
import { useEffect } from "react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const VehicleTypeChart = ({ data }) => {
    
  const dispatch = useDispatch();
  const { masterData, selectedSegment: testData } = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(fetchMasterStaticData());
  }, [dispatch]);



  const disPatchData = masterData.TransactionNumberByVehicleType
  const dataToDisplay = testData ? disPatchData : data;
  const validDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];

  // Define unique colors for each deliveryPlant
  const colorMap = {
    "LPT/407": "#7FFF00",
    "PICKUP": "#1E90FF",
   "TRAILER 27.5T": "#ff0037",
    "TRUCK 19.5T": "#ffb700",
    "TRUCK 8.4T": "#9966FF",
  };

  // Create colored data using the color map
  const coloredData = validDataToDisplay.map((item) => ({
    ...item,
    color: colorMap[item.vehicleType] || ["#0099ff", "#FF5580", "#E1AFD1"], // Default color if plant is not in the map
  }));

  const options = {
    animationEnabled: true,
    title: {
      text: "Vehicle Type - No. of Trips",
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
          label: item.vehicleType,
          y: item.TransactionNumber,
          color: item.color, 
          visible: true,
          indexLabel: `${item.TransactionNumber}`,
        })),
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default VehicleTypeChart;
