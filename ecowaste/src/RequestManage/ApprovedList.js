import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RequestApi from '../Api/RequestApi';
import backgroundImage from '../images/bg8.jpg';

function ApprovedList() {
  const [requests, setRequests] = useState([]); // Rename to requests for clarity
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = () => {
    RequestApi.getAllRequestApi()
      .then(data => {
        // Filter for approved requests
        console.log("All requests:", data.existingRequests);
        const approvedRequests = data.existingRequests.filter(request => request.isApprove === true);
        console.log("Approved requests:", approvedRequests);

        setRequests(approvedRequests);
        
      })
      .catch(error => {
        console.error("Error fetching requests:", error);
      });
  };

  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" style={{ width: '90vw', alignSelf: 'center', marginTop: '5vw', marginBottom: '5vw', padding: '5vw' }}>
        <h2 className="mb-3">Approved Location Requests Dashboard</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone</th>
              <th>Address</th>
              {/* Add other headings if necessary */}
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                {/* Render other attributes if necessary */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ApprovedList;
