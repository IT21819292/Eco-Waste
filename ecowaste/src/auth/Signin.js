import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../images/TransLogo.png';
import backgroundImage from '../images/bg.jpg';
import UserApi from '../Api/UserApi';
import Swal from 'sweetalert2';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await UserApi.signIn(email, password);
        console.log(response);
        if(response.success === false) {
          Swal.fire('Oops...', response.error, 'error');
        } else {
        window.localStorage.setItem('token', response.data);
        window.localStorage.setItem("loggedIn", true);
        Swal.fire('Congratulations!', 'User Signin successfully', 'success');
        window.location.href = '/';
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Oops...', 'Failed to signin. Please try again.', 'error');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" style={{ width: '400px', backdropFilter: 'blur(10px)' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="img-fluid mb-3" style={{ maxHeight: '100px' }} />
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaUser /></span>
              </div>
              <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} value={email} />
            </div>
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaLock /></span>
              </div>
              <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} value={password} />
            </div>
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-outline-success btn-block">Login</button>
          <Link to="/signup" className="btn btn-outline-info btn-block mt-2">Register</Link>
          <Link to="/forgetpassword" className="d-block mt-3 text-center">FORGET PASSWORD?</Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
