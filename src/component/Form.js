import React, { useContext, useState } from "react";
import { AppContext } from "../Context";

function Form() {
  const {
    isProduct,
    handleAddProduct,
    handleTogge,
    handleUpdateProduct,
    handleErrorModal,
  } = useContext(AppContext);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleProduct = (e) => {
    e.preventDefault();
    if (isProduct) {
      if (!name || !quantity || !price) {
        handleErrorModal([{ name }, { quantity }, { price }]);
      } else {
        handleAddProduct({ name, quantity, price });
        setName("");
        setQuantity("");
        setPrice("");
      }
    } else {
      handleUpdateProduct();
    }
  };

  return (
    <div className="form-add-edit">
      <form className="form">
        <div className="group-input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="group-input">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="group-input">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button className="create" onClick={handleProduct}>
            {isProduct ? "Create" : "Update"}
          </button>
          <button className="cancel" onClick={handleTogge}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
