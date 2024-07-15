import axios from "axios";
import { Link } from "react-router-dom";
import { Button,  Typography, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import DnUpload from "./UploadFile/DnUpload";
import MdUpload from "./UploadFile/MdUpload";
import DcUpload from "./UploadFile/DcUpload";
import KpiUpload from "./UploadFile/KpiUpload";
import Header2 from "../../component/Header2";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DCPlannedUpload from "./UploadFile/DCPlannedUpload";
import "./Upload.css";

axios.defaults.withCredentials = true;

const Upload = () => {
  const [customerData, setCustomerData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/customer");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json();

        setCustomerData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // if (date) {
    //   const formattedDate = dayjs(date).format('MM/YYYY');
    //   setSelectedDate(formattedDate);
    // } else {
    //   console.log("Date is null or undefined");
    // }
  };

  return (
    <>
      <Header2 />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "55px",
        }}
      >
        <div className="upload-header-section">
          <h3>Upload Monthly KPI</h3>
          <div className="upload-header-buttons">
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="customerId">Customer ID</InputLabel>

              {customerData && (
                <Select
                  labelId="customerId"
                  id="customerId"
                  label="Customer ID"
                  value={selectedCustomer}
                  onChange={handleCustomerChange}
                >
                  {customerData.map((item) => (
                    <MenuItem key={item.customerID} value={item.customerID}>
                      {item.customerID} - {item.customerName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker"]}
                sx={{ padding: 2 }}
              >
                <DatePicker
                  label={"Date"}
                  openTo="month"
                  views={["year", "month"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
            
          </div>
        </div>

        <div className="upload-cards-section">
          {/* DN Sumaary excel file Uplod */}
          <div className="upload-card">
            <Grid
              container
              style={{
                padding: "20px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "inherit",
                    textTransform: "capitalize",
                    marginBottom: "20px",
                  }}
                >
                  DN Summary
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/dn">
                  <Button variant="contained" color="warning">
                    View Report
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <DnUpload
                  customerID={selectedCustomer}
                  selectDate={selectedDate}
                />

                {/* {lastUpload.length > 0 && (
              <span>
                Last Uploaded by: {lastUpload[lastUpload.length - 1].user.name}{" "}
                on Date :
                {format(
                  new Date(lastUpload[lastUpload.length - 1].sendDate),
                  "MM/dd/yyyy"
                )}
              </span>
            )} */}
              </Grid>
            </Grid>
          </div>

          {/* Master excel file Uplod */}
          <div className="upload-card">
            <Grid
              container
              style={{
                padding: "20px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "inherit",
                    textTransform: "capitalize",
                    marginBottom: "20px",
                  }}
                >
                  Master Data
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/collsch">
                  <Button variant="contained" color="warning">
                    View Report
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <MdUpload
                  customerID={selectedCustomer}
                  selectDate={selectedDate}
                />
              </Grid>
            </Grid>
          </div>

          {/* DCgr  excel file Uplod */}
          <div className="upload-card">
            <Grid
              container
              style={{
                padding: "20px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "inherit",
                    textTransform: "capitalize",
                    marginBottom: "20px",
                  }}
                >
                  DCGR Value Vs Actual 3PL Cost
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/collsch">
                  <Button variant="contained" color="warning">
                    View Report
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <DcUpload
                  customerID={selectedCustomer}
                  selectDate={selectedDate}
                />
              </Grid>
            </Grid>
          </div>

          {/* DCgrPlanned  excel file Uplod */}
          <div className="upload-card">
            <Grid
              container
              style={{
                padding: "20px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "inherit",
                    textTransform: "capitalize",
                    marginBottom: "20px",
                  }}
                >
                  DCGR_Planned Value Vs Actual 3PL Cost
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/collsch">
                  <Button variant="contained" color="warning">
                    View Report
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <DCPlannedUpload
                  customerID={selectedCustomer}
                  selectDate={selectedDate}
                />
              </Grid>
            </Grid>
          </div>

          {/*KPI excel file Uplod */}
          <div className="upload-card">
            <Grid
              container
              style={{
                padding: "20px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "inherit",
                    textTransform: "capitalize",
                    marginBottom: "20px",
                  }}
                >
                  KPI
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/collsch">
                  <Button variant="contained" color="warning">
                    View Report
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <KpiUpload />
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Upload;
