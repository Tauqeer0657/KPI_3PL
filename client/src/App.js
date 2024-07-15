import './App.css';
import { Routes, Route } from "react-router-dom";

import Login from './auth/Login/Login';
import DN from './Pages/Upload/ViewUpload/DN'
import Upload from './Pages/Upload/Upload';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import History from './Pages/History/History';
import PlannedDcgr from './Pages/PlannedDcgr/PlannedDcgr';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/PlannedDcgr" element={<PlannedDcgr/>}></Route>
        <Route path="/history" element={<History/>}></Route>
        <Route path="/upload" element={<Upload />} />
        <Route path="/dn" element={<DN/>}></Route>

       
      </Routes>

    </>
  );
}

export default App;
































// import './App.css';
// import { Routes, Route } from "react-router-dom";

// import Login from './auth/Login/Login';
// import DN from './Pages/Upload/ViewUpload/DN'
// import Upload from './Pages/Upload/Upload';
// import { Dashboard } from './Pages/Dashboard/Dashboard';
// import Header2 from './component/Header2';

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard/>}></Route>

//         {/* Nested Routes */}
//       <Route
//         path="/data"
//         element={
//           <>
//             <Header2 />
//             <Routes>
//               {/* Upload Route */}
//               <Route path="/upload" element={<Upload />} />
//               {/* DN Route */}
//               <Route path="/dn" element={<DN />} />
//             </Routes>
//           </>
//         }
//       />
        
       
//       </Routes>

//     </>
//   );
// }

// export default App;
