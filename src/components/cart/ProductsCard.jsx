import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const ProductsCard = () => {
  const [cart, setcart] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/cart/products", { withCredentials: true })
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
    <div className="flex w-7/12 h-auto flex-col p-5 pl-16">
      {cart && cart.map((product) => {
        return <Product product={product} cart = {cart} setcart ={setcart} />;
      })}
    </div>
  );
};

export default ProductsCard;
