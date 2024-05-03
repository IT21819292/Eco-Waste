// MockSensor.js
import React, { useEffect } from 'react';

const MockSensor = ({ onDataUpdate }) => { // Receive onDataUpdate as a prop
  // Function to simulate bin fill level data generation
  const generateBinFillLevel = () => {
    // Generate random bin fill level (0-100)
    const newBinFillLevel = Math.floor(Math.random() * 101);
    console.log('New bin fill level:', newBinFillLevel); // Log the new data
    onDataUpdate(newBinFillLevel); // Call onDataUpdate with the new bin level
  };

  // Simulate data generation every 3 seconds
  useEffect(() => {
    console.log('MockSensor useEffect triggered');
    const interval = setInterval (() => {generateBinFillLevel();}, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
};

export default MockSensor;
