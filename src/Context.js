import React, { useState } from "react";

export const AppContext = React.createContext();

function AppProvider({ children }) {
  const data = [
    {
      id: 1,
      name: "Iphone",
      quantity: 2,
      price: "20,000,000",
    },
    {
      id: 2,
      name: "Samsung",
      quantity: 1,
      price: "2,000,000",
    },
  ];

  const [products, setProducts] = useState(data);
  const [isShow, setIsShow] = useState(false);
  const [isProduct, setIsProduct] = useState(true);
  const [isUpdate, setUpdate] = useState(false);
  const [total, setTotal] = useState(null);

  const [isError, setIsError] = useState(false);
  const [formError, setFormError] = useState({});

  // quantity < 10
  // price < 10,000,000
  // name length > 0 &&

  // handle Error Input
  const handleButtonModal = () => {
    setIsError(false);
  };

  // checkError
  const checkRequired = (arr) => {
    let error = {};
    arr.map((el) => {
      const { name, quantity, price } = el;
      if (name === "" || (name && name.length > 20)) {
        error.name = "Please enter Product Name(not empty, max length is 20)";
      }

      if (quantity === "" || +quantity === 0 || +quantity > 10) {
        error.quantity =
          "Please enter Quantity is getter than zero and max value is 10";
      }
      if (
        price === "" ||
        (formatPrice(price) <= 1000000 && formatPrice(price) >= 10000000)
      ) {
        error.price =
          "Please enter Price with value from 1,000,000 to 10,000,000";
      }
    });
    setFormError(error);
  };

  const handleErrorModal = (arr) => {
    setIsError(true);
    checkRequired(arr);
  };

  // handle toggle form
  const handleToggel = () => {
    setIsShow(!isShow);
  };

  // handle add product
  const handleAddProduct = (item) => {
    const id = Math.max.apply(
      Math,
      products.map((el) => el.id)
    );
    setProducts([...products, { ...item, id: id + 1 }]);
    setIsShow(false);
  };

  // format price total
  const formatPrice = (price) => {
    let newPrice;
    if (typeof price === "string") {
      newPrice = parseFloat(price.replace(/[^0-9-.]/g, ""));
    }
    if (typeof price === "number") {
      newPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return newPrice;
  };

  // handle change quantity
  const handleChangeQuantity = (type, value, index) => {
    const newProduct = [...products];
    const newItem = { ...products[index] };
    newItem[type] = value;
    newProduct[index] = newItem;
    setProducts(newProduct);
  };

  // handle remove product
  const handleRemoveProduct = (id) => {
    let newItem = products.filter((el) => el.id !== id);
    setProducts(newItem);
  };

  // handleTotal
  const handleTotal = () => {
    let totalProduct = products.reduce((total, el) => {
      return (total = total + formatPrice(el.price) * el.quantity);
    }, 0);
    setTotal(formatPrice(totalProduct));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        total,
        isShow,
        isProduct,
        isUpdate,
        isError,
        handleToggel,
        handleChangeQuantity,
        handleAddProduct,
        handleRemoveProduct,
        handleTotal,
        formatPrice,
        handleErrorModal,
        handleButtonModal,
        formError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
