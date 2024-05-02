import React,{useEffect, useState} from 'react';
import Visa from '../images/visa.png';
import Paypal from '../images/paypal.png';
import CardApi from '../Api/CardApi';
import CheckoutApi from '../Api/CheckoutApi';
import Swal from 'sweetalert2';

const Checkout = () => {
  const [card, setCard] = useState({
    cardName: 'boc',
    cardNumber: '1234567890123456',
    month: '12',
    year: '2028',
    cvv: '123'
  });
  const [validationErrors, setValidationErrors] = useState({});

  const cData = JSON.parse(localStorage.getItem('checkoutData'));
  const checkoutData  = {
        productId: cData.productId,
        userName: cData.userName, 
        itemName: cData.itemName,
        itemPrice: cData.itemPrice,
        date: cData.date,
        rType: cData.rType,
        rDetails: cData.rDetails,
        imageUrl: cData.imageUrl,
        quantity: cData.quantity
      };
  
    // Handle form submission
    const totalAmount = (checkoutData.itemPrice * checkoutData.quantity).toFixed(2);

    //validations
    const validateForm = () => {
      const errors = {};
      const regexCardNumber = /^\d{16}$/; // Basic validation for 16 digit card number
      const regexCVV = /^\d{3,4}$/; // Basic validation for 3 or 4 digit CVV
      const regexMonth = /^(0[1-9]|1[0-2])$/; // MM format
      const regexYear = /^\d{4}$/; // YYYY format
  
      if (!card.cardName.trim()) {
          errors.cardName = "Card name is required.";
      }
      if (!regexCardNumber.test(card.cardNumber)) {
          errors.cardNumber = "Card number must be 16 digits.";
      }
      if (!regexMonth.test(card.month)) {
          errors.month = "Enter a valid month (MM).";
      }
      if (!regexYear.test(card.year) || card.year < new Date().getFullYear()) {
          errors.year = "Enter a valid year (YYYY).";
      }
      if (!regexCVV.test(card.cvv)) {
          errors.cvv = "CVV must be 3 or 4 digits.";
      }
  
      setValidationErrors(errors);
      return Object.keys(errors).length === 0; // Return true if no errors
  };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setCard({ ...card, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!validateForm()) {
        console.log('Validation failed');
        return; // Stop submission if validation fails
      }
    try{
      CardApi.productAddCardApi(card).then((res) => {
      console.log("res===>",res);
      if(res.success === true){
        console.log("Card added successfully");
        const paymentId = res.paymentId;
        handlePayment(paymentId);
      }
      else{
        console.log("Card adding failed");
      }});
    }catch(error){
      console.log("Error in card adding",error);
    }
    };
    
    const handlePayment = (paymentId) => {
        const paymentData = {
          ...checkoutData,
          paymentId: paymentId,
          isPayment: true,
          isRefund: false,
          totalAmount: totalAmount
        };
        CheckoutApi.AddCheckoutApi(paymentData)
        .then((res) => {
          console.log('Checkout successful:', res.success);
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Thank you for shopping with us!',
            showConfirmButton: false,
            timer: 2000
          });
          window.location.href = '/productview'; // Redirect to home page
          localStorage.removeItem('checkoutData');
         
        })
        .catch(error => console.error('Error during checkout:', error));
    };
  
    return (
    <div className="container-fluid bg-light p-3">
      <div className="container bg-white my-3">
        <div className="py-2 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h2 className="h4 text-dark font-weight-bold">Checkout</h2>
        </div>
        <div className="row my-3">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="card shadow p-4">
              <h2 className="h5 card-header bg-primary text-white text-center">Payment Method</h2>
              <div className="card-body">
                {/* Payment method selection */}
                <div className="my-3 d-flex justify-content-around">
                  <button type="button" className="btn btn-outline-primary">
                    <img src={Visa} alt="Credit Card" width="200" height="100" />
                  </button>
                  <button type="button" className="btn btn-outline-primary">
                    <img src={Paypal} alt="PayPal" width="200" height="100" />
                  </button>
                </div>
                {/* Name on Card input */}
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Name on Card" 
                    name="cardName" value={card.cardName} onChange={handleChange} />
                  {validationErrors.cardName && <div className="text-danger">{validationErrors.cardName}</div>}
                </div>
                {/* Card Number input */}
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Credit Card Number"
                    name="cardNumber" value={card.cardNumber} onChange={handleChange} />
                  {validationErrors.cardNumber && <div className="text-danger">{validationErrors.cardNumber}</div>}
                </div>
                {/* Expiry date and CVV */}
                <div className="mb-3 row">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Month"
                      name="month" value={card.month} onChange={handleChange} />
                    {validationErrors.month && <div className="text-danger">{validationErrors.month}</div>}
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Year"
                      name="year" value={card.year} onChange={handleChange} />
                    {validationErrors.year && <div className="text-danger">{validationErrors.year}</div>}
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="CVV"
                      name="cvv" value={card.cvv} onChange={handleChange} />
                    {validationErrors.cvv && <div className="text-danger">{validationErrors.cvv}</div>}
                  </div>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={Object.keys(validationErrors).length !== 0}
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            {/* Order Summary */}
            <div className="card shadow p-4">
              <h3 className="h5 card-header bg-warning text-dark">Order Summary</h3>
              <div className="card-body">
                <img src={checkoutData.imageUrl} alt="Product" className="img-fluid mb-3" />
                <p>Item Name: <strong>{checkoutData.itemName}</strong></p>
                <p>Item Price: <strong>{checkoutData.itemPrice} LKR</strong></p>
                <p>Item Quantity: <strong>{checkoutData.quantity}</strong> pieces</p>
                <p className="fw-bold">Total Price:
                  <span className="badge bg-danger ms-2">
                    {totalAmount} LKR
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default Checkout;
  