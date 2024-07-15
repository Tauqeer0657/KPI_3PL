
// export default PlantChart;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import Cards from "../ChartCards/Cards";
import VehicleUtilizationChart from "./AllChart/VehicleUtilizationChart";
import CollectionComplianceChart from "./AllChart/CollectionComplianceChart";
import DispatchComplianceChart from "./AllChart/DispatchComplianceChart";
import NumberOfTripsChart from "./AllChart/NumberOfTripsChart";
import VehicleTypeChart from "./AllChart/VehicleTypeChart";
import ModeOfDeliveryChart from "./AllChart/ModeOfDeliveryChart";
import {
  fetchDeliveryPlants,
} from "../../../features/Chart/dataSlice";
import { fetchDashboardStatisticsByYearMonth, fetchDeliveryByPlants } from '../../../features/Chart/masterStaticSlice';
import { setDisplayedMonthYear } from '../../../features/Date/dateSlice'

const cardStyle = {
  height: "200px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  padding: "10px",
  boxSizing: "border-box",
};

const PlantChart = () => {
  const dispatch = useDispatch();
  const { deliveryPlants } = useSelector((state) => state.chartData);
  const { deliveryByData } = useSelector((state) => state.master);
  const displayedMonthYear = useSelector((state) => state.date.displayedMonthYear);

  const [selectedCity, setSelectedCity] = useState("All");

  const yearMonth = displayedMonthYear;
  
  useEffect(() => {
    dispatch(setDisplayedMonthYear());
    dispatch(fetchDeliveryPlants());
    dispatch(fetchDashboardStatisticsByYearMonth(yearMonth));
  }, [dispatch, yearMonth]);

  useEffect(() => {
    if (selectedCity !== "All") {
      dispatch(fetchDeliveryByPlants({ selectedCity, yearMonth }));
    }
  }, [dispatch, selectedCity, yearMonth] );

  const handleCityClick = (city) => {
    setSelectedCity(city);
    if (city === "All") {
      dispatch(fetchDashboardStatisticsByYearMonth(yearMonth));
    } else {
      dispatch(fetchDeliveryByPlants({ selectedCity: city , yearMonth}));
    }
  };

  return (
    <>
      <Cards 
      selectedCity={selectedCity}
      yearMonth={yearMonth}
      
      />
      <Box
        component="main"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "70vh",
          marginTop: "10px",
        }}
      >
        <Grid container>
          {deliveryByData && Object.keys(deliveryByData).length > 0 ? (
            <>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <VehicleUtilizationChart
                    data={deliveryByData.AverageVehicleUtilizationPercentageByDeliveryPlant || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <CollectionComplianceChart
                    data={deliveryByData.EcciCountByCollectionCompliance || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <DispatchComplianceChart
                    data={deliveryByData.EcciCountByDispatchCompliance || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <NumberOfTripsChart
                    data={deliveryByData.TransactionNumberByDeliveryPlant || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <VehicleTypeChart
                    data={deliveryByData.TransactionNumberByVehicleType || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3.9} sx={{ ...cardStyle }}>
                  <ModeOfDeliveryChart
                    data={deliveryByData.TransactionNumberByModeOfDelivery || []}
                    selectedCityByDeliveryPlant={selectedCity}
                    yearMonth={yearMonth}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <div className="PlantCharts-buttons">
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "#045e84",
            }}
          >
            Delivery Plant
          </span>
          <button
            className="planthchart-citybutton"
            onClick={() => handleCityClick("All")}
            style={{
              margin: "5px",
              backgroundColor: selectedCity === "All" ? "#3f51b5" : "",
              color: selectedCity === "All" ? "white" : "",
            }}
          >
            All
          </button>
          {deliveryPlants.map((plant) => (
            <button
              key={plant.deliveryPlantID}
              onClick={() => handleCityClick(plant.deliveryPlantID)}
              className="planthchart-citybutton"
              style={{
                margin: "5px",
                backgroundColor: selectedCity === plant.deliveryPlantID ? "#3f51b5" : "",
                color: selectedCity === plant.deliveryPlantID ? "white" : "",
              }}
            >
              {plant.deliveryPlantID}
            </button>
          ))}
        </div>
      </Box>
    </>
  );
};

export default PlantChart;
