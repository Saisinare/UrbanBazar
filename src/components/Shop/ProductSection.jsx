import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductSection = (props) => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    // const category = props.title.toLowerCase();
    // axios.get(`http://localhost:8000/products?category=${category}`)
    axios
      .get(`http://localhost:8000/products`)
      .then((response) => {
        const productArr = [];

        for (const key in response.data.products) {
          if (response.data.products.hasOwnProperty(key)) {
            productArr.push(response.data.products[key]);
          }
        }
        setproducts(productArr);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex w-full flex-wrap bg-slate-200 p-2">
      {products.map((product,index) => {
        return (
          <ProductCard
            index = {index}
            id={product._id}
            key={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            category={props.title}
          />
        );
      })}
    </div>
  );
};

export default ProductSection;
