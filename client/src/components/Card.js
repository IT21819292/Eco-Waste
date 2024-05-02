import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';



function Card({ truck, fetchTruckData }) {

  const navigate = useNavigate();

  const navigateToAssignPage = (truck) => {
    navigate(`/assign-truck/${truck._id}`);
  }

  const navigateToEditTruck = (truck) => {
    navigate(`/edit-truck/${truck._id}`);
  }
  

  const deleteTruck = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this truck?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Truck Deleted!', 'success');

        axios.delete(`http://localhost:8080/api/delete/${id}`)
          .then((response) => {
            // Handle success, e.g., show a success message
            console.log(`Truck with ID ${id} has been deleted.`);
            fetchTruckData();
          })
          .catch((error) => {
            // Handle error, e.g., show an error message
            console.error(`Error deleting truck with ID ${id}: ${error.message}`);
          });
      }
    });

  };


  return (

    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 grid-item" style={{ backgroundColor: '#EAF3E7', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <img className="br-100 h2 w2 dib" src={truck.image} style={{ height: '200px', width: '250px', marginBottom: '10px' }} />
      <div style={{ textAlign: 'center' }}>
        <h2>{truck.vehicleNumber}</h2>
        <p>{truck.chasisNumber}</p>
        <p>{truck.manufacturer}</p>
        <p>{truck.fuelType}</p>
        <p>{truck.power}</p>
        <p>{truck.noOfStaff}</p>
      </div>
      
      <button className='btn btn-success btn-lg px-5' onClick={() => navigateToAssignPage(truck)}>SELECT TRUCK</button>
      <button className='btn btn-danger btn-lg px-5' onClick={() => deleteTruck(truck._id)}>DELETE TRUCK</button>
      <button className='btn btn-warning btn-lg px-5' onClick={() => navigateToEditTruck(truck)}>UPDATE TRUCK</button>
    </div>


  );
}

export default Card;