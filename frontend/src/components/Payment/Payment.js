// src/components/Payment/Payment.js
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../Context/userContext';
import './Payment.css';
import axios from "../../Axios/axios";
import {v4 as uuidv4} from 'uuid';

const Payment = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { user, showAlert, setPaymentSuccess, paymentSuccess, setOrderAmount } = context;
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentService, setPaymentService] = useState('RazorPay');
    const location = useLocation();
    const startupData = location.state?.startupData || {};
    const orderAmount = location.state?.amount || 10; 

    useEffect(() => {
        if (paymentSuccess) {
            navigate("/dashboard/startup/review");
        }
    }, [paymentSuccess])

    const handlePaymentSuccess = async () => {
        setPaymentSuccess(true);
        const response = await axios.post(
            `/api/investor/pay-order`,
            {
            isPaid: true,
            amount: orderAmount,
            paymentOrderId: uuidv4(),
            paymentId: uuidv4(),
            paymentSignature: "signature-from-payment-service",
            paymentService: paymentService,
            paymentMode: paymentMethod,
            transactionId: uuidv4(),
            investor_id: user._id,
            startup_id: startupData._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
          )
      
          if (response.data.success) {
            showAlert(response.data.msg, "success");
            setPaymentSuccess(true);
          }
    };

    const handlePaymentFailure = async () => {
        setPaymentSuccess(false);
        const paymentData = {
            isPaid: false,
            amount: orderAmount,
            paymentOrderId: uuidv4(),
            paymentId: uuidv4(),
            paymentSignature: "signature-from-payment-service",
            paymentService: paymentService,
            paymentMode: paymentMethod,
            transactionId: uuidv4(),
            investor_id: user._id,
            startup_id: startupData._id,
          }
        const response = await axios.post(
            `/api/investor/pay-order`,
            paymentData,
            {
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                }
            }
          )
          if (response.data.success) {
            showAlert(response.data.msg, "success");
            setPaymentSuccess(false);
          }
        navigate(`/dashboard/startup/${startupData._id}`);
        showAlert(`Payment Failed! contact admin with id ${paymentData.transactionId}`, 'danger');
    };

    const handlePaymentCancellation = () => {
        setPaymentSuccess(false);
        navigate(`/dashboard/startup/${startupData._id}`);
        showAlert('Payment cancelled', 'danger');
    };

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-container">
            <h2 className="text-center my-3">Payment Page</h2>
            <form className="payment-form">
                <div className="mb-3">
                    <label className="form-label">Payment Service Provider : <b>{paymentService}</b></label>
                </div>
                <div className="mb-3">
                    <label className="form-label">You are paying to Startup: <b>{startupData.Name}</b></label>
                </div>
                <div className="mb-3">
                    <label className="form-label">You are paying an amount of: <b>₹{orderAmount}</b></label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="Credit Card" onChange={handleChange} />
                        <label className="form-check-label">Credit Card</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="Debit Card" onChange={handleChange} />
                        <label className="form-check-label">Debit Card</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethod" value="UPI" onChange={handleChange} />
                        <label className="form-check-label">UPI</label>
                    </div>
                </div>
                <button type="button" className="btn btn-success" onClick={handlePaymentSuccess}>Simulate Payment Success</button>
                <button type="button" className="btn btn-danger" onClick={handlePaymentFailure}>Simulate Payment Failure</button>
                <button type="button" className="btn btn-danger" onClick={handlePaymentCancellation}>Cancel</button>
            </form>
        </div>
    );
};

export default Payment;
