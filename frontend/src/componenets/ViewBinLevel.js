import React from 'react';
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from "axios";


const ViewBinLevel = ({ binLevels }) => { // Receive binLevel as a prop

  

  return (
    
        //class create form
        
        <div>
          <div class="card bg-dark text-white" >
           <img src="homebg.png" class="card-img" alt="..." style={{height: '375px',filter: 'brightness(40%)'}}/>
             <div class="card-img-overlay">
              <br></br>
              <br></br>
                <h1 class="card-title" style={{fontSize: '90px'}}><b>BIN-LEVEL</b> <b class="text-success">MONITOR</b></h1>
                <br></br>
                <br></br>
                <br></br>

                <div class="btn-group" role="group" aria-label="Basic example" style={{float: 'right'}}>
                <Link to='/randp'>
                <button type="button" class="btn1 btn-success btn-lg" style={{marginRight: '50px'}}>RESEARCH AND PRODUCTS</button>
                </Link>
                <Link to='/requests'>
                <button type="button" class="btn2 btn-success btn-lg" style={{marginRight: '50px'}}>REQUEST PICKUP</button>
                </Link>
                <button type="button" class="btn3 btn-success btn-lg" style={{marginRight: '50px'}}>PAYMENT</button>
                </div>

             </div>
          </div>

          <div style={{ marginLeft: '20%', marginRight: '20%', marginTop: '2em' }}>
            
          {Object.entries(binLevels).map(([bin, level], index) => (
        <div key={index} style={{ marginBottom: '2em' }}>
          <h2>{bin} - Bin Fill Level: {level}%</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <div className="progress" style={{ flex: '1', height: '2em' }}>
              <div
                className={`progress-bar ${level >= 80 ? 'bg-danger' : 'bg-success'}`}
                role="progressbar"
                style={{ width: `${level}%` }}
                aria-valuenow={level}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {level}%
              </div>
            </div>
            <button type="button" className="btn btn-warning">Alert</button>
            <button type="button" className={`btn ${level >= 80 ? 'btn-danger' : 'btn-success'}`}>Pickup</button>
          </div>
        </div>
      ))}
    </div>

          
          <br></br>
          <br></br>

        <div/>

      <div>

 



  

      </div>
      <br></br>
      <br></br>

      <div class="card bg-dark text-white" style={{height: '350px', width:'100%'}}>
           
             <div class="card-img-overlay">
              <br></br>
                <h3 class="card-title" style={{float: 'left'}}><b class="text-success">CONTACT</b></h3>
                <br></br>
                <i class="fa-brands fa-facebook fa-2xl" style={{float: 'right', marginRight: '20px'}}></i>
                <i class="fa-brands fa-instagram fa-2xl" style={{float: 'right', marginRight: '20px'}}></i>
                <i class="fa-brands fa-linkedin fa-2xl" style={{float: 'right', marginRight: '20px'}}></i>
                <br></br>
                <br></br>
                

                <div style={{float: 'left'}}>
                <h5 style={{textAlign: 'left'}}><i class="fa-solid fa-envelope"></i> &nbsp;&nbsp;&nbsp;ecowaste@gmail.com</h5>
                <br></br>
                <h5 style={{textAlign: 'left'}}><i class="fa-solid fa-phone-volume"></i> &nbsp;&nbsp;&nbsp;071 159 0580</h5>
                <br></br>
                <h5 style={{textAlign: 'left'}}><i class="fa-solid fa-location-dot"></i> &nbsp;&nbsp;&nbsp;168/7/4b,tranquil terrace,new kandy road,malabe</h5>
                
                </div>

                <div style={{float: 'right',width: '50%'}}>
                <h5 style={{textAlign: 'left'}}>HOME</h5>
                <br></br>
                <h5 style={{textAlign: 'left'}}>ABOUT US</h5>
                <br></br>
                <h5 style={{textAlign: 'left'}}>WORKING DAYS</h5>
                <br></br>
                <h5 style={{textAlign: 'left'}}>SERVICES</h5>

                
                </div>
                <br></br>
                <br></br>
                <br></br>
                
                <h style={{float: 'left', marginLeft:'80%'}}>privacy policy &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; terms & conditions</h>

                
               
                
                

             </div>
          </div>



      
      </div>
      
      
    )
    
}
export default ViewBinLevel;
