import "./Payment.scss";

import React, { useEffect, useState } from "react";

import { useCreatePaymetMutation } from "../../context/api/paymetApi";

const Payment = ({ id, close }) => {
  console.log(id);
  let initialState = {
    customerId: id,
    amount: "",
    comment: "",
  };

  const [payme, setPayme] = useState(initialState);
  const [paymeCreate, { data, isLoading, isSuccess }] =
    useCreatePaymetMutation(id);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setPayme((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paymeCreate(payme);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <div className="payme">
      <h2>Payme Create</h2>
      <form className="payme__form" onSubmit={handleSubmit} action="">
        <input
          placeholder="amount"
          value={payme.amount}
          name="amount"
          onChange={handleChange}
          type="number"
        />

        <textarea
          placeholder="comment"
          onChange={handleChange}
          value={payme.comment}
          name="comment"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>{isLoading ? "Loading..." : "Save"}</button>
      </form>
    </div>
  );
};

export default Payment;
