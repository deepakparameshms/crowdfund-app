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
          <p className="text-center">"DummyName"</p>
          <div className="row">
            <div className="col-md-6">
              <p className="text-muted transac_amount">₹ {props.amount}</p>
            </div>
            <div className="col-md-6">
              <p className="text-muted transac_date">{props.date.toString().slice(0, 10)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-muted transac_payment">Payment Success: {props.paid.toString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTransaction;