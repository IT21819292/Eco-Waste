import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useState } from "react";

const API_BASE = "http://localhost:8080";

const Maintenance = () => {
  const { id } = useParams();
  const [validationErrors, setValidationErrors] = useState({});
  const [newMaintenance, setNewMaintenance] = useState({
    itemName: '',
    vehicleId: '',
    noOfUnits: '',
    priceOfAUnit: '',
  });

  const handleChange = ({ target }) => {
    setNewMaintenance({ ...newMaintenance, [target.name]: target.value });
    setValidationErrors({ ...validationErrors, [target.name]: '' });
  }

  const validateForm = () => {
    const errors = {};

    if (!newMaintenance.itemName.trim()) {
      errors.itemName = 'Item Name is required';
    }

    if (!newMaintenance.vehicleId.trim()) {
      errors.vehicleId = 'Vehicle Id is required';
    }


    if (!newMaintenance.noOfUnits.trim()) {
      errors.noOfUnits = 'No of Units is required';
    } else if (isNaN(newMaintenance.noOfUnits.trim())) {
      errors.noOfUnits = 'No of Units must be a number';
    }

    if (!newMaintenance.priceOfAUnit.trim()) {
      errors.priceOfAUnit = 'Price of a Unit is required';
    } else if (isNaN(newMaintenance.priceOfAUnit.trim())) {
      errors.priceOfAUnit = 'Price of a Unit must be a number';
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
      itemName: newMaintenance.itemName,
      vehicleId: newMaintenance.vehicleId,
      noOfUnits: newMaintenance.noOfUnits,
      priceOfAUnit: newMaintenance.priceOfAUnit,
    };

    Swal.fire({
      title: 'Are you sure you want to add this Maintenance Fee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Maintenance Fee Added!', 'success');

        try {
          const response = await axios.post('http://localhost:8080/api/add-maitenance-fee', data);
          console.log('Response Data:', response.data);
        } catch (err) {
          console.error('Axios Error:', err);

          // Handle the error, e.g., display an error message to the user
          Swal.fire('Error', 'Failed to add maintenance fee', 'error');
        }
      }
    });
  }

  return (
    <section className="m-5">
      <div className="container-fluid h-custom h-100 p-4" style={{ backgroundColor: '#EAF3E7' }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <h1 className='text-success fw-bold text-center'>ADD NEW MAINTENANCE</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                {/* First Column */}
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      class={`form-control ${validationErrors.itemName ? 'is-invalid' : ''}`}
                      placeholder="Item Name"
                      name="itemName"
                      value={newMaintenance.itemName}
                      onChange={handleChange}
                      id="itemName"
                    />
                    {validationErrors.itemName && (
                      <div className="invalid-feedback">{validationErrors.itemName}</div>
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      class={`form-control ${validationErrors.vehicleId ? 'is-invalid' : ''}`}
                      name="vehicleId"
                      placeholder="Vehicle Id"
                      value={newMaintenance.vehicleId}
                      onChange={handleChange}
                      id="vehicleId"
                    />
                    {validationErrors.vehicleId && (
                      <div className="invalid-feedback">{validationErrors.vehicleId}</div>
                    )}
                  </div>
                </div>

                {/* Second Column */}
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      class={`form-control ${validationErrors.noOfUnits ? 'is-invalid' : ''}`}
                      name="noOfUnits"
                      placeholder="No of units"
                      value={newMaintenance.noOfUnits}
                      onChange={handleChange}
                      id="noOfUnits"
                    />
                    {validationErrors.noOfUnits && (
                      <div className="invalid-feedback">{validationErrors.noOfUnits}</div>
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      class={`form-control ${validationErrors.priceOfAUnit ? 'is-invalid' : ''}`}
                      name="priceOfAUnit"
                      placeholder="Price of a unit"
                      value={newMaintenance.priceOfAUnit}
                      onChange={handleChange}
                      id="priceOfAUnit"
                    />
                    {validationErrors.priceOfAUnit && (
                      <div className="invalid-feedback">{validationErrors.priceOfAUnit}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2 d-flex justify-content-center">
                <input className="btn btn-success btn-lg px-5" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Maintenance;
