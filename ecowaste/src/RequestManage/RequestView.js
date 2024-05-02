import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleCheck, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import RequestApi from '../Api/RequestApi';

const RequestView= () => {
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);


  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = () => {
    RequestApi.getAllRequestApi()
      .then(data => {
        // Filter for approved requests
        const approvedRequests = data.existingRequests.filter(request => request.isApprove === true);
        const pendingRequests = data.existingRequests.filter(request => request.isApprove === false);

        setApprovedCount(approvedRequests.length);
        setPendingCount(pendingRequests.length);
        
      })
      .catch(error => {
        console.error("Error fetching requests:", error);
      });
  };

  return (
    <div className="">
      <h2 style={{marginLeft:'15vw', margin:'3vw'}} className="mb-3">Request Dashboard</h2>
       <button onClick={()=> window.location.href="/request"} className="btn btn-success w-10 addBtn"> New Request</button>
       <br/>
       <br/>
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{width:'100vw', borderRadius:'1vw',alignSelf:'center'}}>
        <a href='/approvedlist' style={{textDecoration:'none'}}>
          <div className='reqBtn' style={{backgroundColor:'#3F9A48'}} >
              <h1>Approved Requests</h1>
              <h2><FontAwesomeIcon icon={faPersonCircleCheck} /></h2>
              <h3>{approvedCount}</h3>
          </div>
          </a>
          <a href='/pendinglist' style={{textDecoration:'none'}}>
          <div className='reqBtn' style={{backgroundColor:'#2F56BB'}}>
              <h1>Pending Requests</h1>
              <h2><FontAwesomeIcon icon={faHourglassHalf} /></h2>
              <h3>{pendingCount}</h3>
            </div>
            </a>
      </div>
    </div>
  )
}

export default RequestView;