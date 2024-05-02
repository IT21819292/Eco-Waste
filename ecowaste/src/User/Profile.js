import React, { useState, useEffect } from 'react';
import { storage } from '../DB/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserApi from '../Api/UserApi';
import backgroundImage from '../images/bg6.jpg';


const Profile = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProfile();
  }, [userId,refresh]);


  const fetchProfile = async () => {
    try {
        const response = await UserApi.fetchUserID(userId);
        console.log(response);
        let data = response.data;
        console.log(data);
        setUsername(data.userName);
        setFullName(data.fullName);
        setEmail(data.email);
        setAddress(data.address);
        setPassword(data.password);
        setIsAdmin(data.isAdmin);
        setImage(data.image);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    const imageRef = ref(storage, `profileImages/${userId}/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = image;
    if (imageFile) {
      imageUrl = await uploadImage();
    }
    try {
      const userData={
        username,
        fullName,
        email,
        password,
        isAdmin,
        address,
        image: imageUrl
      };
      await UserApi.updateUser(userId,userData);
      Swal.fire('Success', 'User updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error', 'Error updating user: ' + error.message, 'error');
    }
  };

  const handleDeleteAccount = async () => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        UserApi.deleteUser(userId)
          .then(() => {
            localStorage.clear();
            window.location.href = '/signin';
            Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Error deleting account:', error);
            Swal.fire('Error', 'Error deleting account: ' + error.message, 'error');
          });
      }
    });
  };
  

  const handleSignOut = async () => {
    await Swal.fire({
      title: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign out',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = '/signin';
      }
    });
  };
  


  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
    <div className="profile-container" 
      style={{
        width:'40rem', 
        marginTop:'2rem',
        backgroundColor:'white',
        borderRadius:'10px',
        padding:'5vw'}}>
        <center>
            <h3 style={{marginBottom:'2rem'}}>User Profile</h3>
        </center>
        <div className="profile-pic-section text-center mb-3">
          <label htmlFor="imageUpload">
            <img
              src={image || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="img-thumbnail rounded-circle"
              style={{ width: '150px', height: '150px', cursor: 'pointer' }}
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            className="form-control"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <div className="profile-details-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <Button type="submit" className="btn btn-primary"  style={{backgroundColor:'green'}}>Update</Button>
              <Button onClick={handleDeleteAccount} className="btn btn-danger" style={{backgroundColor:'red'}}>Delete Account</Button>
              <Button onClick={handleSignOut} className="btn btn-secondary"  style={{backgroundColor:'gray'}}>Sign out</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
