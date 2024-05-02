import React from 'react';
import Card from './Card';
import '../index.css';

const gridContainer = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    padding: '10px'
  };
  

function SearchList({ filteredTrucks, fetchTruckData }) {
  const filtered = filteredTrucks.map(truck =>  <Card key={truck.id} truck={truck} fetchTruckData={fetchTruckData}/>); 
  
  return (
    <div style={gridContainer}>
      {filtered}
    </div>
  );
}

export default SearchList;