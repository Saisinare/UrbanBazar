import React from "react";
import { Link } from "react-router-dom";
import { setFilters, setcatfil } from "../../redux/slice/products";
import { useDispatch, useSelector } from "react-redux";

const Category = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const updateFilter = (e) => {
    dispatch(setcatfil(e.target.innerText.toLowerCase()))
  };
  return (
    <div
      className="flex flex-col md:w-64  md:h-auto   sm:w-10 transition-all p-1 "
      onClick={updateFilter}
    >
      <Link
        to={`/shop/${props.title.toLowerCase()}`}
        state={{ category: props.title.toLowerCase() }}
      >
        <div
          class=" transition-all duration-500 ease-in-out bg-transparent backgroud bg-top cursor-pointer bg-no-repeat md:bg-cover sm:bg-contain bg-none hover:bg-left flex sm:h-10 md:h-60   hover:scale-105  p-3 rounded-xl bg-gray-800 md:mx-2 text-white items-start justify-center "
          style={{ backgroundImage: props.imgurl }}
        >
          <h1 className="text-black font-sans  font-semibold text-base md:text-xl  ">
            {props.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Category;
