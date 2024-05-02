import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CardApi from '../Api/CardApi';
import Swal from 'sweetalert2';
import backgroundImage from '../images/bg6.jpg';

function Payment() {
  const [form, setForm] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        let cardData={
            cardNumber: form.cardNumber,
            cardHolderName: form.cardHolderName,
            expirationDate: form.expirationDate,
            cvv: form.cvv,
            amount: form.amount
        };
            await CardApi.AddCardApi(cardData).then((res) => {
            if(res.success === true) {
                Swal.fire('Congratulations!', 'Payment made successfully', 'success');
                setForm({
                    cardNumber: '',
                    cardHolderName: '',
                    expirationDate: '',
                    cvv: '',
                    amount: ''
                });
                window.location.href="/requestview";
            }else{
                Swal.fire('Oops...', res.message, 'error');
            }
        }).catch((error) => {
            console.log('Error:', error);
            Swal.fire('Oops...', 'Failed to make payment. Please try again.', 'error');
        }
    );
  };

  return (
    <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="card p-4" 
        style={{ width: '40vw',padding:'10px' ,alignSelf:'center',marginTop:'5vw', marginBottom:'5vw',padding:'5vw'}}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-3">Make Payment</h2>
            
            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleInputChange}
                placeholder="Enter card number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCardHolderName">
              <Form.Label>Card Holder Name</Form.Label>
              <Form.Control 
                type="text"
                name="cardHolderName"
                value={form.cardHolderName}
                onChange={handleInputChange}
                placeholder="Enter card holder name"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formExpirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control 
                    type="text"
                    name="expirationDate"
                    value={form.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control 
                    type="text"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleInputChange}
                    placeholder="CVV"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </Form.Group><br/>

            <Button variant="outline-success" type="submit"
              style={{ width: '100%' }}
            >
              Pay
            </Button>
          </Form>
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default Payment;
