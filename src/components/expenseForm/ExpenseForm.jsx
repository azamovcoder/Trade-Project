import "./ExpenseForm.scss";

import React, { useEffect, useState } from "react";

import { useCreateExpenseMutation } from "../../context/api/expenseApi";

const ExpenseForm = ({ id, close }) => {
  console.log(id);
  let initialState = {
    sellerId: id,
    amount: "",
    comment: "",
  };

  const [expense, setExpense] = useState(initialState);
  const [expenseCreate, { data, isLoading, isSuccess }] =
    useCreateExpenseMutation(id);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    expenseCreate(expense);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <div className="payme">
      <h2>Expense Create</h2>
      <form className="payme__form" onSubmit={handleSubmit} action="">
        <input
          placeholder="amount"
          value={expense.amount}
          name="amount"
          onChange={handleChange}
          type="number"
        />

        <textarea
          placeholder="comment"
          onChange={handleChange}
          value={expense.comment}
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

export default ExpenseForm;
