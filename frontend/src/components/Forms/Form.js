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
        Name: startupData?.Name || "",
        Description: startupData?.Description || "",
        Website: startupData?.Website || "",
        Email: startupData?.Email || "",
        Instagram: startupData?.Instagram || "",
        LinkedIn: startupData?.LinkedIn || "",
        LogoUrl: startupData?.LogoUrl || "",
        Category: startupData?.Category || "",
        Vision: startupData?.Vision || "",
        Problemstatement: startupData?.Problemstatement || "",
        Solution: startupData?.Solution || "",
        Ask: startupData?.Ask || 0
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, []);

    const createOrUpdateStartup  = async (e) => {
        e.preventDefault();
        const { Name, Description, Website, Email, Instagram, LinkedIn, LogoUrl, Category, Vision, Problemstatement, Solution, Ask } = credentials;
        const url = startupData._id
            ? `/api/investor/update-startup/${startupData._id}`
            : '/api/investor/create-startup';
        const method = startupData && startupData._id ? "put" : "post";
        const response = await axios({
            method: method,
            url: url,
            data: {
                Name, Description, Website, Email, Instagram, LinkedIn, LogoUrl, Category, Vision, Problemstatement, Solution, Ask
            }, 
            headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        localStorage.getItem('token'),
            }
            }).catch((error) => {
                showAlert(error.response.data.msg);
            });
        if (response.data.success) {
            showAlert(response.data.msg, "success");
            navigate(-1)
        }
        setCredentials({ Name: "", Description: "", Website: "", Email: "", Instagram: "", LinkedIn: "", LogoUrl: "", Category: "", Vision: "", Problemstatement: "", Solution: "", Ask: 0 })
        // navigate("/dashboard");
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
                            <form className="my-4" onSubmit={createOrUpdateStartup}>
                                <div className="mb-3">
                                    <label htmlFor="Name" className="form-label text-muted">What is the name of your project?</label>
                                    <input type="text"
                                        placeholder="Project Name"
                                        className="form-control form_input"
                                        id="Name"
                                        name="Name"
                                        value={credentials.Name}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Website" className="form-label text-muted">Enter the url of your logo</label>
                                    <input type="url"
                                        placeholder="Enter URL"
                                        className="form-control form_input"
                                        id="LogoUrl"
                                        name="LogoUrl"
                                        value={credentials.LogoUrl}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label text-muted">Describe your project in less than 50 words?</label>
                                    <textarea rows="4" className="form_input textarea_input"
                                        id="Description"
                                        name="Description"
                                        value={credentials.Description}
                                        onChange={onChange}
                                        required={true}>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Category" className="form-label text-muted">Select the category of your project</label>
                                    <select className="form-select form_input" aria-label="Default select example"
                                        id="Category"
                                        name="Category"
                                        value={credentials.Category}
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
                                    <label htmlFor="Problemstatement" className="form-label text-muted">State the problem you are trying to solve with your project</label>
                                    <textarea
                                        rows="4"
                                        className="form_input textarea_input"
                                        id="Problemstatement"
                                        name="Problemstatement"
                                        value={credentials.Problemstatement}
                                        onChange={onChange}
                                        required={true}
                                    >
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Vision" className="form-label text-muted" >Explain your project's Vision in less than 100 words.</label>
                                    <textarea rows="4"
                                        className="form_input textarea_input"
                                        id="Vision"
                                        name="Vision"
                                        value={credentials.Vision}
                                        onChange={onChange}
                                        required={true}>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Solution" className="form-label text-muted">Explain how and why your are different and better than other competitors(If any).</label>
                                    <textarea rows="4"
                                        className="form_input textarea_input"
                                        id="Solution"
                                        name="Solution"
                                        value={credentials.Solution}
                                        onChange={onChange}
                                        required={true}
                                    >
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Ask" className="form-label text-muted">How much amount you want to raise for your project?</label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="form-control form_input"
                                        id="Ask"
                                        name="Ask"
                                        value={credentials.Ask}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Website" className="form-label text-muted">Enter your website's address</label>
                                    <input type="url"
                                        placeholder="Website's Address"
                                        className="form-control form_input"
                                        id="Website"
                                        name="Website"
                                        value={credentials.Website}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Instagram" className="form-label text-muted">Enter your project's Instagram Page's link</label>
                                    <input type="url" placeholder="Project's Instagram Page's link"
                                        className="form-control form_input"
                                        id="Instagram"
                                        name="Instagram"
                                        value={credentials.Instagram}
                                        onChange={onChange}
                                        required={true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label text-muted">Enter your team's Email</label>
                                    <input type="Email"
                                        placeholder="Project's Email (Official)"
                                        className="form-control form_input"
                                        id="Email"
                                        name="Email"
                                        value={credentials.Email}
                                        onChange={onChange}
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="LinkedIn" className="form-label text-muted">Enter your project's LinkedIn Page's link</label>
                                    <input type="url"
                                        placeholder="Project's LinkedIn Page's link"
                                        className="form-control form_input"
                                        id="LinkedIn"
                                        name="LinkedIn"
                                        value={credentials.LinkedIn}
                                        onChange={onChange}
                                        required={true} />
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