// import { Box } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DonutLargeIcon from "@mui/icons-material/DonutLarge";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import LinearProgress from "@mui/material/LinearProgress";
// import "../PlannedDcgr.css";
// import { useEffect, useState } from "react";

// const Cards2 = ({data}) => {
//   const [cardData, setCardData] = useState("");

//   console.log(data, "asif nhao");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const respose = await fetch(
//           "api/plannedDcgr/fetchDashboardCardsStatistics/C001"
//         );
//         if (!respose.ok) {
//           throw new Error("Network response was not ok.");
//         }
//         const jsonData = await respose.json();
//         setCardData(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <Box
//       component="main"
//       sx={{
//         background: "#23297650",
//         height: "17vh",
//         width: "100%",
//         p: 1.2,
//         display: "flex",
//         justifyContent: "space-evenly",
//         alignItems: "center",
//       }}
//     >
//       {cardData ? (
//         <>

//         {/* SumOfTotalPoValue */}
//           {cardData.map((item) => (
//             <div className="card2" style={{ background: "#f3e7e7" }}>
//               <div className="card-numberData2">
//                 <Typography
//                   sx={{
//                     fontSize: 17,
//                     margin: 0,
//                     fontWeight: "600",
//                     color: "#5c62a0",
//                   }}
//                 >
               
//                   {item.SumOfTotalPoValue !== null
//                     ? item.SumOfTotalPoValue.toFixed(2)
//                     : "N/A"}
//                 </Typography>
//               </div>

//               <div className="card-nameData2">
//                 <PostAddIcon sx={{ fontSize: "1.5rem", color: "grey" }} />

//                 <Typography sx={{ fontSize: 11 }} color="text.secondary">
//                  Total PO Value - IRS
//                 </Typography>
//               </div>
//             </div>
//           ))}

// {/*AveragePlannedDCGRPercentage */}
// {cardData.map((item) => (
//           <div className="card2" style={{ background: "#efebf4" }}>
//             <div className="card-numberData2">
//               <Typography
//                 sx={{
//                   fontSize: 17,
//                   textAlign: "center",
//                   fontWeight: "600",
//                   margin: 0,
//                   color: "#698590",
//                 }}
//                 color="text.secondary"
//               >
            
//               {item.AveragePlannedDCGRPercentage !== null
//                     ? item.AveragePlannedDCGRPercentage.toFixed(2)+ "%"
//                     : "N/A"}
//               </Typography>
//             </div>

//             <div className="card-nameData2">
//               <DescriptionIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

//               <Typography sx={{ fontSize: 11 }} color="text.secondary">
//               Avg. Planned DCGR%
//               </Typography>
//             </div>
//           </div>
//  ))}
//  {/*AveragethreePLActualDCGRPercentage*/}
// {cardData.map((item) => (
//           <div className="card2" style={{ background: "#faf1f2" }}>
//             <div className="card-numberData2">
//               <Typography
//                 sx={{
//                   fontSize: 17,
//                   textAlign: "center",
//                   fontWeight: "600",
//                   margin: 0,
//                   color: "#5c62a0",
//                 }}
//                 color="text.secondary"
//               >
       
//                 {item.AveragethreePLActualDCGRPercentage !== null
//                     ? item.AveragethreePLActualDCGRPercentage.toFixed(2)+ "%"
//                     : "N/A"}
//               </Typography>
//             </div>

//             <div className="card-nameData2">
//               <DonutLargeIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

//               <Typography sx={{ fontSize: 11 }} color="text.secondary">
//               Avg. Actual DCGR%
//               </Typography>
//             </div>
//           </div>
//  ))}
//   {/*SumOfPlanned3PLInvoiceValue*/}
// {cardData.map((item) => (
//           <div className="card2" style={{ background: "#f0f3f3" }}>
//             <div className="card-numberData2">
//               <Typography
//                 sx={{
//                   fontSize: 17,
//                   textAlign: "center",
//                   fontWeight: "600",
//                   margin: 0,
//                   color: "#698590",
//                 }}
//                 color="text.secondary"
//               >
            
//                {item.SumOfPlanned3PLInvoiceValue !== null
//                     ? item.SumOfPlanned3PLInvoiceValue.toFixed(2)
//                     : "N/A"}
//               </Typography>
//             </div>

//             <div className="card-nameData2">
//               <LocalShippingIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

//               <Typography sx={{ fontSize: 11 }} color="text.secondary">
//              Planned 3PL Inv.(IRS)
//               </Typography>
//             </div>
//           </div>
//  ))}
//   {/*SumOfthreePLInvoiceValue*/}
// {cardData.map((item) => (
//           <div className="card2" style={{ background: "#f1eff7" }}>
//             <div className="card-numberData2">
//               <Typography
//                 sx={{
//                   fontSize: 17,
//                   textAlign: "center",
//                   fontWeight: "600",
//                   margin: 0,
//                   color: "#5c62a0",
//                 }}
//                 color="text.secondary"
//               >
          
//                 {item.SumOfthreePLInvoiceValue !== null
//                     ? item.SumOfthreePLInvoiceValue.toFixed(2)
//                     : "N/A"}
//               </Typography>
//             </div>

//             <div className="card-nameData2">
//               <DirectionsBusIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

//               <Typography sx={{ fontSize: 11 }} color="text.secondary">
//               Actual Inv. Value(IRS)
//               </Typography>
//             </div>
//           </div>
//  ))}
//    {/*SumOftslSavingIRS*/}
// {cardData.map((item) => (
//           <div className="card2" style={{ background: "#f6f7e8" }}>
//             <div className="card-numberData2">
//               <Typography
//                 sx={{
//                   fontSize: 17,
//                   textAlign: "center",
//                   fontWeight: "600",
//                   margin: 0,
//                   color: "#698590",
//                 }}
//                 color="text.secondary"
//               >
  
//                 {item.SumOftslSavingIRS !== null
//                     ? item.SumOftslSavingIRS.toFixed(2)
//                     : "N/A"}
//               </Typography>
//             </div>

//             <div className="card-nameData2">
//               <InventoryIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

//               <Typography sx={{ fontSize: 11 }} color="text.secondary">
//               TSL Saving Est. (IRS)
//               </Typography>
//             </div>
//           </div>
//            ))}
//         </>
//       ) : (
//         <Box sx={{ width: "100%" }}>
//           <LinearProgress />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Cards2;



import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import InventoryIcon from "@mui/icons-material/Inventory";
import LinearProgress from "@mui/material/LinearProgress";
import "../PlannedDcgr.css";

const Cards2 = ({ data }) => {
 

  const safeToFixed = (num, decimals = 2) =>
    num !== undefined && num !== null ? num.toFixed(decimals) : "N/A";

  const safePercentage = (num) =>
    num !== undefined && num !== null ? (num * 100).toFixed(2) + "%" : "N/A";

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
      {data ? (
        <>
          {/* SumOfTotalPoValue */}
          <div className="card2" style={{ background: "#f3e7e7" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  margin: 0,
                  fontWeight: "600",
                  color: "#5c62a0",
                }}
              >
                {safeToFixed(data.SumOfTotalPoValue)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <PostAddIcon sx={{ fontSize: "1.5rem", color: "grey" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Total PO Value - IRS
              </Typography>
            </div>
          </div>

          {/* AveragePlannedDCGRPercentage */}
          <div className="card2" style={{ background: "#efebf4" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "600",
                  margin: 0,
                  color: "#698590",
                }}
                color="text.secondary"
              >
                {safePercentage(data.AveragePlannedDCGRPercentage)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <DescriptionIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Avg. Planned DCGR%
              </Typography>
            </div>
          </div>

          {/* AveragethreePLActualDCGRPercentage */}
          <div className="card2" style={{ background: "#faf1f2" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "600",
                  margin: 0,
                  color: "#5c62a0",
                }}
                color="text.secondary"
              >
                {safePercentage(data.AveragethreePLActualDCGRPercentage)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <DonutLargeIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Avg. Actual DCGR%
              </Typography>
            </div>
          </div>

          {/* SumOfPlanned3PLInvoiceValue */}
          <div className="card2" style={{ background: "#f0f3f3" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "600",
                  margin: 0,
                  color: "#698590",
                }}
                color="text.secondary"
              >
                {safeToFixed(data.SumOfPlanned3PLInvoiceValue)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <LocalShippingIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Planned 3PL Inv.(IRS)
              </Typography>
            </div>
          </div>

          {/* SumOfthreePLInvoiceValue */}
          <div className="card2" style={{ background: "#f1eff7" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "600",
                  margin: 0,
                  color: "#5c62a0",
                }}
                color="text.secondary"
              >
                {safeToFixed(data.SumOfthreePLInvoiceValue)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <DirectionsBusIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                Actual Inv. Value(IRS)
              </Typography>
            </div>
          </div>

          {/* SumOftslSavingIRS */}
          <div className="card2" style={{ background: "#f6f7e8" }}>
            <div className="card-numberData2">
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "600",
                  margin: 0,
                  color: "#698590",
                }}
                color="text.secondary"
              >
                {safeToFixed(data.SumOftslSavingIRS)}
              </Typography>
            </div>

            <div className="card-nameData2">
              <InventoryIcon sx={{ color: "grey", fontSize: "1.5rem" }} />

              <Typography sx={{ fontSize: 11 }} color="text.secondary">
                TSL Saving Est. (IRS)
              </Typography>
            </div>
          </div>
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default Cards2;
