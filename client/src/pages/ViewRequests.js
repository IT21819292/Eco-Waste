import React, { useEffect, useState } from 'react'
import AssignRequest from '../components/AssignRequest'
import axios from 'axios'

const ViewRequests = () => {

  const [assignedData, setAssignedData] = useState([])
  const [assignedLoading, setAssignedLoading] = useState(true);

  const fetchAssignedData = async () => {
    setAssignedLoading(true);
    try {
      const { data: response } = await axios.get('http://localhost:8080/api/assign-truck/fetch');
      setAssignedData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setAssignedLoading(false);
  }

  useEffect(() => {
    fetchAssignedData();
  }, []);

  return (
    <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">ReqID</th>
      <th scope="col">Date</th>
      <th scope="col">Expected Weight</th>
      <th scope="col">Address</th>
      <th scope="col">Customer</th>
      <th scope="col">Contact</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
      assignedData.map((data)=>(
        <AssignRequest data={data}/>
      ))
    }
    
  </tbody>
</table>
    </div>
  )
}

export default ViewRequests
