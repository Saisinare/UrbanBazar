import React, { useEffect } from "react";
import ProductCard from "../../Shop/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../../../redux/slice/products";
import Footer from "../../Footer";

const MyProductsPage = () => {
  const productState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8000/seller/api/products", {
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          if (response.data) {
            dispatch(setProducts(response.data.products));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  return (
    <>
      <div className="w-screen min-h-screen h-fit">
        <h1 className="h-10 w-screen flex items-center px-9 font-semibold">
          My Products
        </h1>
        <div className="flex flex-wrap p-10">
          {productState.products &&
            productState.products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  forSeller={true}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProductsPage;
