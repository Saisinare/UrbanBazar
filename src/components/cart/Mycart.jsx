import React from "react";
import CheckOutCard from "./CheckOutCard";
import ProductsCard from "./ProductsCard";


const Mycart = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-11/12  h-screen ">
        <ProductsCard/>
        <CheckOutCard/>
    </div>
  );
};

export default Mycart;
