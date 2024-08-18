import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/userContext';
import "./ReviewForm.css";
import axios from '../../Axios/axios';
const ReviewForm = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    let { showAlert, startupData, setPaymentSuccess } = context;
    const [reviews, setReviews] = useState({ ideaRating: 1, approachRating: 1 })
    const [active, setActive] = useState("");
    const onChange = (e) => {
        e.preventDefault();
        setActive("button_active");
        setReviews({ ...reviews, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { ideaRating, approachRating } = reviews;
        let overallRating = (parseInt(ideaRating) + parseInt(approachRating)) / 2;
        const response = await axios.post('/api/investor/review', {
            ideaRating, approachRating, Startup_id: startupData._id, overallRating
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    localStorage.getItem('token'),
            },
        }).catch((error) => {
            showAlert(error.response.data.msg);
        });
        if (response.data.success) {
            showAlert(response.data.msg, "success");
        }
        setReviews({ ideaRating: 1, approachRating: 1});
        setPaymentSuccess(false);
        navigate("/dashboard");
    }

    const handleCancel = () => {
        navigate("/dashboard");
    }
    return (
        <>
            <div className="card mb-3 mx-auto my-5 startup_form">
                <div className="row g-0">
                    <div className="col-md-5 col-sm-12">
                        <img src="https://www.pcg-services.com/wp-content/uploads/2016/08/startup-business-strategy-1.jpg" className="img-fluid rounded-start review_image" alt="startup-image" />
                    </div>
                    <div className="col-md-7 col-sm-12">
                        <div className="card-body">
                            <h5 className="card-title text-center">Startup Rating Form</h5>
                            <form className="my-4">
                                <label for="exampleInputPassword1" className="form-label text-muted mb-3">How much rating will you give:</label>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label text-muted">To the idea and the vision?</label>
                                    <select name="ideaRating" className="form-select rating_btn" onChange={onChange} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label text-muted">To their approach of solving the problem?</label>
                                    <select name="approachRating" className="form-select rating_btn" onChange={onChange} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                                <button className="my-3 btn form_submit_btn" onClick={handleSubmit}>Submit</button>
                                <button className="my-3 btn cancel_btn" onClick={handleCancel}>Skip for now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewForm;