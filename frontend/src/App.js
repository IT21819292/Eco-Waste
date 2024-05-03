import React, { useState, useEffect } from 'react'; // Import useState and useEffect from react
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Header from "./componenets/Header";
import RouteDashboard from "./componenets/RouteDashboard";
import ViewRoute from "./componenets/ViewRoute";
import AddRegularRoute from "./componenets/AddRegularRoute";
import ViewBinLevel from "./componenets/ViewBinLevel";
import MockSensor from './componenets/MockSensor';
import AddSpecialRoute from './componenets/AddSpecialRoute';





function App() {

// State to store the bin fill level
const [binLevels, setBinLevels] = useState({
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0
});// Initialize with 5 bins

   // Function to update bin fill levels
   const updateBinLevels = () => {
    // Generate new bin levels for each bin
    const newBinLevels = Object.fromEntries(
      Object.entries(binLevels).map(([bin, level]) => [bin, Math.floor(Math.random() * 101)])
    );
    setBinLevels(newBinLevels);
  };

  // useEffect to set up interval for updating bin fill levels
  useEffect(() => {
    // Update bin fill levels every 5 seconds
    const interval = setInterval(updateBinLevels, 5000);
    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);


  return (
  <Router>
    <div>
    
      <Header></Header>
      
      <Routes>
      
      <Route path="/routedash" element={<RouteDashboard />}/>
      <Route path="/viewroute" element={<ViewRoute/>}/>
      <Route path="/addroute" element={<AddRegularRoute/>}/>
      {/* Pass binLevel state as prop to ViewBinLevel component */}
      <Route path="/viewbin" element={<ViewBinLevel binLevels={binLevels} />}/>
      <Route path="/add-special-route" element={<AddSpecialRoute/>} />
      
      </Routes>
   {/* Render the MockSensor component to simulate sensor data */}
   <MockSensor onDataUpdate={updateBinLevels} />
            
      
    </div>
    </Router>
  ); 
}

export default App;
 