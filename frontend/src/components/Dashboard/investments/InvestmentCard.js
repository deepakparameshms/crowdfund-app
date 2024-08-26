import React, { useContext } from "react";
import UserContext from "../../../Context/userContext";
const InvestmentCard = (props) => {
  const context = useContext(UserContext);
  let { startups } = context;
  let data = startups.filter((startup) => {
    return startup.id === props.data.projectId;
  });
  if (data.length > 0) {
    return (
      <>
        <div className="card my-5 investment_card">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <img
                src={data[0].logoUrl}
                alt="invest"
                className="investment_img"
              />
            </div>
            <div className="col-md-7 col-sm-12 investment_card_left_column">
              <div className="row investment_card_title_row">
                <div className="col-12">
                  <h4 className="text-center investment_card_title">
                    {data[0].name}
                  </h4>
                </div>
              </div>
              <div className="row investment_card_desc_row">
                <div className="col-12">
                  <h4 className="investment_card_desc">
                    {data[0].description}
                  </h4>
                </div>
              </div>
              <div className="row investment_card_bottom_row">
                <div className="col-md-4 col-sm-12">
                  <h4 className="investment_card_amount">
                    {props.data.amount}
                  </h4>
                </div>
                <div className="col-md-8 col-sm-12">
                  <p className="investment_card_date">
                    {new Date(props.data.date.toString()).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default InvestmentCard;
