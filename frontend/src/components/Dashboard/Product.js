import React from "react";
import "./Product.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import ProductCard from "./ProductCard";
import axios from "../../Axios/axios";
import UserContext from "../../Context/userContext";
const Product = () => {
  const param = useParams();
  const context = useContext(UserContext);
  const { setStartupData, startupData, showAlert } = context;
  const navigate = useNavigate();

  useEffect(() => {
    // getUserData();
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    const fetchStartupsData = async () => {
      try {
        const response = await axios.get(`/api/project/${param.id}`,
          {
            headers: {
              "Content-Type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });

        if (response.status === 200) {
          setStartupData(response.data.data);
        }
      } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            if (error.response.status === 401) {
                showAlert("Authentication Expired. Please login", "error");
            } else {
                showAlert(error.response?.message || "An error occurred. Please try again.", "error");
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
    fetchStartupsData();
  }, [param.id]);

  return (
    <>
      <DashboardNavbar />
      {startupData && (
        <>
          <ProductCard data={startupData}></ProductCard>
        </>
      )}
    </>
  );
};

export default Product;
