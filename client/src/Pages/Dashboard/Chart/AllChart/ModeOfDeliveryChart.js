import CanvasJSReact from "@canvasjs/react-charts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSegment, fetchMasterStaticData, fetchMasterByPlants } from '../../../../features/Chart/masterStaticSlice';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ModeOfDeliveryChart = ({ data , selectedCityByDeliveryPlant, yearMonth}) => {
  const dispatch = useDispatch();

  const [selectedSegment, setLocalSelectedSegment] = useState(null);
  const { masterData, selectedSegment: testData } = useSelector((state) => state.master);


  const disPatchData = masterData.TransactionNumberByModeOfDelivery
  const dataToDisplay = testData ? disPatchData : data;

  const validDataToDisplay = Array.isArray(dataToDisplay) ? dataToDisplay : [];


const handleLegendClick = (e) => {
  const clickedSegment = e.dataPoint.legendText;
  const newSegment = selectedSegment === clickedSegment ? null : clickedSegment;
  setLocalSelectedSegment(newSegment);
  dispatch(setSelectedSegment(newSegment));

  if(selectedCityByDeliveryPlant === "All"){
    dispatch(fetchMasterStaticData({ selectedSegment: newSegment, queryName: 'modeOfDelivery', yearMonth }));
  }else{
    dispatch(fetchMasterByPlants({
      selectedCityByDeliveryPlant,
      selectedSegment:newSegment,
      queryName: "modeOfDelivery",
      yearMonth
    }))
  }
};



  const handleToolTip = (e) => {
    const { dataPoint } = e.entries[0];
    return `Mode of Delivery: ${dataPoint.legendText} <br> Count of TRNS No: ${dataPoint.y} `;
  };


const defaultColors = ["#ffb700","#9966FF", "#B51B75", "#006769"];
const greenColor = "#7FFF00";
const blueColor = "#1E90FF"; 
const redColor = "#ff0037"; 

const coloredData = validDataToDisplay.map((item, index) => ({
  ...item,
  color: item.modeOfDelivery === "MILK RUN" ? greenColor : 
         item.modeOfDelivery === "EXPRESS DELIVERY" ? blueColor : 
         item.modeOfDelivery === "DIRECT DELIVERY"? redColor : 
         (item.color || defaultColors[index % defaultColors.length]),
}));


  const options = {
    animationEnabled: true,
    title: {
      text: "Mode of Delivery",
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
          const isSelected = selectedSegment ===  item.modeOfDelivery;
          return {
            legendText:  item.modeOfDelivery,
          
            label: selectedSegment ? (isSelected ? item.TransactionNumber : null) : item.TransactionNumber,
    
            y: item.TransactionNumber,
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

export default ModeOfDeliveryChart;
