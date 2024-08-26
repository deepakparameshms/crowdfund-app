import React, { useEffect, useState, useContext } from 'react';
import "./ViewTransaction.css";
import axios from '../../../Axios/axios';
import UserContext from "../../../Context/userContext";

const ViewTransaction = (props) => {
  // const [investorName, setInvestorName] = useState("");
  const context = useContext(UserContext);
  const { user } = context
  useEffect(() => {
    // const getuserName = async () => {
    //   const response = await axios.get(`/api/transaction/user/${props.user}`, 
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${localStorage.getItem("token")}`
    //     }
    //   }).catch((error)=>{
    //     console.log(error.response.data.msg);
    //   })
    //   if(response.data.success){
    //     setInvestorName(response.data.data)
    //   }
    //   else{
    //     console.log(response.data.msg);
    //   }
    // }
    // getuserName();
  }, [props.investor_id])

  return (
    <>
      <div className="card view_transaction_card">
        <div className="card-body">
          <h5 className="text-center text-muted">Username</h5>
          <p className="text-center">{props.el.userName}</p>
          <div className="row">
            <div className="col-md-12">
              <p className="text-muted transac_date text-center">{new Date(props.el.date.toString()).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}</p>
            </div>
          </div>
          <div className='row'>
          <div className="col-md-12">
              <p className="text-muted transac_amount "> {props.el.currencyType} {props.el.amount}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-muted transac_payment">Payment Success: {props.el.paid.toString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTransaction;