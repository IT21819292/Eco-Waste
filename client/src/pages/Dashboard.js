import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsHeadset, BsTools } from 'react-icons/bs';
import { BiSolidTruck } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Dashboard = () => {

    const [vehicleCount, setVehicleCount] = useState([]);
    const [vehicleCountLoading, setVehicleCountLoading] = useState(true);

    const [requestsCount, setRequestsCount] = useState([]);
    const [requestsCountLoading, setRequestsCountLoading] = useState(true);

    const [maintenanceCount, setMaintenanceCount] = useState([]);
    const [maintenanceCountLoading, setMaintenanceCountLoading] = useState(true);


    const fetchVehicleCount = async () => {
        setVehicleCountLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/trucks/truck/count');
            setVehicleCount(response.data); // Assuming the data is in 'data' property
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setVehicleCountLoading(false);
    };

    useEffect(() => {
        fetchVehicleCount();
    }, []);

    const fetchRequestsCount = async () => {
        setRequestsCountLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/assigned/trucks/count');
            setRequestsCount(response.data); // Assuming the data is in 'data' property
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setRequestsCountLoading(false);
    };

    useEffect(() => {
        fetchRequestsCount();
    }, []);

    const fetchMaintenanceCount = async () => {
        setMaintenanceCountLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/maintenances/maintainence/count');
            setMaintenanceCount(response.data); // Assuming the data is in 'data' property
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setMaintenanceCountLoading(false);
    };

    useEffect(() => {
        fetchMaintenanceCount();
    }, []);


    return (
        <div>
            <div className="container">
                <div className="row m-5">
                    <div className="col-md-4">
                        <div className="bg-success d-flex flex-column justify-content-center" style={{ height: '350px' }}>
                            <div className="card-body text-light text-center d-flex flex-column justify-content-around">
                                <div className='d-flex justify-content-around'>
                                    <h5 className="h1 text-light">{vehicleCount}</h5>
                                    <h5 className="h1 text-light"><BsHeadset size={100} /></h5>
                                </div>
                                <p className="h4">VEHICLE REQUESTS</p>
                            </div>
                        </div>
                        <div className="p-4 text-center bg-success d-flex align-items-center justify-content-center text-light">
                            <span>More Info</span>
                            <AiOutlinePlusCircle size={20} />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-primary d-flex flex-column justify-content-center" style={{ height: '350px' }}>
                            <div className="card-body text-light text-center d-flex flex-column justify-content-around">
                                <div className='d-flex justify-content-around'>
                                    <h5 className="h1 text-light">{requestsCount}</h5>
                                    <h5 className="h1 text-light"><BiSolidTruck size={100} /></h5>
                                </div>
                                <p className="h4">REQUESTS COUNT</p>
                            </div>
                        </div>
                        <div className="p-4 text-center bg-primary d-flex align-items-center justify-content-center text-light">
                            <span>More Info</span>
                            <AiOutlinePlusCircle size={20} />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-warning d-flex flex-column justify-content-center" style={{ height: '350px' }}>
                            <div className="card-body text-light text-center d-flex flex-column justify-content-around">
                                <div className='d-flex justify-content-around'>
                                    <h5 className="h1 text-light">{maintenanceCount}</h5>
                                    <h5 className="h1 text-light"><BsTools size={100} /></h5>
                                </div>
                                <p className="h4">MAINTENANCE COUNT</p>
                            </div>
                        </div>
                        <div className="p-4 text-center bg-warning d-flex align-items-center justify-content-center text-light">
                            <span>More Info</span>
                            <AiOutlinePlusCircle size={20} />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dashboard
