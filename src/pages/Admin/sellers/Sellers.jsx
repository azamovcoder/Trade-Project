import "./Sellers.scss";

import React, { useState } from "react";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";

import ExpenseForm from "../../../components/expenseForm/ExpenseForm";
import { Link } from "react-router-dom";
import Module from "../../../components/Module/Module";
import { useGetSellersQuery } from "../../../context/api/sellerApi";

const Sellers = () => {
  const [expense, setExpense] = useState(false);
  const { data } = useGetSellersQuery();
  console.log(data?.innerData);
  return (
    <div>
      <table className="table">
        <tr>
          <th>name</th>
          <th>address</th>
          <th>tel</th>
          <th>budget</th>
          <th>Payment</th>
          <th>more</th>
        </tr>

        {data?.innerData.map(
          ({
            _id,
            lname,
            fname,
            address,
            phone_primary,
            phones,
            budget,
            pin,
          }) => (
            <tr className="table__tr" key={_id}>
              <td data-cell="name" className="table__td">
                <button
                  onClick={() =>
                    handlePinClick({
                      _id,
                      lname,
                      fname,
                      address,
                      phone_primary,
                      phones,
                      budget,
                      pin,
                    })
                  }
                  className="pin__button"
                  aria-label={`Pin ${fname} ${lname}`}
                >
                  {pin ? (
                    <RiPushpinFill color="blue" />
                  ) : (
                    <RiPushpinLine color="blue" />
                  )}
                </button>
                {lname} {fname}
              </td>
              <td data-cell="address">{address}</td>
              <td data-cell="tel">{phone_primary || phones}</td>
              <td data-cell="budget">
                <span
                  className={`table__budget ${
                    budget === 0
                      ? "table__budget__null"
                      : budget < 0
                      ? "table__budget__minus"
                      : ""
                  }`}
                >
                  {budget}$
                </span>
              </td>
              <td data-cell="payment">
                <button
                  onClick={() => setExpense({ _id })}
                  className="table__payment__button"
                  aria-label={`Make payment for ${fname} ${lname}`}
                >
                  Expense
                </button>
              </td>
              <td data-cell="more">
                <Link to={`/admin/seller/${_id}`}>
                  <button
                    className="table__more__button"
                    aria-label={`More details about ${fname} ${lname}`}
                  >
                    More...
                  </button>
                </Link>
              </td>
            </tr>
          )
        )}
      </table>

      {expense && (
        <Module bg={"#aaa8"} close={setExpense}>
          <ExpenseForm close={setExpense} id={expense._id} />
        </Module>
      )}
    </div>
  );
};

export default Sellers;
