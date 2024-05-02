import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import RequestApi from '../Api/RequestApi';
import Swal from 'sweetalert2';
import { storage } from '../DB/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MapComponent from './MapComponent';
import backgroundImage from '../images/bg4.jpg';

const Request = () => {
  const [request, setRequest] = useState({
    name: '',
    phone: '',
    email: '',
    pickUpDate: '',
    address: '',
    isApprove: false,
    message: '',
    paymentSlip: null
  });
  const [uploading, setUploading] = useState(false);
  console.log(request);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value
    });
  };

  const handleLocationSelected = (address) => {
    setRequest(prevRequest => ({
      ...prevRequest,
      address: address,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `images/${file.name}`);
    setUploading(true);

    try {
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress updates or other handling can be added here
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setRequest(prevRequest => ({ ...prevRequest, paymentSlip: downloadURL }));
            setUploading(false);
          });
        }
      );
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RequestApi.addRequestApi(request).then((res) => {
      if (res.success === true) {
        window.location.href = '/payment';
        Swal.fire('Congratulations!', 'Request Send successfully', 'success');
        setRequest({
          name: '',
          phone: '',
          email: '',
          pickUpDate: '',
          address: '',
          message: '',
          paymentSlip: null
        });
      }
      else{
        Swal.fire('Oops...', res.message, 'error');
      }
    }).catch((err) => {
      console.log(err);
      Swal.fire('Oops...', 'Failed to submit request. Please try again.', 'error');
    });
  };
  

  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" 
    style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover',
      padding: '2vw',
      paddingTop: '4vw',
       }}>
      <Row>
        <Col md={6}>
        <br/>
        <br/>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Make Your Request</h2>
            <br/>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="name"
                    value={request.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control 
                    type="tel"
                    name="phone"
                    value={request.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    value={request.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formBasicPickUpDate">
                  <Form.Label>Pick up date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="pickUpDate"
                    value={request.pickUpDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>


            <Form.Group controlId="formBasicMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control 
                as="textarea"
                name="message"
                value={request.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br/>

            <Form.Group controlId="formBasicPaymentSlip">
              <Form.Label>Upload payment slip</Form.Label>
              <Form.Control 
                type="file"
                onChange={handleImageUpload}
              />
              {uploading && <p>Uploading Image...</p>}
              {request.paymentSlip && <p>Image Uploaded Successfully!</p>}
            </Form.Group>
            <br />

            <Button variant="outline-success" type="submit" className="w-100">
              Submit Request
            </Button>
          </Form>
        </Col>
        <Col md={4} style={{marginLeft:'10vw'}}>
        <MapComponent onLocationSelected={handleLocationSelected} />
        </Col>
      </Row>
    </div>
  );
};

export default Request;
