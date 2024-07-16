import "./TableMembers.scss";

import {
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
} from "../../context/api/customersApi";

import React from "react";
import { useParams } from "react-router-dom";

const TableMembers = () => {
  const { data, error, isLoading } = useGetCustomersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  console.log(data.innerData);

  // const { Id } = useParams();
  // const { data: product } = useGetCustomerByIdQuery(Id);
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
                <button className="table__payment__button">Payment</button>
              </td>
              <td>
                <button className="table__more__button">More...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableMembers;
