import React, { useContext, useState, useEffect } from 'react';
import DashboardNavbar from '../DashboardNavbar';
import ViewTransaction from './ViewTransaction';
import "./ViewReview.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../../Axios/axios';
import UserContext from '../../../Context/userContext';
const ViewReview = () => {
    const navigate = useNavigate();
    const param = useParams();
    const context = useContext(UserContext);
    const [reviewData, setReviewData] = useState({ rating: 0, totalReview: 0 });
    const [transaction, setTransactions] = useState([]);
    const { getUserData, showAlert } = context;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
        const getData = async () => {
            // const response1 = await axios.post('/api/investor/fetchstartupReview', {
            //     startup_id: param.id
            // }, {
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${localStorage.getItem("token")}`
            //     },
            // }).catch((error) => {
            //     console.log(error.response.data.msg);
            // });
            // if (response1.data.success) {
            //     setReviewData(response1.data.ReviewData);
            // } console.log(response1);

            try{
                const response2 = await axios.get(`/api/transaction/project/${param.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}` 
                    },
                });

                if (response2.status === 200) {
                    setTransactions(response2.data.data);
                }
            } catch(error){
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
            
        }
        getUserData();
        getData();
        console.log(param.id);
    }, [param.id])

    let array1 = Array(reviewData.rating).fill(reviewData.rating);
    console.log(reviewData)
    console.log(transaction);
    return (
        <>
            <DashboardNavbar />
            <div className="container my-3">
                <div className="row">
                    {/* <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <div className="card review_card">
                            <div className="card-body">
                                <h3 className="text-center my-2">Review</h3>
                                <p className="star_label">Overall Rating</p>
                                <div className="ratings">
                                    {array1.map((element) => {
                                        return <img src="https://cdn-icons-png.flaticon.com/512/616/616489.png" className="mb-3 star_img" alt="rating-image" />
                                    })}
                                </div>
                                <h5 className="text-center text-muted">Total Reviews - <b>{reviewData.totalReview}</b></h5>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                        <div className="card transaction_card">
                            <div className="card-body">
                                <h2 className="text-center">Transactions</h2>
                                <div className="row">
                                    {transaction.map((element) => {
                                        return <div className="col-md-4 col-sm-6 my-3">
                                            <ViewTransaction amount={element.amount} date={element.date} paid={element.paid} investor_id={element.userId} />
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewReview;