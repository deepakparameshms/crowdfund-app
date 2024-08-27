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
    const [paymentService, setPaymentService] = useState('Payal');
    const location = useLocation();
    const startupData = location.state?.startupData || {};
    const orderAmount = location.state?.amount || 100;
    const currencyType = location.state?.currency

    useEffect(() => {
        // if (paymentSuccess) {
        //     navigate("/dashboard/startup/review");
        // }
    }, [paymentSuccess])

    const handlePayment = async (isPaid) => {
        setPaymentSuccess(isPaid);
        try{
            const response = await axios.post(
                `/api/transaction/payment`,
                {
                    paid: isPaid,
                    amount: orderAmount,
                    userId: user.id,
                    projectId: startupData.id,
                    transactionType: "DONATION",
                    paymentInfo:{
                        paymentId: uuidv4(),
                        paymentService: paymentService,
                        signature: "signature-from-payment-service",
                        paymentServiceMessage: isPaid ? "Payment Successful" : "Some issue occured in our side",
                        paymentMode: paymentMethod,
                        currencyType: currencyType
                    }
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`  
                },
              });

              if (response.status === 201 && isPaid) {
                showAlert(response.data.message, "success");
                navigate(-1);
              } else{
                showAlert("Payment has failed", "danger");
                navigate(-1);
              }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                if (error.response.status === 401) {
                    showAlert(error.resposne.data.message, "error");
                } else if (error.response.status === 400) {
                    showAlert(error.response.data.message, "error");
                } else {
                    showAlert(error.response.data.message || "An error occurred. Please try again.", "error");
                }
            } else if (error.request) {
                // Request was made but no response received
                showAlert("Network error: Please check your connection.", "error");
            } else {
                // Something else happened while setting up the request
                showAlert("Something went wrong. Please try again.", "error");
            }
        }
    };

    const handlePaymentCancellation = () => {
        navigate(`/dashboard/startup/${startupData.id}`);
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
                    <label className="form-label">You are paying an amount of: ({currencyType}) <b>{orderAmount}</b></label>
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
                <button type="button" className="btn btn-success" onClick={() => handlePayment(true)}>Simulate Payment Success</button>
                <button type="button" className="btn btn-danger" onClick={() => handlePayment(false)}>Simulate Payment Failure</button>
                <button type="button" className="btn btn-danger" onClick={handlePaymentCancellation}>Cancel</button>
            </form>
        </div>
    );
};

export default Payment;
