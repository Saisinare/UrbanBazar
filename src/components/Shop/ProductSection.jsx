import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setProducts } from "../../redux/slice/products";
import { useDispatch, useSelector } from "react-redux";

const ProductSection = (props) => {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/products${
          location.state
            ? location.state.category && `?category=${location.state.category}`
            : ""
        }`
      )
      .then((response) => {
        dispatch(setProducts(response.data.products));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex w-full flex-wrap bg-slate-200 p-2">
      {productsState && 
            productsState.products.map((product, index) => {
              return (
                (
                  <ProductCard
                    index={index}
                    id={product._id}
                    key={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={props.title}
                  />
                )
              );
            })
      }

    </div>
  );
};

export default ProductSection;
