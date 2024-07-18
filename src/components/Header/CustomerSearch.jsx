import "./Header.scss";

import React from "react";
import { useGetCustomersBySearchQuery } from "../../context/api/customersApi";

const CustomerSearch = ({ search }) => {
  let { data, isError } = useGetCustomersBySearchQuery({ value: search });
  console.log(data);
  return (
    <>
      {isError ? (
        <div className="customer__search">Not found</div>
      ) : (
        <div className="customer__search">
          {data?.innerData?.map((el) => (
            <div className="customer__search__frame">
              <p>
                {el.fname} {el.lname}
              </p>{" "}
              <p>{el.phone_primary}</p>
              <p>{el.budget}$</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomerSearch;
