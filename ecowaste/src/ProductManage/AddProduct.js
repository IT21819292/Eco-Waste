import React, { useState,useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { storage } from '../DB/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Import UUID function
import ProductApi from '../Api/ProductApi';
import backgroundImage from '../images/bg6.jpg';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const userName = localStorage.getItem('userName');
    const [product, setProduct] = useState({
        productId: uuidv4(),
        userName: userName,
        itemName: '',
        itemPrice: '',
        date: '',
        rType: '',
        rDetails: '',
        imageUrl: '',
      });
      const [uploading, setUploading] = useState(false);
      const date = new Date().toISOString().split('T')[0];
      useEffect(() => {
        setProduct({ ...product, date });
        }, []);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
    
      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
      
        const fileRef = ref(storage, `images/${file.name}`);  // Updated to use the ref function properly
        setUploading(true);
      
        try {
          const uploadTask = uploadBytesResumable(fileRef, file);  // Start the upload
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
            }, 
            (error) => {
              // Handle unsuccessful uploads
              console.error("Upload failed:", error);
              setUploading(false);
            }, 
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setProduct({ ...product, imageUrl: downloadURL });
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
        console.log('Submitting product:', product);
      
        try {
          const response = await ProductApi.AddProductApi(product);
          console.log('Product added:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Product Added Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          setProduct({
            productId: uuidv4(),
            userName: '',
            itemName: '',
            itemPrice: '',
            date: '',
            rType: '',
            rDetails: '',
            imageUrl: '',
          });
          window.location.href='/productview';
        } catch (error) {
          console.error("Error adding product: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      };
      

  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" style={{ width: '500px', backdropFilter: 'blur(10px)',padding:'20px' ,alignSelf:'center',marginTop:'5vw', marginBottom:'5vw'}}>
        <div className="bg-green-200 p-4 flex justify-between items-center">
          <h2 className="text-lg text-black font-bold align-middle ">Add New Product</h2>
        </div>
        
        {/* Product form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              name="itemName"
              value={product.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemPrice" className="form-label">Item Price</label>
            <input
              type="text"
              className="form-control"
              id="itemPrice"
              name="itemPrice"
              value={product.itemPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rType" className="form-label">Resource Type</label>
            <input
              type="text"
              className="form-control"
              id="rType"
              name="rType"
              value={product.rType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rDetails" className="form-label">Resource Details</label>
            <input
              type="text"
              className="form-control"
              id="rDetails"
              name="rDetails"
              value={product.rDetails}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload Field */}
          <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>
          {uploading && <div className="alert alert-info">Uploading Image...</div>}
          {product.imageUrl && <div className="alert alert-success">Image Uploaded Successfully!</div>}

          {/* Submit Button */}
          <br />
          <div className="d-grid gap-2">
            <button className="btn btn-outline-success" type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
