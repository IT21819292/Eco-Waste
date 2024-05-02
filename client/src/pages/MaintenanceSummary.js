import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import MaintenanceRow from '../components/MaintenanceRow';
import { DownloadTableExcel } from 'react-export-table-to-excel';
//import {useReactToPrint} from 'react-to-print'

const MaintenanceSummary = () => {

  const [feeData, setFeeData] = useState([])
  const [feeLoading, setFeeLoading] = useState(true);
  const tableRef = useRef(null);
  const fetchFeeData = async () => {
    setFeeLoading(true);
    try {
      const { data: response } = await axios.get('http://localhost:8080/api/add-maitenance-fee');
      setFeeData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setFeeLoading(false);
  }

  useEffect(() => {
    fetchFeeData();
  }, []);

  //const handlePrint = useReactToPrint({
    //content: () => tableRef.current,
  //})

  return (
    <div className='text-center'>
        <table class="table" ref={tableRef}>
          <thead>
            <tr>
              <th scope="col">Vehicle</th>
              <th scope="col">Item</th>
              <th scope="col">Units</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((fee) => (
              <MaintenanceRow fee={fee} />
            ))}

          </tbody>
        </table>
        <DownloadTableExcel
          filename='Maintenance'
          sheet="maintenance"
          currentTableRef={tableRef.current}
        >
          <button className="btn btn-sucess" type="button">Export Report</button>

        </DownloadTableExcel>

      </div>
    
  )
}

export default MaintenanceSummary
