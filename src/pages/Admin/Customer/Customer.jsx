import "./Customer.scss";

import React, { useState } from "react";

import Module from "../../../components/Module/Module";
import Payment from "../../../components/paymeForm/Payment";
import UpdateCustomer from "../../../components/UpdateCustomer/UpdateCustomer";
import { useGetCustomerByIdQuery } from "../../../context/api/customersApi";
import { useGetPaymetByIdQuery } from "../../../context/api/paymetApi";
import { useParams } from "react-router-dom";

const Customer = () => {
  const [payment, setPayment] = useState(false);
  const { id } = useParams();
  const { data } = useGetCustomerByIdQuery(id);
  const { data: store } = useGetPaymetByIdQuery(id);

  const [update, setUpdate] = useState(null);
  const [history, setHistory] = useState(false);
  const customer = data?.innerData;
  console.log(customer);

  const PaymentHistory = store?.innerData?.map((customer) => (
    <div key={customer?.id} className="payment__history__card">
      <div>
        <p>budget: {customer?.amount}</p>
        <span>comment: {customer?.comment}</span>
      </div>
      <div>
        <p>
          {customer?.adminId?.fname}
          {customer?.adminId?.lname}
        </p>
        <p>{customer?.createdAt.slice(0, 10)}</p>
        <p>{customer?.createdAt.slice(11, 16)}</p>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="customer">
        <div className="customer__detail">
          <h3>
            {customer?.fname} {customer?.lname}
          </h3>
          <p>{customer?.phone_primary}</p>
          <p>{customer?.budget}$</p>
          <address>{customer?.address}</address>
        </div>
        <div className="customer__admin">
          <h3>
            {customer?.adminId?.fname}
            {customer?.adminId?.lname}
          </h3>
          <p>{customer?.createdAt.slice(0, 10)}</p>
          <p>{customer?.createdAt.slice(11, 16)}</p>
          <button onClick={() => setUpdate(data?.innerData)}>Update</button>
          <button onClick={() => setPayment(customer)}>Payment</button>
          <button onClick={() => setHistory((prev) => !prev)}>History</button>
        </div>
      </div>

      {update ? (
        <Module width={350} bg={"#aaa8"} close={setUpdate}>
          <UpdateCustomer update={update} setUpdate={setUpdate} />
        </Module>
      ) : (
        <></>
      )}
      {payment && (
        <Module bg={"#aaa8"} close={setPayment}>
          <Payment close={setPayment} id={payment._id} />
        </Module>
      )}
      {history ? (
        <div className="payment__history">{PaymentHistory}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Customer;
