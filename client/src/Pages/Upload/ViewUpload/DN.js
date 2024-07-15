
// import React, { useState } from "react";
// import {
//     Table,
//     TableContainer,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Paper,
//     TextField,

// } from "@mui/material";


// const DN = () => {

//     const [searchQuery, setSearchQuery] = useState('');
//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//     };


//     return (
//         <div
//             style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}
//         >
//             <div style={{ height: "80vh", width: "95vw" }}>
//                 <TextField id="standard-basic" label="Search" variant="standard" onChange={handleSearch} value={searchQuery} />
//                 <br />


//                 <>
//                     <br></br>
//                     <TableContainer
//                         component={Paper}
//                         style={{ border: "1px solid black" }}
//                     >
//                         <Table
//                             sx={{ minWidth: 450, height: "40px" }}
//                             aria-label="simple table"
//                         >
//                             <TableHead>
//                                 <TableRow style={{ backgroundColor: "#045e84" }}>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         DELIVERY PLANT

//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         Sum of INVOICE VALUE

//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         Planned DCGR Value %

//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         3PL Inv Value%

//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         Planned DCGR Value (IRS)

//                                     </TableCell>
//                                     <TableCell sx={{ textAlign: "center", color: "white" }}>
//                                         3Pl Inv Value

//                                     </TableCell>

//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>

//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                 </>



//             </div>
//         </div>
//     );
// };

// export default DN;


import React, { useState } from "react";
import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
} from "@mui/material";

const DN = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Actual data
    const data = [
        { deliveryPlant: "HMC", invoiceValue: 8943030, plannedDCGRValue: "6.7%", threePLInvValue: "0.50%", plannedDCGRValueIRS: 599183, threePlInvValue: 44283 },
        { deliveryPlant: "JAMADOBA", invoiceValue: 2864592, plannedDCGRValue: "3.9%", threePLInvValue: "0.80%", plannedDCGRValueIRS: null, threePlInvValue: 22832 },
        { deliveryPlant: "JODA", invoiceValue: 33554566, plannedDCGRValue: "4.2%", threePLInvValue: "0.78%", plannedDCGRValueIRS: null, threePlInvValue: 263155 },
        { deliveryPlant: "KHONDBOND", invoiceValue: 21149351, plannedDCGRValue: "4.2%", threePLInvValue: "0.28%", plannedDCGRValueIRS: null, threePlInvValue: 58363 },
        { deliveryPlant: "NINL", invoiceValue: 7880940, plannedDCGRValue: "6.0%", threePLInvValue: "1.05%", plannedDCGRValueIRS: null, threePlInvValue: 83100 },
        { deliveryPlant: "NOAMUNDI", invoiceValue: 21486673, plannedDCGRValue: "4.2%", threePLInvValue: "0.42%", plannedDCGRValueIRS: null, threePlInvValue: 89746 },
        { deliveryPlant: "TSJ", invoiceValue: 334367490, plannedDCGRValue: "4.0%", threePLInvValue: "0.35%", plannedDCGRValueIRS: null, threePlInvValue: 1186542 },
        { deliveryPlant: "TSK", invoiceValue: 121356670, plannedDCGRValue: "6.0%", threePLInvValue: "0.97%", plannedDCGRValueIRS: null, threePlInvValue: 1174035 },
        { deliveryPlant: "TSM", invoiceValue: 134244226, plannedDCGRValue: "6.8%", threePLInvValue: "0.42%", plannedDCGRValueIRS: null, threePlInvValue: 558642 },
        { deliveryPlant: "WB", invoiceValue: 9264248, plannedDCGRValue: "4%", threePLInvValue: "2.40%", plannedDCGRValueIRS: null, threePlInvValue: 222632 },
    ];

    // Filter data based on search query
    const filteredData = data.filter(item =>
        item.deliveryPlant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}>
           
            <div style={{ height: "80vh", width: "95vw" }}>
            <h1> DN Summary DATA</h1>
                <TextField id="standard-basic" label="Search" variant="standard" onChange={handleSearch} value={searchQuery} />
                <br />
                <br/>
                <TableContainer component={Paper} style={{ border: "1px solid black" }}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#045e84" }}>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>DELIVERY PLANT</TableCell>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>Sum of INVOICE VALUE</TableCell>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>Planned DCGR Value %</TableCell>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>3PL Inv Value%</TableCell>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>Planned DCGR Value (IRS)</TableCell>
                                <TableCell sx={{ textAlign: "center", color: "white" }}>3Pl Inv Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.deliveryPlant}</TableCell>
                                    <TableCell>{row.invoiceValue}</TableCell>
                                    <TableCell>{row.plannedDCGRValue}</TableCell>
                                    <TableCell>{row.threePLInvValue}</TableCell>
                                    <TableCell>{row.plannedDCGRValueIRS || '-'}</TableCell>
                                    <TableCell>{row.threePlInvValue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default DN;
