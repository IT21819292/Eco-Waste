import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import {  Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faComment } from '@fortawesome/free-solid-svg-icons';

import ChatBotComponents from './ChatBot/ChatBotComponents';
// Auth
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import UserAuth from './auth/UserAuth';
import ForgetPassword from './auth/ForgetPassword';
import Home from './auth/Home';
import Profile from './User/Profile';

import Payment from './RequestManage/Payment';
import Request from './RequestManage/Request';

import AddProduct from './ProductManage/AddProduct';
import ProductView from './ProductManage/ProductView';
import Checkout from './ProductManage/Checkout';

import CheckoutDashboard from './Admin/CheckoutDashboard';
import RequestDashboard from './Admin/RequestDashboard';
import RequestView from './RequestManage/RequestView';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer'

import ApprovedList from './RequestManage/ApprovedList';
import PendingList from './RequestManage/PendingList';



import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const renderProtected = (Component) => {
    const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
    return isLoggedIn ? <Component /> : <Navigate to="/signin" />;
  };

    return (
      <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={window.localStorage.getItem("loggedIn") === "true" ? <UserAuth /> : <Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          
          {/* Protected Routes using the renderProtected function */}
          <Route path="/profile" element={renderProtected(Profile)} />
          <Route path="/payment" element={renderProtected(Payment)} />
          <Route path="/request" element={renderProtected(Request)} />
          <Route path="/requestview" element={renderProtected(RequestView)} />
          <Route path="/approvedlist" element={renderProtected(ApprovedList)} />
          <Route path="/pendinglist" element={renderProtected(PendingList)} />
          <Route path="/addproduct" element={renderProtected(AddProduct)} />
          <Route path="/productview" element={renderProtected(ProductView)} />
          <Route path="/checkout" element={renderProtected(Checkout)} />
          <Route path="/checkoutdashboard" element={renderProtected(CheckoutDashboard)} />
          <Route path="/requestdashboard" element={renderProtected(RequestDashboard)} />
        </Routes>
        {window.localStorage.getItem("loggedIn") === "true" && (
          <>
            <Button onClick={toggleChatbot} className="btn-chatbot-toggle">
              {showChatbot ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={faRobot} />}
            </Button>
            {showChatbot && (
              <div className="chatbot-popup">
                <ChatBotComponents />
              </div>
            )}
          </>
        )}
        <Footer />
      </Router>
    </QueryClientProvider>
    );
}
export default App;

