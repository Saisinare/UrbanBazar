import React from "react";

const CheckOutCard = () => {
  return (
    <div className=" sticky top-20 flex h-fit w-5/12 bg-slate-200 item-center justify-center shadow">
      <div class="flex flex-col h-auto w-full p-6  bg-white border border-gray-200 rounded-lg shadow">
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Promo Code "
            />
            <button
              type="submit"
              class="text-white absolute right-0 bottom-0 px-5 font-bold rounded-lg bg-black hover:bg-gray-800  h-full "
            >
              Apply Coupon
            </button>
          </div>
        </form>
        <div className="details w-full h-80 p-5 px-11  text-gray-800 font-semibold">
            <div className="data w-full flex justify-between">
                <div className="label">Product Cost</div>
                <div className="value">545$</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label">Delivery Charges</div>
                <div className="value">45</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label">Tax</div>
                <div className="value">12</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label font-bold text-l">Estimated Total</div>
                <div className="value">5000</div>
            </div>
        </div>
        <div className="h-16 p-5">
        <button
              type="submit"
              class="text-white  font-bold rounded-lg bg-black hover:bg-gray-800  h-12 w-full flex items-center justify-center"
            >
              Check Out
            </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
