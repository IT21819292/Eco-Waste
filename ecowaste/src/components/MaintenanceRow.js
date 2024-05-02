import axios from 'axios';
import React, { useState } from 'react'

const MaintenanceRow = ({ fee }) => {

    const [accepted, setAccepted] = useState(false); // Step 1: Create a state variable

    const handleAcceptClick = () => {
        setAccepted(!accepted); // Step 2: Toggle the state on button click
        sendDataToBackend()
    };

    const sendDataToBackend = () => {

        axios.put(`http://localhost:8080/api/maintenance/update/${fee._id}`)
            .then((response) => {
                console.log('PUT request successful:', response.data);

            })
            .catch((error) => {
                console.error('PUT request error:', error);

            });

    };

    return (
        <tr>
            <th scope="row">{fee.vehicleId}</th>
            <td>{fee.itemName}</td>
            <td>{fee.noOfUnits}</td>
            <td>{fee.priceOfAUnit}</td>
            <td>{fee.priceOfAUnit * fee.noOfUnits}</td>
            <td>
                <input
                    type='button'
                    className={`btn ${accepted ? 'btn-success' : 'btn-secondary'}`} // Use the state to set button style
                    value={accepted ? 'Accepted' : 'Accept'}
                    onClick={handleAcceptClick} // Toggle the state on button click
                    style={{ width:'100px' }}
                />
            </td>
        </tr>
    )
}

export default MaintenanceRow
