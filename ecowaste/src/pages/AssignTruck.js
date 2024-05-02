import React, { useEffect, useState } from 'react';
import SearchList from '../components/SearchList';
import Scroll from '../components/Scroll';
import axios from 'axios';

const AssignTruck = () => {
  const [truckData, setTruckData] = useState([]);
  const [truckLoading, setTruckLoading] = useState(true);
  const [searchField, setSearchField] = useState('');

  const fetchTruckData = async () => {
    setTruckLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/trucks');
      setTruckData(response.data); // Assuming the data is in 'data' property
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setTruckLoading(false);
  };

  useEffect(() => {
    fetchTruckData();
  }, []);

  const filteredTrucks = truckData.filter((truck) => {
    return (
      truck.vehicleNumber?.toLowerCase().includes(searchField.toLowerCase()) ||
      truck.curbWeight?.toLowerCase().includes(searchField.toLowerCase()) ||
      truck.chasisNumber?.toLowerCase().includes(searchField.toLowerCase()) ||
      truck.manufacturer?.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <section style={{ paddingTop: '80px' }}>
      <div className="d-flex justify-content-center align-items-center ">
        <h2 className="">Search Truck</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <input
          className="form-control w-25"
          type="search"
          placeholder="Search Truck"
          value={searchField}
          onChange={handleChange}
        />
      </div>
      <Scroll>
        <SearchList filteredTrucks={filteredTrucks} fetchTruckData={fetchTruckData}/>
      </Scroll>
      <div className='d-flex justify-content-end'>
        {/* Additional content */}
      </div>
    </section>
  );
};

export default AssignTruck;
