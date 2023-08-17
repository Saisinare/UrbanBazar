import React, { useEffect, useState } from "react";

import ProductCard from "../ProductStore/ProductCard";
import axios from "axios";

const BestOfCard = (props) => {
  
  const  [products, setproducts] = useState([])

  useEffect(() => {
    const category = props.title.toLowerCase()
    axios.get(`http://localhost:8000/products?category=${category}&limit=5`)
      .then(response => {

          const productArr = [];

          for (const key in response.data.products) {
            if (response.data.products.hasOwnProperty(key)) {
              productArr.push(
                response.data.products[key]
              );
            }
          }
          setproducts(productArr);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[])

  return (
    <>
      <div class={`w-full p-2  h-16 flex justify-start items-center pl-4 `}>
        <h1 className="font-semibold font-sans text-2xl text-black ">
          Best Of {props.title}
        </h1>
      </div>
      <div class="w-full p-2 mb-2 h-auto flex justify-center ">
          {
            products.map(product=>{
              return <ProductCard key={product._id} id={product._id} title ={product.title} price={product.price} image={product.image} category={props.title} />
            })
          }
        
      </div>
    </>
  );
};

export default BestOfCard;
