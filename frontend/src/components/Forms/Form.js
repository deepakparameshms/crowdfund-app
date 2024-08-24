import React, { useState, useEffect, useContext } from 'react';
import "./Form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from '../../Context/userContext';
import axios from '../../Axios/axios';

const Form = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    let { showAlert } = context;
    const location = useLocation();
    const startupData = location.state?.startupData || {};

    const [credentials, setCredentials] = useState({
        name: startupData?.name || "",
        description: startupData?.description || "",
        website: startupData?.website || "",
        email: startupData?.email || "",
        instagram: startupData?.instagram || "",
        linkedIn: startupData?.linkedIn || "",
        logoUrl: startupData?.logoUrl || "",
        category: startupData?.category || "",
        vision: startupData?.vision || "",
        problemStatement: startupData?.problemStatement || "",
        solution: startupData?.solution || "",
        askAmount: startupData?.askAmount || 0
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, []);

    const createOrUpdateForm  = async (e) => {
        e.preventDefault();
        const { name, description, website, email, instagram, linkedIn, logoUrl, category, vision, problemStatement, solution, askAmount } = credentials;
        const url = startupData && startupData._id ? `/api/project/${startupData._id}` : `/api/project/?founderId=66c949bc6d109b04b9899520`;
        const method = startupData && startupData._id ? "put" : "post";

        try{
            const response = await axios({
                method: method,
                url: url,
                data: {
                    name, description, website, email, instagram, linkedIn, logoUrl, category, vision, problemStatement, solution, askAmount
                }, 
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200 || response.status === 201) {
                showAlert(response.data.message, "success");
                navigate(-1);
            }
            setCredentials({ name: "", description: "", website: "", email: "", instagram: "", linkedIn: "", logoUrl: "", category: "", vision: "", problemStatement: "", solution: "", askAmount: 0 })
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                if (error.response.status === 401) {
                    showAlert("Authentication Expired. Please login", "error");
                    navigate("/login");
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
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="card mb-3 mx-auto my-5 startup_form">
                <div className="row g-0">
                    <div className="col-md-7">
                        <div className="card-body">
                            <h1 className="card-title text-center startup_form_head">Project Registration Form</h1>
                            <form className="my-4" onSubmit={createOrUpdateForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label text-muted">What is the name of your project?</label>
                                    <input type="text"
                                        placeholder="Project Name"
                                        className="form-control form_input"
                                        id="name"
                                        name="name"
                                        value={credentials.name}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logoUrl" className="form-label text-muted">Enter the url of your logo</label>
                                    <input type="url"
                                        placeholder="Enter URL"
                                        className="form-control form_input"
                                        id="logoUrl"
                                        name="logoUrl"
                                        value={credentials.logoUrl}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label text-muted">Describe your project in less than 50 words?</label>
                                    <textarea rows="4" className="form_input textarea_input"
                                        id="description"
                                        name="description"
                                        value={credentials.description}
                                        onChange={onChange}
                                        required={true}>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label text-muted">Select the category of your project</label>
                                    <select className="form-select form_input" aria-label="Default select example"
                                        id="category"
                                        name="category"
                                        value={credentials.category}
                                        onChange={onChange}
                                        required={true} > 
                                        <option >Choose the category</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Design and Tech">Design and Tech</option>
                                        <option value="Film">Film</option>
                                        <option value="Games">Games</option>
                                        <option value="Music">Music</option>
                                        <option value="Publishing">Publishing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Education">Education</option>
                                        <option value="Eco-Friendly">Eco-Friendly</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="problemStatement" className="form-label text-muted">State the problem you are trying to solve with your project</label>
                                    <textarea
                                        rows="4"
                                        className="form_input textarea_input"
                                        id="problemStatement"
                                        name="problemStatement"
                                        value={credentials.problemStatement}
                                        onChange={onChange}
                                        required={true}
                                    >
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="vision" className="form-label text-muted" >Explain your project's Vision in less than 100 words.</label>
                                    <textarea rows="4"
                                        className="form_input textarea_input"
                                        id="vision"
                                        name="vision"
                                        value={credentials.vision}
                                        onChange={onChange}
                                        required={true}>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="solution" className="form-label text-muted">Explain how and why your are different and better than other competitors(If any).</label>
                                    <textarea rows="4"
                                        className="form_input textarea_input"
                                        id="solution"
                                        name="solution"
                                        value={credentials.solution}
                                        onChange={onChange}
                                        required={true}
                                    >
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="askAmount" className="form-label text-muted">How much amount you want to raise for your project?</label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="form-control form_input"
                                        id="askAmount"
                                        name="askAmount"
                                        value={credentials.askAmount}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="website" className="form-label text-muted">Enter your website's address</label>
                                    <input type="url"
                                        placeholder="Website's Address"
                                        className="form-control form_input"
                                        id="website"
                                        name="website"
                                        value={credentials.website}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-muted">Enter your team's Email</label>
                                    <input type="Email"
                                        placeholder="Project's Email (Official)"
                                        className="form-control form_input"
                                        id="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instagram" className="form-label text-muted">Enter your project's Instagram Page's link</label>
                                    <input type="url" placeholder="Project's Instagram Page's link"
                                        className="form-control form_input"
                                        id="instagram"
                                        name="instagram"
                                        value={credentials.instagram}
                                        onChange={onChange}
                                        required={false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="linkedIn" className="form-label text-muted">Enter your project's LinkedIn Page's link</label>
                                    <input type="url"
                                        placeholder="Project's LinkedIn Page's link"
                                        className="form-control form_input"
                                        id="linkedIn"
                                        name="linkedIn"
                                        value={credentials.linkedIn}
                                        onChange={onChange}
                                        required={false} />
                                </div>
                                <button type="submit" className="btn form_submit_btn">{startupData._id ? "Update" : "Submit"}</button>
                                <button type="button" className="btn cancel_btn" onClick={() => {navigate(-1)}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <img src="https://static.vecteezy.com/system/resources/previews/000/175/200/large_2x/free-startup-vector-illustration.jpg" className="img-fluid rounded-start startup_form_side_img" alt="startup-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form;