import { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "../Axios/axios";
import {v4 as uuidv4} from 'uuid';

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [startups, setStartups] = useState([]);
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [userStartup, setUserStartup] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  let showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };
  useEffect(() => {
    getUserStartups();
    getUserData();
  }, []);

  const getInvestmentData = async () => {
    const response = await axios
      .get("/api/investor/getTransactions", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
    if (response.data.success) {
      setInvestmentData(response.data.data);
    }
  };

  const getUserData = async () => {
    const response = await axios
      .get(`/api/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .catch((error) => {
        if (error.response){
          showAlert(error.response.data.msg);
        } else if (error.request){
            // The request was made, but no response was received
            console.log("No Response:", error.request);
            showAlert("Network error: No response received from server. Please check your connection.");
        } else {
            showAlert("Something went wrong.");
        }
      });
    setUser(response.data.data);
  };

  const getStartups = async () => {
    try{
      const response = await axios.get(`/api/project/all`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.status === 200) {
          setStartups(response.data.data);
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

  // for Startups DashBoard
  const getUserStartups = async () => {
    const response = await axios.get(`/api/project/user/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    if (response.status === 200) {
      setUserStartup(response.data.data);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUserData,
        alert,
        showAlert,
        setStartups,
        startups,
        getStartups,
        setStartupData,
        startupData,
        setOrderAmount,
        orderAmount,
        getUserStartups,
        userStartup,
        getInvestmentData,
        investmentData,
        paymentSuccess,
        setPaymentSuccess,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
