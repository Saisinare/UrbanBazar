import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer";

const ProductPage = () => {
  const [product, setproduct] = useState();
  const location = useLocation();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${location.state.id}`)
      .then((response) => {
        if (response.data) {
          if (response.data.products) {
            setproduct(response.data.products);
            console.log();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(product);
  }, []);
  return (
    <>
      <div
        className="rounded-xl bg-cover bg-no-repeat "
      >
        <div className="flex h-fit w-screen p-10  font-sans bg-white/70 backdrop-blur-2xl justify-center items-center ">
          <div className="image-section h-96  flex items-center w-fit">
            <img
              src={`${
                product && `http://localhost:8000/products/${product.image}`
              }`}
              className=" h-full rounded"
              alt=""
            />
          </div>
          <div className="detail-section w-3/4 pt-0 p-10">
            <h1 className="font-bold font-sans text-5xl">{`${
              product && `${product.title}`
            }`}</h1>
            <p className="text-sm font-semibold py-1 pt-2 text-gray-600">
              <i className="fa fa-star text-yellow-500"></i>
              {product && product.review != 0 ? "review" : " No Rating Yet"}
            </p>
            <p className=" font-semibold text-3xl font-sans">
              {" "}
              ₹ {`${product && `${parseInt(product.price)} `}`}
            </p>
            <div className=" mt-10 min-w-fit w-5/6 pr-5 border-2 border-gray-400 rounded py-5 ">
              <h1 className="font-bold text-md px-5 py-2">Key Features</h1>
            <ul className="pl-10">
              {product &&
                product.description.map((keypoint, index) => {
                  return (
                    <li key={index} className=" text-gray-500 list-disc font-semibold">
                      {keypoint}
                    </li>
                  );
                })}
            </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <div className="foot w-screen h-20 bg-slate-100/50 backdrop-blur-lg sticky bottom-0 flex justify-between items-center px-24 pr-44 ">
        <div className="w-2/3 h-full text-black font-sans font-semibold p-3 flex items-center ">
          <img
            src={`${
              product && `http://localhost:8000/products/${product.image}`
            }`}
            className=" h-full"
            alt=""
          />
          <div className="flex flex-col px-5">
            <p>{`${product && `${product.title}`}`}</p>
            <p>{`${product && product.price}`} ₹ </p>
          </div>
        </div>
        <div className="flex">
          <Link to='/purchase/:productId'>
          <button className="btn bg-gray-200 border border-black p-2 px-6 flex items-center font-semibold font-sans text-sm rounded-md mx-2">
            Add To Cart
          </button>
          </Link>
          <Link to={`/purchase/${ product && `${product._id}`}`} state={`${ product && `${product._id}`}`}>
          <button className="btn bg-green-500 p-2 px-6 flex items-center font-semibold font-sans text-sm rounded-md text-gray-700">
            Buy Now
          </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
