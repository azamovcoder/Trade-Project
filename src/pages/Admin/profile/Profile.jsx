import "./Profile.scss";

import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../context/api/AdminApi";

import { IoCreateOutline } from "react-icons/io5";
import Module from "../../../components/Module/Module";
import { useNavigate } from "react-router-dom";

const initialState = {
  fname: "",
  lname: "",
  phone_primary: "",
  username: "",
  password: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetProfileQuery();
  const [module, setModal] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [updateProfile] = useUpdateProfileMutation();
  const user = data?.innerData?.user;
  console.log(formData);
  useEffect(() => {
    if (data) {
      setFormData({
        fname: data.innerData.fname,
        lname: data.innerData.lname,
        phone_primary: data.innerData.phone_primary,
        username: data.innerData.username,
        password: data.innerData.password,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      setModal(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setFormData({
      fname: user?.fname || "",
      lname: user?.lname || "",
      phone_primary: user?.phone_primary || "",
      username: user?.username || "",
    });
    setModal(true);
  };

  return (
    <div className="profile">
      <div className="profile__title">
        <h1>Profile</h1>
      </div>
      <div className="profile__body">
        <div className="">
          <img
            className="default__user__image"
            src="https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-user-avatar-icon-profile-silhouette-png-image_5252378.png"
            alt=""
          />
        </div>
        <ul>
          <li>
            <label htmlFor="fname">Name</label>
            <h3>{user?.fname}</h3>
          </li>
          <li>
            <label htmlFor="phone_primary">Phone Number</label>
            <h3>+{user?.phone_primary}</h3>
          </li>
          <li>
            <label htmlFor="lname">Surname</label>
            <h3>{user?.lname}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <h3>{user?.username}</h3>
          </li>
          <li>
            <label htmlFor="status">Status</label>
            <h3 className={user?.isActive ? "online" : "offline"}>
              {user?.isActive ? "Online" : "Offline"}
            </h3>
          </li>

          <li>
            <label htmlFor="edit">Edit</label>
            <button onClick={handleEdit} className="edit__button">
              <IoCreateOutline />
            </button>
          </li>
        </ul>
      </div>
      {module && (
        <Module bg={"#aaa8"} width={350} close={setModal}>
          <form className="profile__edit__form" onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
            <input
              id="phone_primary"
              name="phone_primary"
              type="text"
              value={formData.phone_primary}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <button type="submit">Edit</button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Profile;
