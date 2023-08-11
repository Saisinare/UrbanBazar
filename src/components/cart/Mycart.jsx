import React from "react";
import CheckOutCard from "./CheckOutCard";
import ProductsCard from "./ProductsCard";


const Mycart = () => {
  return (
    <div className="flex">
        <ProductsCard/>
        <CheckOutCard/>
    </div>
  );
};

export default Mycart;
