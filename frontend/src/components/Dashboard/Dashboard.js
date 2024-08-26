import React, { useEffect, useContext, useState } from 'react';
import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import DashboardNavbar from './DashboardNavbar';
import UserContext from '../../Context/userContext';
import DashboardCard from './dashboardCard';
import ReactLoading from 'react-loading';

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  let { getUserData, startups, getStartups, fetchCountries, filteredCountries } = context;
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("*")
  const [selectedCountry, setSelectedCountry] = useState("*");

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    getUserData();
    getStartups();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetchCountries();
  }, [])

  const resourceCopy = [...startups];
  console.log(resourceCopy);
  const FilteredList = resourceCopy.filter((element) => {
    return (
      (category === "*" || element.category === category) &&
      (selectedCountry === "*" || element.location.countryName === selectedCountry)
    );
  });
  const resourceList = FilteredList.map((el) => (
    <DashboardCard key={el.id} el={el}></DashboardCard>
  ))
  return (
    <>
      {loading ? (<ReactLoading type={"cylon"} color={"rgb(225, 41, 246)"} height={'50%'} width={'100%'} />) : (<>
        <DashboardNavbar />
        <div className="scrollmenu">
          <h5 onClick={() => { setCategory("*") }}>Category: All</h5>
          <h5 onClick={() => { setCategory("Design and Tech") }}>Design and Tech</h5>
          <h5 onClick={() => { setCategory("Arts") }}>Arts</h5>
          <h5 onClick={() => { setCategory("Film") }}>Film</h5>
          <h5 onClick={() => { setCategory("Games") }}>Games</h5>
          <h5 onClick={() => { setCategory("Music") }}>Music</h5>
          <h5 onClick={() => { setCategory("Publishing") }}>Publishing</h5>
          <h5 onClick={() => { setCategory("Finance") }}>Finance</h5>
          <h5 onClick={() => { setCategory("Education") }}>Education</h5>
          <h5 onClick={() => { setCategory("Eco-Friendly") }}>Eco-Friendly</h5>
        </div>
        <div className="container-fluid dashboard__container">

        <div className="row mb-3">
          <div className="col-lg-3">
            <label htmlFor="countryFilter" className="form-label country-label" >Filter by Country</label>
            <select
              id="countryFilter"
              className="form-select country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="*">All Countries</option>
              {filteredCountries.map((country, index) => (
                <option key={index} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="container my-5">
            <div className="row gy-3">
              {FilteredList.length === 0 ? (
                    <h2 className="text-center my-5" style={{ color: "rgb(225, 41, 246)" }}>
                      No Projects match the selected criteria!
                    </h2>
                  ) : (
                  resourceList
                )}
            </div>
          </div>
        </div>
      </>)}
    </>
  )
}

export default Dashboard;