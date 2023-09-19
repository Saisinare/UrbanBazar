import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setcatfil, setmaxpFil, setminpFil } from "../../redux/slice/products";

const Filter = () => {
  let categories = [
    { title: "Fashion" },
    { title: "Electronics" },
    { title: "Appliances" },
    { title: "Travel" },
    { title: "Grocery" },
  ];
  const handleRange = (e)=>{
    e.target.parentElement.querySelector('.input-fields').value = parseInt(e.target.value)*100
}
const dispatch = useDispatch()
const productsState = useSelector(state=>state.products)
const handlecatFilters = (e)=>{
  dispatch(setcatfil(e.target.innerText.toLowerCase()))
}
const handleFilter =()=>{
  dispatch(setminpFil(document.getElementById('minPrice').value))
  dispatch(setmaxpFil(document.getElementById('maxPrice').value))
}
  return (

    <>
      <div className=" h-96 w-7/12 mt-3 p-3 bg-gray-50 backdrop-blur-lg rounded-xl absolute translate-x-72 flex flex-col">
        <div className="w-full h-24  flex flex-col">
          <div className="w-full h-2/5  px-2 flex  items-center font-bold ">
            Categories
          </div>
          <div className="w-full h-3/5 flex p-1 flex-wrap gap-1">
            {categories.map((category) => {
              return (
                <div className={`${productsState.filters.category == category.title && 'border border-green-400'} w-36 h-full bg-slate-200 rounded-md flex items-center justify-center font-semibold cursor-pointer `} onClick={handlecatFilters}>
                  {category.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-24  flex flex-col">
          <div className="w-full h-2/5  px-2 flex  items-center font-bold ">
            Minimum Price ₹
          </div>
          <div className="w-full h-3/5 flex p-1 flex-wrap gap-1 justify-around">
            <input type="text" className=" h-10 w-1/6 border-slate-300 rounded-md font-semibold input-fields" id='minPrice' />
            <input type="range" className="w-4/5" onChange={handleRange} />
          </div>
        </div>
        <div className="w-full h-24  flex flex-col">
          <div className="w-full h-2/5  px-2 flex  items-center font-bold ">
            Maximum Price ₹
          </div>
          <div className="w-full h-3/5 flex p-1 flex-wrap gap-1 justify-around">
            <input type="text" className=" h-10 w-1/6 border-slate-300 rounded-md font-semibold input-fields" id="maxPrice"/>
            <input type="range" className="w-4/5" onChange={handleRange} />
          </div>
        </div>
        <div className="flex items-center justify-end">
        <button className="btn border w-fit p-2 px-5 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200 ease-linear" onClick={handleFilter}>Filter</button>
        </div>
      </div>
    </>
  );
};

export default Filter;
