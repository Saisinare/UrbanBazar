import React, { useEffect } from "react";
import ProductSection from "./ProductSection";
import { useSelector } from "react-redux";
import Footer from "../Footer";
const ProductsPage = () => {
  let userState = useSelector(state=>state.user)
  useEffect(()=>{
    console.log(userState)
  })
  return (
    <>
    <div className="flex h-full bg-white">
        <ProductSection/>
    </div>
    <Footer/>
    </>
  );
};

export default ProductsPage;
