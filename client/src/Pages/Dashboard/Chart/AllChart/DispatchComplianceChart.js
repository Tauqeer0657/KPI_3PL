import CanvasJSReact from "@canvasjs/react-charts";
import { useState } from "react";
import { setSelectedSegment, fetchMasterStaticData, fetchMasterByPlants } from '../../../../features/Chart/masterStaticSlice';
import { useDispatch, useSelector } from "react-redux";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DispatchComplianceChart = ({ data, selectedCityByDeliveryPlant, yearMonth }) => {
  const dispatch = useDispatch();
  const [selectedSegment, setLocalSelectedSegment] = useState(null);
  const { masterData, selectedSegment: testData } = useSelector((state) => state.master);
  const disPatchData = masterData.EcciCountByDispatchCompliance
  const dataToDisplay = testData ? disPatchData : data;
  const validDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];


 

  const handleLegendClick = (e) => {
    const clickedSegment = e.dataPoint.legendText;
    const newSegment = selectedSegment === clickedSegment ? null : clickedSegment;
    setLocalSelectedSegment(newSegment);
    dispatch(setSelectedSegment(newSegment));

    if(selectedCityByDeliveryPlant === "All"){
      dispatch(fetchMasterStaticData({ selectedSegment: newSegment, queryName: 'dispatchCompliance', yearMonth }));
    }else{
      dispatch(fetchMasterByPlants({
        selectedCityByDeliveryPlant,
        selectedSegment:newSegment,
        queryName: "dispatchCompliance",
        yearMonth
      }))
    }
  };


  const handleToolTip = (e) => {
    const { dataPoint } = e.entries[0];
    return `Dispatch Compliance: ${dataPoint.legendText} <br> Count of Ecci COUNT: ${dataPoint.y} `;
  };

  // Assign default colors if item.color is not defined

  const defaultColors = ["#ffb700",  "#4BC0C0", "#9966FF"];
  const greenColor = "#7FFF00";
  const blueColor = "#1E90FF"; 
  const redColor = "#ff0037"; 

  const coloredData = validDataToDisplay.map((item, index) => ({
    ...item,
    color: item.dispatchCompliance === "On Time" ? greenColor : 
           item.dispatchCompliance === "Delay - OWM" ? blueColor : 
           item.dispatchCompliance === "Delay - Other Reasons"? redColor : 
           (item.color || defaultColors[index % defaultColors.length]),
  }));

  
  const options = {
    animationEnabled: true,
    title: {
      text: "Dispatch Compliance",
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
          const isSelected = selectedSegment === item.dispatchCompliance;
          return {
            legendText: item.dispatchCompliance,
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

export default DispatchComplianceChart;




