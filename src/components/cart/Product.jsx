import axios from "axios";
import jsCookie from "js-cookie";
import React, { useState } from "react";

const Product = (props) => {
  const [qt, setqt] = useState(props.product.quantity);
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API_URL}/api/cart/${props.product.product._id}?token=${jsCookie.get("token")}`, {
        withCredentials: true,
      })
      .then((response) => {
        let cartarr = props.cart;
        cartarr = cartarr.filter((product) => {
          return product.product._id !== props.product.product._id;
        });
        console.log(cartarr);
        props.setcart(cartarr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButtonChange = (val) => {
    setqt(qt + val);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/item/changeQuantity?token=${jsCookie.get("token")}`,
        { productId: props.product.product._id, qt: val },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const handleChange = (val) => {
    if (isNaN(val)) {
    setqt(0)
    }
    else{
      setqt(val);
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_API_URL}/cart/item/changeQuantity?token=${jsCookie.get("token")}`,
          { productId: props.product.product._id, qt: val },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
        });
      }
  };
  return (
    <div className="h-24 flex flex-col mb-3 justify-center w-full md:w-4/5 rounded-lg overflow-hidden bg-gradient-to-tl from-slate-100 to-gray-100  border border-green-300">
      <div className="h-full  flex  backdrop-blur-lg">
        <div className="w-1/5 flex h-full  justify-center items-center">
          <img
            src={`${process.env.REACT_APP_BACKEND_API_URL}/products/${props.product.product.image}`}
            className=" h-full "
            alt=""
          />
        </div>
        <div className="w-4/5 flex flex-col">
          <div className="w-full h-1/4  flex p-3 flex-col">
            <h1 className="text-black font-semibold">
              {props.product.product.title}
            </h1>
          </div>
          <div className="w-full h-1/5  p-3 font-semibold">
            {props.product.product.price}
          </div>
          <div className="w-full h-1/4  p-3 font-semibold ">
            Quantity :{" "}
            <button
              className=" cursor-pointer"
              onClick={() => {
                handleButtonChange(-1);
              }}
              >
              -
            </button>
            <input
              type="text"
              className=" border-0  h-5 w-10 text-center bg-transparent"
              value={qt}
              onChange={(e) => {
                handleChange(parseInt(e.target.value));
              }}
            />
            <buttons
                className=" cursor-pointer"
              onClick={() => {
                handleButtonChange(1);
              }}
            >
              +
            </buttons>
          </div>
        </div>
        <div className="h-full w-1/4  flex  px-3 py-1 justify-end items-end">
          <button
            type="button"
            class=" font-semibold text-sm px-3 py-1 flex items-center  rounded-lg border border-green-500 text-gray-600"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
