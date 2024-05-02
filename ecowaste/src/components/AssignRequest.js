import axios from 'axios';
import React, { useState } from 'react';

const AssignRequest = ({ data }) => {
    const [accepted, setAccepted] = useState(data.status); // Initialize state with the value from data.status

    const handleAcceptClick = () => {
        setAccepted(!accepted); // Toggle the state on button click
        sendDataToBackend();
    };

    const sendDataToBackend = () => {
        axios
            .put(`http://localhost:8080/api/assign-truck/update/${data._id}`, { status: !accepted }) // Send the updated status
            .then((response) => {
                console.log('PUT request successful:', response.data);
            })
            .catch((error) => {
                console.error('PUT request error:', error);
            });
    };

    return (
        <tr>
            <th scope="row">{data._id}</th>
            <td>{data.date}</td>
            <td>{data.weight} KG</td>
            <td>{data.address}</td>
            <td>{data.userId}</td>
            <td>{data.number}</td>

            <td>
                <input
                    type="button"
                    className={`btn ${accepted ? 'btn-success' : 'btn-secondary'}`}
                    value={accepted ? 'Accepted' : 'Accept'}
                    onClick={handleAcceptClick}
                    style={{ width:'100px' }}
                />
            </td>
        </tr>
    );
};

export default AssignRequest;
