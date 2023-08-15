import React from "react";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <>
      <div className=" h-fit p-1 w-1/4 flex hover:p-0 transition-all ease-in-out duration-500 overflow-hidden ">
        <Link>
          <div className=" h-full w-full bg-white rounded-xl overflow-hidden border shadow pb-3 ">
            <div className="pro-img w-full flex h-72 bg-slate-400  overflow-hidden">
              <img src="img/home/shoe.jpg" className="h-fit" alt="shoes" />
            </div>
            <div className=" h-8 w-full text-black font-semibold p-2 text-lg">
              Nike
            </div>
            <div className=" h-10 w-full text-black font-semibold mb-3 p-2 text-2xl">
              2250 &#8377;
            </div>
            <div className="w-full justify-center flex items-center ">
              <button className="btn btn-sm h-9 mb-1 w-11/12 rounded-xl bg-green-900 text-gray-100 hover:bg-gray-900 transition-all duration-300 ease-in-out font-semibold text-sm ">
                Buy Now
              </button>
            </div>
            <div className="w-full justify-center flex items-center ">
              <button className="btn btn-sm py-1 w-11/12 rounded-xl border-2 border-black text-black bg-transparent hover:text-white hover:bg-gray-900 transition-all duration-500 ease-in-out font-semibold text-sm">
                Add To Cart
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
