import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {

  const handleAddCart = ()=>{
    axios.post(`http://localhost:8000/cart/add/${props.id}`,{},{withCredentials:true}).then(response=>{
      console.log(response)
    }).catch(err=>{
      console.log(err)
    })
  }
  const hadleDelete = ()=>{
    axios.delete(`http://localhost:8000/seller/api/product/${props.id}`,{withCredentials:true}).then(response=>{
      console.log(response)
    }).catch(err=>{
      console.log(err)
    })
  }

  const handleBuy = ()=>{

    axios.get(`http://localhost:8000/buy/${props.id}`,{withCredentials:true})
    .then(res=>{
      if(res.data && res.data.session_id){
        Cookies.set('chekoutsessionId',res.data.session_id)
        return res
      }
    }).then(res=>{
      console.log(res.data.url)
      window.location.href = res.data.url;
   }).catch(err=>{
     console.log(err)
   })
  }

  const handleEdit = ()=>{
    console.log("Edit Clicked")
  }

  return (
    <>

      <div className={`h-fit p-1 w-1/5 flex  transition-all ease-in-out duration-500 overflow-hidden `}>
        <div className="rounded-xl bg-cover bg-no-repeat " style={{backgroundImage:`url("http://localhost:8000/products/${props.image}")`}} >
          <div className=" h-full w-full  rounded-xl overflow-hidden border shadow pb-3 bg-white/80  backdrop-blur-md  ">
        <Link to={!props.forSeller && `/product/${props.id}`} state={{id:props.id}}>
            <div className="pro-img w-full flex h-72   overflow-hidden ">
              <img src={`http://localhost:8000/products/${props.image}`} className="h-fit hover:scale-105 transition-all duration-500 ease-in-out hover:rotate-1" alt="shoes" />
            </div>
            <div className=" h-8 w-full text-black font-semibold p-2 text-lg">
              {props.title}
            </div>
            <div className=" h-10 w-full text-black font-semibold mb-3 p-2 text-2xl">
              {props.price} &#8377;
            </div>

              </Link>
            <Link to={"/seller/editProduct"} state={{id:props.id}}>
            <div className="w-full justify-center flex items-center ">
              <button className="btn btn-sm h-9 mb-1 w-11/12 rounded-xl bg-green-500 text-gray-500 hover:bg-gray-900 transition-all duration-300 ease-in-out font-semibold text-sm " onClick={(!props.forSeller)?handleBuy:handleEdit}>
                {(props.forSeller)?'Edit':'Buy Now'}
              </button>
            </div>
            </Link>

            <div className="w-full justify-center flex items-center ">
              <button onClick={(!props.forSeller) ? handleAddCart : hadleDelete} className={`btn btn-sm py-1 w-11/12 rounded-xl border border-gray-400  bg-transparent hover:text-white hover:bg-gray-900 transition-all duration-500 ease-in-out font-semibold text-sm`}>
                {(props.forSeller)?'Delete':'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
