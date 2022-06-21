import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Form from "./Form";
import Modal from "./Modal";

function Table() {
  const {
    products,
    total,
    isShow,
    isUpdate,
    isError,
    handleToggel,
    handleChangeQuantity,
    handleRemoveProduct,
    handleTotal,
    formatPrice,
  } = useContext(AppContext);

  useEffect(() => {
    handleTotal();
  }, [products]);

  return (
    <div className="cart-component">
      <div className="cart-wrap">
        {isShow && <Form />}
        <div className="cart-info">
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>SubTotal</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products.map((el, index) => {
                  const { id, name, quantity, price } = el;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>
                        <div>{name}</div>
                      </td>
                      <td>
                        <div>
                          <input
                            value={quantity}
                            type="number"
                            onChange={(e) =>
                              handleChangeQuantity(
                                "quantity",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </div>
                      </td>
                      <td>{price}</td>
                      <td>
                        {formatPrice(el.quantity * formatPrice(el.price))}
                      </td>
                      <td>
                        {!isUpdate ? (
                          <div>
                            <AiOutlineCloseCircle
                              onClick={() => handleRemoveProduct(id)}
                            />
                          </div>
                        ) : (
                          <div>Update</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Empty</p>
          )}
          <div className="info-bottom">
            <button onClick={handleToggel}>Create Product</button>
            <div className="totle">Total: {total}</div>
          </div>
        </div>
      </div>
      {isError && <Modal />}
    </div>
  );
}

export default Table;
