import React from "react";
import Product from "./Product";

const ProductsCard = () => {
  return (
    <div className="flex w-7/12 h-auto flex-col p-5 ">
      <Product/>
      <Product/>
      <Product/>
    </div>
  );
};

export default ProductsCard;
