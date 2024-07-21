import "./TableMembers.scss";

import React, { useEffect, useState } from "react";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import {
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../context/api/customersApi";

import { Link } from "react-router-dom";
import Module from "../Module/Module";
import Pagination from "@mui/material/Pagination";
import Payment from "../paymeForm/Payment";
import { PiCoinsDuotone } from "react-icons/pi";
import Stack from "@mui/material/Stack";
import { useGetProfileQuery } from "../../context/api/AdminApi";

// import { useGetUsersQuery } from "../../context/api/userApi";

const TableMembers = () => {
  const [payment, setPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [debtFilter, setDebtFilter] = useState("2");
  const [paidToday, setPaidToday] = useState("2");
  const [createdAt, setCreatedAt] = useState("-1");
  const [budget, setBudget] = useState("0");
  const [paid, setPaid] = useState(true);
  const [pinCustom, {}] = useUpdateCustomerMutation();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { user, refetch } = useGetProfileQuery();
  const { data } = useGetCustomersQuery({
    page: page - 1,
    paidToday: paidToday,
    debt: debtFilter,
    createdAt: createdAt,
    budget: budget,
  });
  let User = user?.innerData?.user;
  console.log(User);
  const handleCreatedAtChange = (event) => {
    setCreatedAt(event.target.value);
    setPage(1);
  };
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
    setPage(1);
  };
  const handleDebtFilterChange = (event) => {
    setDebtFilter(event.target.value);
    setPage(1);
  };
  const handlePaidChange = (event) => {
    setPaidToday(event.target.value);
    setPage(1);
  };

  const handlePinClick = ({
    _id,
    lname,
    fname,
    address,
    phone_primary,
    phones,
    budget,
    pin,
  }) => {
    // const pinData = {
    //   ...customer,
    //   pin: !customer.pin,
    // };
    pinCustom({
      id: _id,
      body: {
        _id,
        lname,
        fname,
        address,
        phone_primary,
        phones,
        budget,
        pin: !pin,
      },
    });
  };

  const pageLength = Math.ceil(data?.totalCount / 10);
  return (
    <>
      <div className="table__selects">
        <select
          name="isPaid"
          id="isPaid"
          onChange={handlePaidChange}
          value={paidToday}
        >
          <option value="2">Barchasi</option>
          <option value="1">To'lov qilganlar</option>
          <option value="-1">To'lov qilmaganlar</option>
        </select>
        <select
          name="debt"
          id="debt"
          onChange={handleDebtFilterChange}
          value={debtFilter}
        >
          <option value="2">All</option>
          <option value="1">Haqdorlar</option>
          <option value="-1">Qarzdorlar</option>
          <option value="0">Nollar</option>
        </select>
        <select
          name=""
          id=""
          onChange={handleCreatedAtChange}
          value={createdAt}
        >
          <option value="1">oldest</option>
          <option value="-1">lastest</option>
        </select>
        <select name="" id="" onChange={handleBudgetChange} value={budget}>
          <option value="0">Default</option>
          <option value="1">123</option>
          <option value="-1">321</option>
        </select>
      </div>

      <table className="table">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Tel</th>
          <th className="table__budget__title">Budget</th>
          <th>Payment</th>
          <th>More...</th>
        </tr>
        <tbody>
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
                    onClick={() => setPayment({ _id })}
                    className="table__payment__button"
                    aria-label={`Make payment for ${fname} ${lname}`}
                  >
                    Payment
                  </button>
                </td>
                <td data-cell="more">
                  <Link to={`/admin/customer/${_id}`}>
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
        </tbody>
      </table>
      {payment && (
        <Module bg={"#aaa8"} close={setPayment}>
          <Payment close={setPayment} id={payment._id} />
        </Module>
      )}
      <div className="table__pagination">
        <Stack spacing={2}>
          <Pagination count={pageLength} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </>
  );
};

export default TableMembers;
