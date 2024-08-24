import React from 'react'
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import UserContext from "../../Context/userContext";


const ProductCard = (props) => {
    const [isbacker, setIsBacker] = useState(false);
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const { user} = context;
    const [orderAmount, setOrderAmount] = useState(100);


    const cancelPayment = () => {
        setIsBacker(false);
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <div className="card card_icons">
                        <img src={props.data.logoUrl} alt="startup-logo" className="startup_logo_img" draggable={false}/>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    <a href={`mailto:${props.data.email}`} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.instagram} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.linkedIn} target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1409/1409945.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <a href={props.data.website} target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/1040/1040243.png" alt="mail-icon-img" className="mail_icon_img" /></a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                {user && user._id === props.data.Founder_id && (
                                    <Link to={`/dashboard/startup/${props.data.id}/viewReview`} className="btn view_review">View Transaction and Review</Link>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mb-3">
                    <label className="startup_label">Startup Name</label>
                    <p className="startup_label_desc">{props.data.name}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Description</label>
                    <p className="startup_label_desc">{(props.data.description)}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Website's Address</label>
                    <p className="startup_label_desc">{props.data.website}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Startup Category</label>
                    <p className="startup_label_desc">{props.data.category}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Startup's Vision</label>
                    <p className="startup_label_desc">{props.data.vision}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">Problem Domain</label>
                    <p className="startup_label_desc">{props.data.problemStatement}</p>
                    <hr className="startup_label_hr" />
                    <label className="startup_label">How they are solving the problem</label>
                    <p className="startup_label_desc">{props.data.solution}</p>
                    <hr className="startup_label_hr" />
                    {user && user._id === props.data.Founder_id && (
                        <Link className="btn btn-primary" to={`/dashboard/update-startup/${props.data.id}`}
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
                                <h2 className="product_card_title">₹ {props.data.currentAmount}</h2>
                                <p className="product_card_desc">pledged of ₹ {props.data.askAmount} goal</p>
                                <h2 className="product_card_title">{props.data.donations}</h2>
                                <p className="product_card_desc">Donations</p>
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
                                    <Link className="btn backer__btn" disabled={orderAmount > 10 ? false : true} to={`/payment`} state={{startupData : props.data, amount: orderAmount}}>Pay Now</Link>
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