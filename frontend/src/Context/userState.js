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
    }, 2000);
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
        console.log(error.response.data.error);
      });
    setUser(response.data.data);
  };

  const getStartups = async () => {
    const response = await axios.get(`/api/investor/fetch-startups`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (response.data.success) {
      setStartups(response.data.data);
    }
  };

  // for Startups DashBoard
  const getUserStartups = async () => {
    const response = await axios.get(`/api/investor/fetchuserStartups`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (response.data.success) {
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
