import axios from "axios";
import React from "react";

const Product = (props) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/cart/${props.product.product._id}`, {
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
  return (
    <div className="h-24 flex flex-col mb-3 justify-center w-4/5 rounded-lg overflow-hidden bg-gradient-to-tl from-slate-100 to-gray-100  border border-green-200">
      <div className="h-full  flex  backdrop-blur-lg">
        <div className="w-1/5 flex h-full  justify-center items-center">
          <img
            src={`http://localhost:8000/products/${props.product.product.image}`}
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
          <div className="w-full h-1/5  p-3 font-semibold">{props.product.product.price}</div>
          <div className="w-full h-1/4  p-3 font-semibold text-gray-600">Quantity : {props.product.quantity}</div>
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
