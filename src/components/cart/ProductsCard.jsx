import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import jsCookie from "js-cookie";

const ProductsCard = () => {
  const [cart, setcart] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/cart/products?token=${jsCookie.get("token")}`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setcart(response.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex w-full md:w-7/12 h-auto flex-col px-3 md:p-5 md:pl-16 ">
      {cart && cart.map((product) => {
        return <Product product={product} cart = {cart} setcart ={setcart} />;
      })}
    </div>
  );
};

export default ProductsCard;
