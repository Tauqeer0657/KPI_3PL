import CanvasJSReact from "@canvasjs/react-charts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedSegment, fetchMasterStaticData,  fetchMasterByPlants,  } from '../../../../features/Chart/masterStaticSlice'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CollectionComplianceChart = ({ data, selectedCityByDeliveryPlant , yearMonth}) => {
  const [selectedSegment, setLocalSelectedSegment] = useState(null);
  const dispatch = useDispatch();
  const { masterData, selectedSegment: reduxSelectedSegment } = useSelector((state) => state.master);

  const dispatchData = masterData?.EcciCountByCollectionCompliance;
  const dataToDisplay = reduxSelectedSegment ? dispatchData : data;
  const validDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];


  const handleLegendClick = (e) => {
    const clickedSegment = e.dataPoint.legendText;
    const newSegment = selectedSegment === clickedSegment ? null : clickedSegment;
    setLocalSelectedSegment(newSegment);
    dispatch(setSelectedSegment(newSegment));

    if(selectedCityByDeliveryPlant === "All"){
      dispatch(fetchMasterStaticData({ selectedSegment: newSegment, queryName: 'collectionCompliance', yearMonth }));
    }else{
      dispatch(fetchMasterByPlants({
        selectedCityByDeliveryPlant,
        selectedSegment:newSegment,
        queryName: "collectionCompliance",
        yearMonth
      }))
    }
  };

  const handleToolTip = (e) => {
    const { dataPoint } = e.entries[0];
    return `Collection Compliance: ${dataPoint.legendText} <br> Count of Ecci COUNT: ${dataPoint.y}`;
  };

  const getColor = (collectionCompliance) => {
    switch (collectionCompliance) {
      case "On Time":
        return "#7FFF00"; // Green
      case "Delay - OWM":
        return "#1E90FF"; // Blue
      case "Delay - Other Reason":
        return "#ff0037"; // Red
      default:
        return "#0099ff"; // Default color
    }
  };

  const coloredData = validDataToDisplay.map((item) => ({
    ...item,
    color: getColor(item.collectionCompliance),
  }));

  const options = {
    animationEnabled: true,
    title: {
      text: "Collection Compliance",
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
    },
    toolTip: {
      content: handleToolTip,
    },
    height: 180,
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontSize: 9,
      cursor: "pointer",
      itemclick: handleLegendClick,
    },
    data: [
      {
        showInLegend: true,
        type: "doughnut",
        dataPoints: coloredData.map((item) => {
          const isSelected = selectedSegment === item.collectionCompliance;
          return {
            legendText: item.collectionCompliance,
            label: selectedSegment ? (isSelected ? item.ecciCount : null) : item.ecciCount,
            y: item.ecciCount,
            visible: true,
            exploded: isSelected,
            color: isSelected ? item.color : (selectedSegment ? `${item.color}20` : item.color),
          };
        }),
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default CollectionComplianceChart;


