import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const VehicleUtilizationChart = ({ data }) => {

  // Define unique colors for each deliveryPlant
  const colorMap = {
    "HMC": "#7FFF00",
    "JAMADOBA": "#1E90FF",
    "JODA": "#ff0037",
    "KHONDBOND": "#ffb700",
    "NINL": "#9966FF",
    "NOAMUNDI": "#E49BFF",
    "TSJ":  "#B0EBB4",
    "TSK" : "#FF70AB",
    "TSM": "#AF8F6F",
    "WB": "#FFAA80",
  };

  // Create colored data using the color map
  const coloredData = data.map((item) => ({
    ...item,
    color: colorMap[item.deliveryPlant] || "#0099ff", // Default color if plant is not in the map
  }));

  const options = {
    animationEnabled: true,
    title: {
      text: "Plant Wise - Vehicle Utilization%",
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
          y: item.AverageVehicleUtilizationPercentage || 0, // Fallback value if undefined
          color: item.color, // Apply the color to each data point
          visible: true,
          indexLabel: item.AverageVehicleUtilizationPercentage !== undefined
            ? `${item.AverageVehicleUtilizationPercentage.toFixed(1)}%`
            : "0%", // Handle undefined case
          indexLabelOrientation: "vertical",
          indexLabelFontSize: 12,
        })),
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default VehicleUtilizationChart;
