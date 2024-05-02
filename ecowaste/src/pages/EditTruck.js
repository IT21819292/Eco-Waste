import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import FormData from 'form-data';

const API_BASE = 'http://localhost:8080';

const EditTruck = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [truckData, setTruckData] = useState({});
    const [newTruck, setNewTruck] = useState({
        vehicleNumber: '',
        chasisNumber: '',
        curbWeight: '', // Make sure curbWeight is initially an empty string
        manufacturer: '',
        fuelType: '',
        power: '',
        noOfStaff: '',
        image: '', // Image URL for preview
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [fileError, setFileError] = useState('');

    const fetchTruckData = async () => {
        try {
            const response = await axios.get(`${API_BASE}/api/trucks/${id}`);
            setTruckData(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchTruckData();
    }, [id]);

    useEffect(() => {
        // Populate newTruck state when truckData changes
        setNewTruck(truckData);
    }, [truckData]);

    const handleChange = ({ target }) => {
        // Convert the input value to a string to ensure it's always a string
        setNewTruck({ ...newTruck, [target.name]: target.value });
        // Clear validation error when the user makes changes
        setValidationErrors({ ...validationErrors, [target.name]: '' });
    };

    const handlePhoto = ({ target }) => {
        setFile(URL.createObjectURL(target.files[0]));
        setNewTruck({ ...newTruck, image: target.files[0] });
        setFileError('');
      };

    const validateForm = () => {
        const errors = {};

        if (!newTruck.vehicleNumber.trim()) {
            errors.vehicleNumber = 'Vehicle Number is required';
        }

        if (!newTruck.curbWeight.trim()) {
            errors.curbWeight = 'Curb Weight is required';
        } else if (isNaN(newTruck.curbWeight.trim())) {
            errors.curbWeight = 'Curb Weight must be a valid number';
        }

        if (!newTruck.chasisNumber.trim()) {
            errors.chasisNumber = 'Chasis Number is required';
        }

        if (!newTruck.manufacturer.trim()) {
            errors.manufacturer = 'Manufacturer is required';
        }

        if (!newTruck.fuelType.trim()) {
            errors.fuelType = 'Fuel Type is required';
        }

        if (!newTruck.power.trim()) {
            errors.power = 'Power is required';
        }

        if (!file) {
            setFileError('Image is required');
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0 && file;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('vehicleNumber', newTruck.vehicleNumber);
        formData.append('chasisNumber', newTruck.chasisNumber);
        formData.append('curbWeight', newTruck.curbWeight);
        formData.append('manufacturer', newTruck.manufacturer);
        formData.append('fuelType', newTruck.fuelType);
        formData.append('power', newTruck.power);
        formData.append('noOfStaff', newTruck.noOfStaff);
        formData.append('image', newTruck.image);
        console.log(formData);
        Swal.fire({
            title: 'Are you sure you want to update this truck?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Truck Updated!', 'success');

                try {
                    const response = await axios.post(
                        'http://localhost:8080/api/update-truck',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                    console.log(response.data);
                } catch (err) {
                    console.error(err);
                }
            }
        });
    };

    return (
        <section class="m-5">
            <div class="container-fluid h-custom h-100 p-4" style={{ backgroundColor: '#EAF3E7' }}>
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-10 col-lg-8 col-xl-6">
                        <h1 className='text-success fw-bold text-center'>EDIT TRUCK</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div class="mb-4 d-flex justify-content-center">
                                    <img
                                        src={file}
                                        style={{ width: '300px', height: '300px' }}
                                        alt="Truck Preview"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group mb-4">
                                        <input
                                            type="file"
                                            className={`form-control ${fileError ? 'is-invalid' : ''}`}
                                            name="image"
                                            onChange={handlePhoto}
                                            id="customFile1"
                                        />

                                      
                                        {fileError && <div className="invalid-feedback">{fileError}</div>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.vehicleNumber ? 'is-invalid' : ''}`}
                                            placeholder="Enter Vehicle Number"
                                            name="vehicleNumber"
                                            value={newTruck.vehicleNumber}
                                            onChange={handleChange}
                                            id="vehicleNumber"
                                        />
                                        {validationErrors.vehicleNumber && (
                                            <div className="invalid-feedback">{validationErrors.vehicleNumber}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.curbWeight ? 'is-invalid' : ''}`}
                                            placeholder="Enter Curb Weight"
                                            name="curbWeight"
                                            value={newTruck.curbWeight}
                                            onChange={handleChange}
                                            id="curbWeight"
                                        />
                                        {validationErrors.curbWeight && (
                                            <div className="invalid-feedback">{validationErrors.curbWeight}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.fuelType ? 'is-invalid' : ''}`}
                                            placeholder="Enter Fuel Type"
                                            name="fuelType"
                                            value={newTruck.fuelType}
                                            onChange={handleChange}
                                            id="fuelType"
                                        />
                                        {validationErrors.fuelType && (
                                            <div className="invalid-feedback">{validationErrors.fuelType}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.chasisNumber ? 'is-invalid' : ''}`}
                                            placeholder="Enter Chasis Number"
                                            name="chasisNumber"
                                            value={newTruck.chasisNumber}
                                            onChange={handleChange}
                                            id="chasisNumber"
                                        />
                                        {validationErrors.chasisNumber && (
                                            <div className="invalid-feedback">{validationErrors.chasisNumber}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.manufacturer ? 'is-invalid' : ''}`}
                                            placeholder="Enter Manufacturer"
                                            name="manufacturer"
                                            value={newTruck.manufacturer}
                                            onChange={handleChange}
                                            id="manufacturer"
                                        />
                                        {validationErrors.manufacturer && (
                                            <div className="invalid-feedback">{validationErrors.manufacturer}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-4">
                                        <input
                                            type="text"
                                            class={`form-control ${validationErrors.power ? 'is-invalid' : ''}`}
                                            placeholder="Enter Power"
                                            name="power"
                                            value={newTruck.power}
                                            onChange={handleChange}
                                            id="power"
                                        />
                                        {validationErrors.power && (
                                            <div className="invalid-feedback">{validationErrors.power}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    class={`form-control ${validationErrors.noOfStaff ? 'is-invalid' : ''}`}
                                    placeholder="Enter No of Staff"
                                    name="noOfStaff"
                                    value={newTruck.noOfStaff}
                                    onChange={handleChange}
                                    id="noOfStaff"
                                />
                                {validationErrors.noOfStaff && (
                                    <div className="invalid-feedback">{validationErrors.noOfStaff}</div>
                                )}
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2 d-flex justify-content-center">
                                <input className="btn btn-success btn-lg px-5" type="submit" value="UPDATE" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditTruck;
