import React, { useEffect } from 'react'
import axios from 'axios';
import FormData from 'form-data';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

import { useState, } from "react";

const API_BASE = "http://localhost:5000";

const AssignTruck = () => {

    const { id } = useParams();

    const [truckData, setTruckData] = useState()
    const [truckLoading, setTruckLoading] = useState(true);
    const [searchField, setSearchField] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const fetchTruckData = async () => {
        setTruckLoading(true);
        try {
            const { data: response } = await axios.get(`http://localhost:5000/api/trucks/${id}`);
            setTruckData(response);

            // Set newTruck.vehicleNumber to truckData.vehicleNumber
            setNewTruck((prevNewTruck) => ({
                ...prevNewTruck,
                vehicleNumber: response.vehicleNumber,
            }));

            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
        setTruckLoading(false);
    };

    useEffect(() => {
        fetchTruckData();
    }, []);


    const [newTruck, setNewTruck] = useState(
        {
            vehicleNumber: '',
            vehicleType: '',
            date: '',
            weight: '',
            address: '',
            number: ''
        }
    );

    const handleChange = ({ target }) => {
        setNewTruck({ ...newTruck, [target.name]: target.value });
        setValidationErrors({ ...validationErrors, [target.name]: '' });
    }

    const validateForm = () => {
        const errors = {};

        if (!newTruck.vehicleNumber.trim()) {
            errors.vehicleNumber = 'Vehicle Number is required';
        }

        if (!newTruck.date.trim()) {
            errors.date = 'Date is required';
        }

        
        if (!newTruck.address.trim()) {
            errors.address = 'Address is required';
        }

        if (!newTruck.number.trim()) {
            errors.number = 'Phone number is required';
        } else if (isNaN(newTruck.number.trim())) {
            errors.number = 'Phone number must contain digits';
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };



    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (!validateForm()) {
            return;
          }

        const data = {
            userId: 'user1',
            vehicleNumber: newTruck.vehicleNumber,
            vehicleType: newTruck.vehicleType,
            date: newTruck.date,
            weight: newTruck.weight,
            address: newTruck.address,
            number: newTruck.number,
        };

        Swal.fire({
            title: 'Are you sure you want to assign this truck?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Truck Assigned!', 'success');

                try {
                    const response = await axios.post('http://localhost:5000/api/assign-truck', data 
        
                    );
                    console.log('Response Data:', response.data);
                } catch (err) {
                    console.error('Axios Error:', err);

                    // Handle the error, e.g., display an error message to the user
                    Swal.fire('Error', 'Failed to assign the truck', 'error');
                }
            }
        });
    }


    return (
        <section class="m-5">
            <div class="container-fluid h-custom h-100" style={{ backgroundColor: '#EAF3E7' }}>
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-10 col-lg-8 col-xl-6">
                        <h1 className='text-success fw-bold text-center'>ASSIGN TRUCK</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="form-group mb-4">
                                        <label for="vehicleNumber">Vehicle Number</label>
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.vehicleNumber ? 'is-invalid' : ''}`}
                                            placeholder="Enter Vehicle Number"
                                            name="vehicleNumber"
                                            value={newTruck.vehicleNumber}
                                            onChange={handleChange}
                                            id="vehicleNumber"
                                            disabled
                                        />
                                        {validationErrors.vehicleNumber && (
                                            <div className="invalid-feedback">{validationErrors.vehicleNumber}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="date">Date</label>
                                        <input
                                            type="date"
                                            class={`form-control ${validationErrors.date ? 'is-invalid' : ''}`}
                                            name="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            max={new Date(Date.now() + 12096e5).toISOString().split('T')[0].toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})}
                                            value={newTruck.date}
                                            onChange={handleChange}
                                            id="date"
                                        />
                                        {validationErrors.date && (
                                            <div className="invalid-feedback">{validationErrors.date}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="date">Expected Weight (KG)</label>
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.weight ? 'is-invalid' : ''}`}
                                            name="weight"
                                            value={newTruck.weight}
                                            onChange={handleChange}
                                            id="weight"
                                        />
                                        {validationErrors.weight && (
                                            <div className="invalid-feedback">{validationErrors.weight}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="address">Address</label>
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                                            name="address"
                                            value={newTruck.address}
                                            onChange={handleChange}
                                            id="address"
                                        />
                                        {validationErrors.address && (
                                            <div className="invalid-feedback">{validationErrors.address}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <label for="number">Phone Number</label>
                                        <input
                                            type="number"
                                            class={`form-control ${validationErrors.number ? 'is-invalid' : ''}`}
                                            name="number"
                                            value={newTruck.number = newTruck.number.slice(0,10)}
                                            onChange={handleChange}
                                            id="number"
                                        />
                                        {validationErrors.number && (
                                            <div className="invalid-feedback">{validationErrors.number}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2 d-flex justify-content-center">
                                <input className="btn btn-success btn-lg px-5" type="submit" value="ADD+" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default AssignTruck
