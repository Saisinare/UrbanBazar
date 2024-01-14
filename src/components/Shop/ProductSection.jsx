import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setProducts } from "../../redux/slice/products";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const ProductSection = (props) => {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const showToast = ()=>{
    toast.success("Product Added To The Cart");
  }
  useEffect(() => {
    let filterString = ''
    for(let fil in productsState.filters){

      if(productsState.filters[fil]!=''){
        if(filterString==''){
          filterString += '?'
        }
        else{
          filterString += '&'
        }
        filterString+=fil+'='+productsState.filters[fil]
      }
    }
    console.log(filterString)
    console.log(`${process.env.REACT_APP_BACKEND_API_URL}/products${filterString}`)
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/products${filterString}`
      )
      .then((response) => {
        dispatch(setProducts(response.data.products));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productsState.filters]);

  return (
    <div className="flex w-full flex-wrap bg-slate-200 p-2">
      {productsState &&
        productsState.products.map((product, index) => {
          return (
            <ProductCard
              index={index}
              id={product._id}
              key={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={props.title}
              showToast={showToast}
            />
          );
        })}
        <Toaster/>
    </div>
  );
};

export default ProductSection;
