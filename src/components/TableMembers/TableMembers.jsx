import "./TableMembers.scss";

import React, { useState } from "react";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import Module from "../Module/Module";
import Pagination from "@mui/material/Pagination";
import Payment from "../paymeForm/Payment";
import Stack from "@mui/material/Stack";
import { useGetCustomersQuery } from "../../context/api/customersApi";

const TableMembers = () => {
  const [payment, setPayment] = useState(false);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data } = useGetCustomersQuery({ page: page - 1 });
  let pageLength = Math.ceil(data?.totalCount / 10);
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
                <td className="table__td">
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
                    {pin ? <RiPushpinFill /> : <RiPushpinLine />}
                  </button>
                  {lname} {fname}
                </td>
                <td>{address}</td>
                <td>{phone_primary || phones}</td>
                <td>
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
                <td>
                  <button
                    onClick={() => setPayment({ _id })}
                    className="table__payment__button"
                    aria-label={`Make payment for ${fname} ${lname}`}
                  >
                    Payment
                  </button>
                </td>
                <td>
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
