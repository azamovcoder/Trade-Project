import "./Create.scss";

import React, { useState } from "react";

import { useCreateCustomerMutation } from "../../../context/api/customersApi";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const [createCustomer] = useCreateCustomerMutation();

  const handleCreate = async (e) => {
    e.preventDefault();
    let newCustomer = {
      fname: fname,
      lname: lname,
      phone_primary: phoneNumber,
      address: address,
      budget: budget,
    };

    await createCustomer(newCustomer);
    navigate("/admin/customers");

    setFname("");
    setLname("");
    setPhoneNumber("");
    setAddress("");
    setBudget("");
  };
  return (
    <div>
      <form onSubmit={handleCreate} className="create__form">
        <input
          required
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          type="text"
          placeholder=" fname"
        />

        <input
          required
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          type="text"
          placeholder=" lname"
        />
        <input
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          placeholder=" phonenumber"
        />
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder=" address"
        />
        <input
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="text"
          placeholder=" budget"
        />

        <button>Add</button>
      </form>
    </div>
  );
};

export default Create;
