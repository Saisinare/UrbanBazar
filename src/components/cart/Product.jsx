import axios from "axios";
import React from "react";

const Product = (props) => {
  const handleDelete = ()=>{
    
    axios.delete(`http://localhost:8000/api/cart/${props.product.product._id}`, { withCredentials: true }).then(response=>{
      let cartarr = props.cart
      cartarr = cartarr.filter(product=>{
        return product.product._id !== props.product.product._id 
      })
      console.log(cartarr)
      props.setcart(cartarr)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="w-full h-52 flex flex-col mb-3 shadow-md bg-white -black">

      <div className="h-3/4  flex ">
        <div className="w-1/5 flex h-full  justify-center items-center">
            <img src={`http://localhost:8000/products/${props.product.product.image}`} className=" w-full  max-w-full max-h-full" alt="" />
        </div>
        <div className="w-4/5 flex flex-col">
        <div className="w-full h-1/4 overflow-hidden text-clip flex  p-3 flex-col">
            <h1 className="text-black font-bold">{props.product.product.title}</h1>
        </div>
        <div className="w-full h-1/5  p-3">{props.product.product.price}</div>
        <div className="w-full h-1/5  p-3 ">{props.product.product.description[0]}</div>
        <div className="w-full h-1/4  p-3 ">{props.product.quantity}</div>
        </div>
      </div>
      <div className="h-1/4 w-full  flex  px-3 py-1 justify-end">
      <button
              type="button"
              class="text-gray-500 font-bold hover:text-black px-3 flex items-center  rounded-md"
            >
              Save For Later  
            </button>
      <button
              type="button"
              class="text-white font-bold hover:text-black px-3 flex items-center bg-gradient-to-r from-gray-900  to-black   rounded-md"
              onClick={handleDelete}
            >
              Remove 
            </button>
      </div>
    </div>
  );
};

export default Product;
