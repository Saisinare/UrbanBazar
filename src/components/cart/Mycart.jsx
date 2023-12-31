import React from "react";
import CheckOutCard from "./CheckOutCard";
import ProductsCard from "./ProductsCard";


const Mycart = () => {
  return (
    <div className="flex w-11/12 h-screen">
        <ProductsCard/>
        <CheckOutCard/>
    </div>
  );
};

export default Mycart;
