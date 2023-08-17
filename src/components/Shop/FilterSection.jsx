import React from "react";

const FilterSection = () => {
  return (
    <div className=" h-full top-20 sticky w-52 flex flex-col   ">
      <div className="heading flex flex-col  h-fit p-3 w-full text-slate-800 text-lg font-semibold ">
        Filters
        <div className="filter flex w-8/12 my-2 h-10 bg-slate-500 rounded"></div>
      </div>
      <div className="category w-full h-auto  p-3 font-semibold text-slate-800">
        Category
        <select
          id="countries"
          class="mt-2 bg-gray-50 border-none text-gray-600 font-semibold text-sm rounded-sm block w-full p-1.5  "
        >

          <option className="" hidden>Choose Category</option>
          <option className="" value="US">Electronics</option>
          <option className="" value="CA">fashion</option>
          <option className="" value="FR">Apliances</option>
          <option className="" value="DE">grocery</option>
        </select>
      </div>
      <div className="category w-full h-auto p-3 font-semibold text-slate-800">
        Price
      <select
          id="countries"
          class="mt-2  bg-gray-100 text-gray-600 font-semibold border-none  text-sm rounded-sm block w-full p-1.5 "
        >

          <option className="" hidden>Min Price</option>
          <option className="" value="US">United States</option>
          <option className="" value="CA">Canada</option>
          <option className="" value="FR">France</option>
          <option className="" value="DE">Germany</option>
        </select>
        <select
          id="countries"
          class="mt-2  bg-gray-100 text-gray-600 font-semibold border-none  text-sm rounded-sm block w-full p-1.5 "
        >

          <option className="" hidden>Max Price</option>
          <option className="" value="US">United States</option>
          <option className="" value="CA">Canada</option>
          <option className="" value="FR">France</option>
          <option className="" value="DE">Germany</option>
        </select>
      </div>
      <div className="category w-full h-auto  p-3 font-semibold text-slate-800">
        Sort By
      <select
          id="countries"
          class="mt-2  bg-gray-100 text-gray-600 font-semibold border-none  text-sm rounded-sm block w-full p-1.5 "
        >

          <option className="" hidden>Price</option>
          <option className="" value="US">Low to High</option>
          <option className="" value="CA">High to Low</option>
        </select>
        <select
          id="countries"
          class="mt-2  bg-gray-100 text-gray-600 font-semibold border-none  text-sm rounded-sm block w-full p-1.5 "
        >

          <option className="" hidden>Name</option>
          <option className="" value="US">A-Z</option>
          <option className="" value="CA">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
