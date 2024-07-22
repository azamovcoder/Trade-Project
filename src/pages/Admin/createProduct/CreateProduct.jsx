import "./CreateProduct.scss";

import React, { useState } from "react";

import Module from "../../../components/Module/Module";
import { useCreateProductMutation } from "../../../context/api/productApi";
import { useGetSellersBySearchQuery } from "../../../context/api/sellerApi";

const CreateProduct = () => {
  const [value, setValue] = useState("");
  const [seller, setSeller] = useState(null);
  const { data, isError } = useGetSellersBySearchQuery({ value: value.trim() });
  const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [units, setUnits] = useState("");

  const handleCreateProduct = (e) => {
    e.preventDefault();
    let newProduct = {
      title: title,
      quantity: quantity,
      price: price,
      category: category,
      comment: comment,
      units: units,
      seller: seller._id,
    };
    createProduct(newProduct);
  };

  return (
    <div className="create__product">
      <h2>Create Product</h2>
      {seller ? (
        <div className="choosen__seller">
          <p>{seller?.fname}</p>{" "}
          <button onClick={() => setSeller(null)}>cancel</button>
        </div>
      ) : (
        <>
          <input
            className="choose__seller"
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="enter seller name"
          />
        </>
      )}
      <div className="sellers">
        {!value.trim() ? (
          <></>
        ) : isError ? (
          <p>Not found</p>
        ) : (
          data?.innerData?.map((item) => (
            <p
              onClick={() => {
                setSeller(item);
                setValue("");
              }}
              key={item._id}
            >
              {item?.fname}
            </p>
          ))
        )}
        {seller ? (
          <Module bg={"#aaa8"} close={setSeller}>
            <form
              className="create__product__form"
              onSubmit={handleCreateProduct}
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title"
              />
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="text"
                placeholder="quantity"
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="price"
              />
              <select value={units} onChange={(e) => setUnits(e.target.value)}>
                <option value="dona">dona</option>
                <option value="kg">kg</option>
                <option value="litr">litr</option>
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="book">Book</option>
                <option value="food">Food</option>
                <option value="technical">Technical</option>
              </select>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                cols="30"
                placeholder="comment"
                rows="10"
              ></textarea>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </button>
              {isSuccess && <p>Product created successfully!</p>}
            </form>
          </Module>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
