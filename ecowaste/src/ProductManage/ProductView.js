import React, { useState, useEffect } from 'react';
import ProductApi from '../Api/ProductApi';
import backgroundImage from '../images/bg5.jpg';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await ProductApi.getProductApi();
            setProducts(response.existingProducts);
            console.log(response.existingProducts);
            let initialQuantities = {};
            response.existingProducts.forEach(product => {
                initialQuantities[product.productId] = 1;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleQuantityChange = (productId, newValue) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: newValue
        }));
    };

    const handlePayment = (product) => {
        const checkoutData = {
            ...product,
            quantity: quantities[product.productId]
        };
        console.log('Proceeding to payment with:', checkoutData);
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        window.location.href="/checkout"
        // Redirect to the payment or checkout page as needed
    };

    return (
        <div className="vh-120 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className='container'>
            <div className=" py-3 d-flex justify-content-between align-items-center">
                <h2 className="h3 font-weight-bold text-dark">Product</h2>
                <button onClick={()=> window.location.href="/addproduct"} className="btn btn-success w-10"> Add Product</button>
            </div>
            <div className='row'>
                {products.map((product) => (
                    <div className='col-md-4 mb-4' key={product.productId}>
                        <div className='card h-100'>
                        <h5 className='card-title' style={{alignSelf:'center',margin:'1vw', fontWeight:'bold'}}>{product.itemName}</h5>
                            <img src={product.imageUrl} alt={product.itemName} className='card-img-top' style={{height:'20vw', objectFit:'contain'}}  />
                            <div className='card-body'>
                                <p className='card-text'>{product.rDetails}</p>
                                <p className='small text-muted'>Posted by {product.userName} on {product.date}</p>
                                <p>LKR. <strong>{product.itemPrice}</strong> /=</p>
                                <div className="mb-3">
                                    <label htmlFor={`quantity-${product.productId}`} className="form-label">Quantity</label>
                                    <select
                                        id={`quantity-${product.productId}`}
                                        className="form-select"
                                        value={quantities[product.productId]}
                                        onChange={e => handleQuantityChange(product.productId, e.target.value)}
                                    >
                                        {[...Array(10).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button
                                        onClick={() => handlePayment(product)}
                                        className="btn btn-primary w-100"
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default ProductView;
