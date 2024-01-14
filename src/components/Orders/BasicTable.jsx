import axios from "axios";
import React, { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";

const BasicTable = () => {
  const [orders, setorders] = useState([]);
  const [shippingDates, setshippingDates] = useState([]);
  const [reviewModalState, setreviewModalState] = useState(false);
  const [reviewModalproduct, setreviewModalproduct] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/orders`, { withCredentials: true })
      .then((res) => {
        setorders(res.data.orders);
        setshippingDates(res.data.ShippingDates);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);
  const showReview = (product) => {
    setreviewModalState(!reviewModalState);
    setreviewModalproduct(product);
    console.log(reviewModalState);
  };
  return (
    <div className=" flex flex-col gap-1 h-fit">
      {orders.map((item, index) => {
        return (
          <div className=" w-11/12 h-60 border-l-4 px-9 rounded-md bg-slate-50 flex flex-col overflow-hidden   transition-all ease-linear duration-100 ">
            <div className=" h-1/6 flex w-full  items-center font-sans">
              <div className=" rounded-full bg-green-600 h-2 w-2 mr-2"></div>
              {item.Status}
            </div>
            <div className="flex h-5/6">
              <div className=" h-full w-3/6 flex flex-wrap">
                <input type="text" value={item._id} hidden />
                <div className=" h-4/5 w-5/6 bg-slate-50 shadow-sm flex items-center justify-start px-3 rounded-lg">
                  {item.items.map((product, index) => {
                    if (index < 3) {
                      return (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_API_URL}/products/${product.product.image}`}
                          className=" h-32 rounded-2xl m-2"
                        />
                      );
                    }
                  })}
                  <div className="h-full py-10 px-5 font-semibold ">
                    {item.items.length == 1 && item.items[0].product.title}
                  </div>
                </div>
              </div>
              <div className=" w-2/5 h-full text-xl font-semibold flex flex-col justify-between pb-10 items-start">
                Will be Arrive at {shippingDates[index]}
                <div className="flex gap-2">
                  <button className=" text-sm border-green-300 hover:bg-green-300 transition-all duration-75 ease-linear border-2 rounded-md px-3  py-2">
                    View Orders Detail
                  </button>

                  {item.items.length == 1 && item.Status == "delivered" && (
                    <button
                      className=" text-sm border-green-300 hover:bg-green-300 border-2 rounded-md px-3  py-2"
                      onClick={() => {
                        showReview(item.items[0].product);
                      }}
                    >
                      Submit Review
                    </button>
                  )}
                </div>
                <div className=" text-base">
                  <button className=" text-sm hover:text-green-500   rounded-md px-2  py-1">
                    Generate invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {reviewModalState && <ReviewModal product={reviewModalproduct} />}
    </div>
  );
};

export default BasicTable;
