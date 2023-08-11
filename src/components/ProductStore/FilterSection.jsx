import React from "react";

const FilterSection = () => {
  return (
    <div className=" h-full top-20 sticky w-52 flex flex-col  shadow ">
      <div className="heading flex flex-col  h-fit p-3 w-full text-slate-800 text-lg font-semibold ">
        Filters
        <div className="filter flex w-8/12 my-2 h-10 bg-slate-500 rounded"></div>
      </div>
      <div className="category w-full h-auto border p-3 font-semibold text-slate-800">
        Category
        <select
          id="countries"
          class="mt-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >

          <option selected>Choose a Category</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className="category w-full h-auto border p-3 font-semibold text-slate-800">
        Price
      <select
          id="countries"
          class="mt-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >

          <option selected>Min Price</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          class="mt-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >

          <option selected>Max Price</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className="category w-full h-auto border p-3 font-semibold text-slate-800">
        Sort By
      <select
          id="countries"
          class="mt-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >

          <option selected>Price</option>
          <option value="US">Low to High</option>
          <option value="CA">High to Low</option>
        </select>
        <select
          id="countries"
          class="mt-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >

          <option selected>Name</option>
          <option value="US">A-Z</option>
          <option value="CA">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
