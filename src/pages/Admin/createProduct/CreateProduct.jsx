import "./CreateProduct.scss";

import React, { memo, useState } from "react";

import Module from "../../../components/Module/Module";
import { useCreateProductMutation } from "../../../context/api/productApi";
import { useGetSellersBySearchQuery } from "../../../context/api/sellerApi";

const CreateProduct = ({ close }) => {
  const [value, setValue] = useState("");
  const [seller, setSeller] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    units: "",
    quantity: "",
    category: "",
    comment: "",
    sellerId: "",
  });

  const { data: searchData, isLoading } = useGetSellersBySearchQuery({
    value: value.trim(),
  });

  const [createProduct, { data, error }] = useCreateProductMutation();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ ...newProduct, sellerId: seller._id });
      console.log("Product created successfully", data);
      setSeller(null);
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <section className="choose__seller">
      <input
        onChange={(e) => setValue(e.target.value)}
        disabled={!!seller}
        value={seller ? seller.fname : value}
        type="text"
        placeholder="Seller name"
      />
      {!value.trim() ? (
        <></>
      ) : (
        <div className="sellers">
          {searchData?.innerData?.map((sellerItem) => (
            <li
              key={sellerItem?._id}
              onClick={() => {
                setSeller(sellerItem);
                setValue("");
              }}
            >
              {sellerItem?.fname}
            </li>
          ))}
        </div>
      )}
      {seller && (
        <Module close={setSeller}>
          <div className="createProduct">
            <form
              onSubmit={handleCreateProduct}
              className="create__product__form"
            >
              <input
                id="title"
                required
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="input"
                type="text"
                placeholder="Title"
              />
              <input
                id="price"
                required
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="input"
                type="number"
                placeholder="Price"
              />
              <select
                id="category"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option value="book">Book</option>
                <option value="food">Food</option>
                <option value="technical">technical</option>
              </select>
              <select
                id="units"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    units: e.target.value,
                  }))
                }
              >
                <option value="dona">Dona</option>
                <option value="kg">Kg</option>
              </select>
              <input
                id="comment"
                value={newProduct.comment}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="input"
                type="text"
                placeholder="Comment"
              />
              <input
                id="quantity"
                required
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
                className="input"
                type="number"
                placeholder="Quantity"
              />
              <button className="create-btn" id="button" type="submit">
                {isLoading ? "Creating..." : "Create"}
              </button>
            </form>
            {error && <p className="error">{error.message}</p>}
          </div>
        </Module>
      )}
    </section>
  );
};

export default memo(CreateProduct);
