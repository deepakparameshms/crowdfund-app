import React from 'react';
import './dashboardCard.css';
import { useNavigate, Link } from "react-router-dom";
const DashboardCard = (props) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card dash__card__body">
                <img src={props.el.logoUrl} className="card-img-top dash__card__image" alt="image" draggable={false} />
                <div className="card-body">
                    <h3 className="card-title dash__card__title">{props.el.name}</h3>
                    
                    <div className="country-info">
                        <img src={props.el.location.flag} alt={`${props.el.location.countryName} flag`} className="country-flag" />
                        <p className="country-name">{props.el.location.countryName}</p>
                    </div>

                    <div className={`status-tag ${props.el.achieved ? 'archieved' : 'active'}`}>
                        {props.el.achieved ? 'Archieved' : 'Active'}
                    </div>
                    <p className="card-text my-3 dash__card__desc">{(props.el.description)}</p>
                    <br/>
                    <Link to={`/dashboard/startup/${props.el.id}`} className="btn dash__card__butn">Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard