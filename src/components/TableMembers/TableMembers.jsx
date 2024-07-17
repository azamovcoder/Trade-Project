import "./TableMembers.scss";

import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
} from "../../context/api/customersApi";

import Module from "../Module/Module";
import PaymeForm from "../paymeForm/Payment";
import Payment from "../paymeForm/Payment";

const TableMembers = () => {
  const { data, error, isLoading } = useGetCustomersQuery();
  const [payment, setPayment] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  console.log(data.innerData);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Tel</th>
            <th className="table__budget__title">Budget</th>
            <th>Pay</th>
            <th>More...</th>
          </tr>
        </thead>
        <tbody>
          {data?.innerData.map((customer) => (
            <tr key={customer._id}>
              <td>
                {customer.lname}
                {customer.fname}
              </td>
              <td>{customer.address}</td>
              <td>{customer.phone_primary || customer.phones}</td>
              <td>
                <span
                  className={`table__budget ${
                    customer.budget == 0
                      ? "table__budget__null"
                      : customer.budget < 0
                      ? "table__budget__minus"
                      : ""
                  } `}
                >
                  {customer.budget}$
                </span>
              </td>
              <td>
                <button
                  onClick={() => setPayment(customer)}
                  className="table__payment__button"
                >
                  Payment
                </button>
              </td>
              <td>
                <Link to={`/admin/customer/${customer._id}`}>
                  <button className="table__more__button">More...</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        {payment ? (
          <Module bg={"#aaa8"} close={setPayment}>
            <Payment close={setPayment} id={payment._id} />
          </Module>
        ) : (
          <></>
        )}
      </table>
    </>
  );
};

export default TableMembers;
