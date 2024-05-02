import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserApi from '../Api/UserApi';
import backgroundImage from '../images/bg.jpg';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleResetPassword = async () => {
    try {
      const res = await UserApi.forgotPassword(email);
      if (res.status === 'ok') {
        setShow(true);
        Swal.fire({
          icon: 'success',
          title: res.message || 'Password reset email sent successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        throw new Error('Invalid email');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to reset password',
        text: 'An error occurred while sending the password reset email',
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const res = await UserApi.resetPassword(email, otp, newPassword);
      if (res.status === 'ok') {
        setShow(false);
        Swal.fire({
          icon: 'success',
          title: 'Password updated successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.href = '/signin';
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update password',
        text: error.message,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:'100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" style={{ width: '40vw', height:'40vh', backdropFilter: 'blur(10px)' }}>
        <Col md={7} className="mx-auto" style={{marginTop:'2.5vw'}}>
          <h2 className="text-center mb-4">Reset Password</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </Form>
        </Col>
      </div>
      
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <br/>
          <Form>
            <Form.Group controlId="formBasicOTP">
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <br/>

            <Form.Group controlId="formBasicNewPassword">
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <br/>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <br/>

            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResetPassword;
