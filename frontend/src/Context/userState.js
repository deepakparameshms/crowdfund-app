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
  const [filteredCountries, setFilteredCountries] = useState([]);
  const countriesList = ["Singapore", "United Kingdom", "Germany", "Switzerland", "United States", "Canada", "South Korea", "Beijing", "Japan", "Australia", "India", "New Zealand", "Indonesia", "Brazil"];


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
    getUserData();
    // getUserStartups();
  }, []);

  const getInvestmentData = async () => {
    try{
      const response = await axios.get(`/api/transaction/user/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
        if (response.status === 200) {
          setInvestmentData(response.data.data);
          console.log(response.data);
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

  const fetchCountries = async () => {
      const cachedCountries = localStorage.getItem('filteredCountries');
      if (cachedCountries) {
        setFilteredCountries(JSON.parse(cachedCountries));
      } else {
      try {
          const response = await fetch('https://restcountries.com/v3.1/independent?status=true&fields=name,currencies,flags');
          const countries = await response.json();
          console.log(countries)
          // Filter the required countries
          const filtered = countries.filter(country => countriesList.includes(country.name.common));
          
          // Store in local storage
          localStorage.setItem('filteredCountries', JSON.stringify(filtered));
          
          // Set the state with filtered countries
          setFilteredCountries(filtered);
      } catch (error) {
          console.error("Error fetching countries: ", error);
      }
      }
  }

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
        filteredCountries,
        fetchCountries
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
