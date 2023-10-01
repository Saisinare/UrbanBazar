import axios from "axios";
import React, { useEffect, useState } from "react";

const BasicTable = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders", { withCredentials: true })
      .then((res) => {
        setorders(res.data.orders);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);

  return (
    <div className=" flex flex-col gap-1">
      <div className=" w-full h-12 bg-gray-200 flex  overflow-hidden rounded-sm">
        <div className="w-1/6 h-full flex font-semibold items-center pl-2 text-sm">
          Ordered Date
        </div>
        <div className="w-1/6 h-full flex font-semibold items-center pl-2 text-sm">
          Type
        </div>
        <div className="w-1/6 h-full flex font-semibold items-center pl-2 text-sm">
          Status
        </div>
        <div className="w-1/6 h-full flex font-semibold items-center pl-2 text-sm">
          Payment Status
        </div>
        <div className="w-1/6 h-full flex font-semibold items-center pl-2 text-sm">
          Order Items
        </div>
        <div className="w-1/6 h-full flex font-semibold items-center justify-center text-sm">
          Amount
        </div>
      </div>
      {orders.map((item) => {
        return (
          <div className=" w-full h-12 bg-slate-100 flex  overflow-hidden rounded-sm hover:bg-slate-200 transition-all ease-linear duration-100 cursor-pointer">
            <input type="text" value={item._id} hidden />
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-center pl-2 text-sm">
              {item.orderDate}
            </div>
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-center pl-2 text-sm">
              cart
            </div>
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-center pl-2 text-sm">
              {item.Status}
            </div>
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-center pl-2 text-sm">
              {item.paymentStatus}
            </div>
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-start pl-2 text-sm overflow-hidden">
              {item.items.map((product, index) => {
                if (index <= 1) return product.product.title + ", ";
              })}
            </div>
            <div className="w-1/6 h-full flex font-semibold text-slate-600 items-center justify-center pl-2 text-sm">
              ₹{item.totalAmount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BasicTable;
