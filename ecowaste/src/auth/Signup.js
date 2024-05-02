import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserApi from '../Api/UserApi';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import backgroundImage from '../images/bg.jpg';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    email: '',
    address: '',
    isAdmin: false,
    image: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!inputs.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!inputs.userName.trim()) {
      newErrors.userName = 'User Name is required';
    }
    if (!inputs.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!inputs.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!inputs.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (inputs.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid. Submitting...');
      const userData = {
        fullName: inputs.fullName,
        userName: inputs.userName,
        email: inputs.email,
        address: inputs.address,
        isAdmin: inputs.isAdmin,
        image: inputs.image,
        password: inputs.password
      };
      try {
        const response = await UserApi.signupApi(userData);
        console.log('User registered:', response);
        Swal.fire('Congratulations!', 'User registered successfully', 'success');
        window.location.href = '/';
      } catch (error) {
        console.error('Failed to register:', error);
        Swal.fire('Oops...', 'Failed to register. Please try again.', 'error');
      }
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" style={{ width: '500px', backdropFilter: 'blur(10px)',padding:'20px' ,alignSelf:'center',marginTop:'5vw', marginBottom:'5vw'}}>
      <div className="mb-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" name="fullName" onChange={handleInputChange} value={inputs.fullName}/>
          {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="text" className="form-control" id="userName" name="userName" onChange={handleInputChange} value={inputs.userName}/>
          {errors.userName && <div className="text-danger">{errors.userName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} value={inputs.email}/>
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" onChange={handleInputChange} value={inputs.address}/>
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} value={inputs.password}/>
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Re-enter Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleInputChange} value={inputs.confirmPassword}/>
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <button style={{width:'28vw'}} type="submit" className="btn btn-success">Submit</button>
        </div>
        <Link to="/" className="btn btn-link">Back to Login</Link>
      </form>
      
        </div>
      </div>
    </div>
  );
}

export default Signup;
