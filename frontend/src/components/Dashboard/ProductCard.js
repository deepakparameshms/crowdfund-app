import React from 'react'
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../Axios/axios';
import UserContext from "../../Context/userContext";


const ProductCard = (props) => {
    const [isbacker, setIsBacker] = useState(false);
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const { user} = context;
    const { loadRazorpay, setOrderAmount, orderAmount, paymentSuccess, submitPayment} = context;

    useEffect(() => {
        if (paymentSuccess) {
            navigate("/dashboard/startup/review");
        }
    }, [paymentSuccess])

    const handlePaymentSubmit = () => {
        submitPayment();
    };

    const cancelPayment = () => {
        setIsBacker(false);
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <div className="card card_icons">
                        <img src={props.data.LogoUrl} alt="startup-logo" className="startup_logo_img" draggable={false}/>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    <a href={`mailto:${props.data.Email}`} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.Instagram} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.LinkedIn} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1409/1409945.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.Website} target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/1040/1040243.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <Link to={`/dashboard/startup/${props.data._id}/viewReview`} className="btn view_review">View Transaction and Review</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mb-3">
                    <label className="startup_label">Startup Name</label>
                    <p className="startup_label_desc">{props.data.Name}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Description</label>
                    <p className="startup_label_desc">{(props.data.Description)}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Website's Address</label>
                    <p className="startup_label_desc">{props.data.Website}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Startup Category</label>
                    <p className="startup_label_desc">{props.data.Category}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Startup's Vision</label>
                    <p className="startup_label_desc">{props.data.Vision}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Problem Domain</label>
                    <p className="startup_label_desc">{props.data.Problemstatement}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">How they are solving the problem</label>
                    <p className="startup_label_desc">{props.data.Solution}</p>
                    <hr className="startup_label_hr" />
                    {user && user._id === props.data.Founder_id && (
                        <Link className="btn btn-primary" to={`/dashboard/update-startup/${props.data._id}`}
                        state={{ startupData: props.data }}
                        >
                            Update Project
                        </Link>
                    )}
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                    <div className="card product_card">
                        <div className="card-body">
                            {!isbacker ? (
                                <>
                                <h2 className="product_card_title">₹ {props.data.Current}</h2>
                                <p className="product_card_desc">pledged of ₹ {props.data.Ask} goal</p>
                                <h2 className="product_card_title">{props.data.Supporters}</h2>
                                <p className="product_card_desc">Investments</p>
                                <button type="button" onClick={() => setIsBacker(true)} className="btn backer__btn" disabled={props.data.isAchieved}>
                                        {props.data.isAchieved ? "Milestone Achieved 🎉" : "Support project"}
                                </button>
                                </>
                                ) : (
                                <>
                                    <h4 className="text-center mb-3" style={{ fontWeight: "800" }}>Enter the Amount</h4>
                                    <input type="number" min={10} max={1000} className="mb-3 product_card_amount_input" name="orderAmount" value={orderAmount} onChange={(e) => {
                                        setOrderAmount(e.target.value);
                                    }} required />
                                    <button type="button" className="btn backer__btn" disabled={orderAmount > 10 ? false : true} onClick={handlePaymentSubmit}>Pay Now</button>
                                    <button type="button" className="btn normal__btn" onClick={cancelPayment}>Cancel</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard