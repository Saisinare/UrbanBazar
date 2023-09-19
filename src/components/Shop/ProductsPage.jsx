import React, { useEffect } from "react";
import ProductSection from "./ProductSection";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer";
import { clearfil } from "../../redux/slice/products";
import { useLocation } from "react-router-dom";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let userState = useSelector((state) => state.user);
  useEffect(() => {
    if (location.pathname == "/shop") dispatch(clearfil());
  });
  return (
    <>
      <div className="flex h-full bg-white">
        <ProductSection />
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
