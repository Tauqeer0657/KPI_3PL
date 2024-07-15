
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import PostAddIcon from "@mui/icons-material/PostAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useSelector, useDispatch } from "react-redux";
import { fetchMasterStaticData, fetchMasterByPlants } from '../../../features/Chart/masterStaticSlice';

const cardContainerStyle = {
  fontSize: "1.5rem",
  color: "grey"
};

const Cards = ({ selectedCity, yearMonth }) => {
  // const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();

  const { masterData, deliveryByData, selectedSegment } = useSelector((state) => state.master);


  console.log(deliveryByData)


  useEffect(() => {
    dispatch(fetchMasterStaticData());
    dispatch(fetchMasterByPlants())
  }, [dispatch]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/dnSummary/fetchCardsStatisticsByDeliveryPlant/C001/${yearMonth}/${selectedCity}`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       const jsonData = await response.json();
  //       setChartData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [selectedCity]);


  const renderCard = (icon, label, value) => (
    <div className="card" style={{ background: "#f3e7e7" }}>
      <div className="card-numberData">
        <Typography sx={{ fontSize: 17, margin: 0, fontWeight: "600", color: "#5c62a0" }}>
          {value != null ? value.toFixed(2) : "N/A"}
        </Typography>
      </div>
      <div className="card-nameData">
        {icon}
        <Typography sx={{ fontSize: 11 }} color="text.secondary">
          {label}
        </Typography>
      </div>
    </div>
  );

  const datamaster = Array.isArray(masterData) ? masterData : [masterData];
  const dataArray = Array.isArray(deliveryByData) ? deliveryByData : [deliveryByData];
  // const dataToDisplay = selectedSegment ? datamaster : selectedCity ? chartData : dataArray;
  const dataToDisplay = selectedSegment ? datamaster : dataArray


  return (
    <Box
      component="main"
      sx={{
        background: "#23297650",
        height: "17vh",
        width: "100%",
        p: 1.2,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {dataToDisplay ? (
        dataToDisplay.map((item, index) => (
          <React.Fragment key={index}>
            {renderCard(<PostAddIcon sx={cardContainerStyle} />, "Total PO Value (IRS)", item.SumOfInvoiceValue)}
            {renderCard(<DescriptionIcon sx={cardContainerStyle} />, "3Pl Inv. Value (IRS)", item.SumOfThreePLInvoiceValue)}
            {renderCard(<DonutLargeIcon sx={cardContainerStyle} />, "Avg. Actual DCGR%", item.AvgThreePLInvoiceValuePercentage)}
            {renderCard(<LocalShippingIcon sx={cardContainerStyle} />, "Total No. of Trips", item.DistinctTransactionNumber)}
            {renderCard(<DirectionsBusIcon sx={cardContainerStyle} />, "Avg. Vehicle Utilization%", item.AverageVehicleUtilizationPercentage)}
            {renderCard(<InventoryIcon sx={cardContainerStyle} />, "No. of Package", item.SumOfNumberOfPackages)}
            {renderCard(<PostAddIcon sx={cardContainerStyle} />, "No. of ECCI", item.DistinctEcciCount)}
            {renderCard(<PostAddIcon sx={cardContainerStyle} />, "GRN Done (No. of ECCI)", item.DistinctTslGrnNumber)}
          </React.Fragment>
        ))
      ) : (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );

};

export default Cards;
