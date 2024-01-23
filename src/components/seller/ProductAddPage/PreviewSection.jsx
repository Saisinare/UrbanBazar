import React, { useEffect } from "react";


const PreviewSection = (props) => {
  useEffect(()=>{
    console.log(props.preimage)
  },[])
  return (
    <div className=" w-full md:w-1/3 h-fit  flex items-center py-3 pb-10 rounded-lg justify-center flex-col bg-gray-200 md:top-24 bottom-30 md:sticky transition-all duration-300 ease-in-out">
      <h1 className="text-xl font-semibold pb-5">Card Preview </h1>
      <div className=" h- p-1  w-3/4 flex hover:p-0 transition-all ease-in-out duration-500 overflow-hidden ">
        <div className=" h-full w-full bg-white rounded-xl overflow-hidden  pb-3 ">
          <div className="pro-img  w-full flex items-center justify-center h-72 overflow-hidden">
            <img src={props.preimage} alt="img" />
          </div>
          <div className=" h-8 w-full text-black font-semibold p-2 text-lg">
            {props.title}
          </div>
          <div className=" h-10 w-full text-black font-semibold mb-3 p-2 text-2xl">
            {props.price} &#8377;
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
      </div>
    </div>
  );
};

export default PreviewSection;
