import axios from "axios";
import React, { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import { Dialog, Slide } from "@mui/material";
import jsCookie from "js-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BasicTable = () => {
  const handleInvoice = (id) => {
    axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_API_URL
        }/orders/invoice/${id}?token=${jsCookie.get("token")}`,
        {
          withCredentials: true,
          responseType: "arraybuffer", // Use 'arraybuffer' instead of 'Blob'
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [orders, setorders] = useState([]);
  const [shippingDates, setshippingDates] = useState([]);
  const [reviewModalState, setreviewModalState] = useState(false);
  const [reviewModalproduct, setreviewModalproduct] = useState();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/orders?token=${jsCookie.get(
          "token"
        )}`,
        {
          withCredentials: true,
        }
      )
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

  const [open, setOpen] = React.useState(false);
  const [currentOrder, setcurrentOrder] = useState({});

  const handleClickOpen = (item) => {
    setcurrentOrder(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [currentOrder]);
  return (
    <div className=" flex flex-col gap-1 h-fit">
      {orders.map((item, index) => {
        return (
          <div className=" w-full ms:w-11/12 h-fit md:h-60 border-l-4 px-9 rounded-md bg-slate-50 flex flex-col overflow-hidden   transition-all ease-linear duration-100 ">
            <div className=" h-1/6 flex w-full  items-center font-sans">
              <div className=" rounded-full bg-green-600 h-2 w-2 mr-2"></div>
              {item.Status}
            </div>
            <div className="flex h-5/6 flex-col md:flex-row">
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
                  <div className="h-full py-10 px-5 font-semibold flex ">
                    {item.items.length == 1 && item.items[0].product.title}
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-2/5 h-full text-sm md:text-xl font-semibold flex flex-col justify-between pb-10 items-start">
                Will be Arrive at {shippingDates[index]}
                <div className="flex gap-2">
                  <React.Fragment>
                    <Dialog
                      fullScreen
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                    >
                      <div className=" w-full flex justify-between items-center px-3  p-2 pl-8 backdrop-blur-lg opacity-95 border-b sticky top-0 bg-white">
                        <h1 className=" font-bold">
                          Order Id #{currentOrder != {} && currentOrder._id}
                        </h1>
                        <button
                          onClick={handleClose}
                          className=" text-2xl font-bold font-sans"
                        >
                          X
                        </button>
                      </div>
                      <div className="h-fit p-5 px-8 border-b">
                        <h1 className=" font-bold text-xl">Order Items</h1>
                        <div className=" flex w-full  flex-row flex-wrap gap-5">
                          {currentOrder.items &&
                            currentOrder.items.map((item) => {
                              return (
                                <div className=" w-full  md:w-1/3 h-36 border-b border-t flex">
                                  <img
                                    src={`${process.env.REACT_APP_BACKEND_API_URL}/products/${item.product.image}`}
                                    alt=""
                                    className=" h-36"
                                  />
                                  <div className=" text-sm font-semibold p-3">
                                    <div className=" font-bold text-lg">
                                      {item.product.title}
                                    </div>
                                    <div className=" mt-3">
                                      Per Product {item.product.price} Rs
                                    </div>
                                    <div>{item.quantity} Quantities</div>
                                    <div>{item.amountTotal} Rs</div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className=" h-fit p-5 px-8 ">
                        <h1 className=" font-bold text-xl">Order Status</h1>

                        <div className=" w-full h-fit md:h-44  mt-5 flex flex-col-reverse md:flex-row pr-10">
                          <div className=" w-full h-full hidden md:flex items-center justify-center flex-col ">
                            <img
                              src={`${process.env.REACT_APP_BACKEND_API_URL}/icons/shipped.png`}
                              alt="Done"
                              className=" w-28 md:h-32"
                            />
                            <h1 className=" font-bold"> Delivered </h1>
                          </div>
                          <div className=" w-3/4 border-t border-b h-full p-5">
                            <h1 className=" font-bold"> Order Summary </h1>
                            <div className=" flex flex-col font-semibold text-sm mt-3  gap-1">
                              <div className=" flex justify-between">
                                <p>Ordered Date</p>
                                <p>{item.orderDate.split("T")[0]}</p>
                              </div>
                              <div className=" flex justify-between">
                                <p>Delivery Date</p>
                                <p>{item.ShipppingDate.split("T")[0]}</p>
                              </div>
                              <div className=" flex justify-between">
                                <p>Total Amount</p>
                                <p>{currentOrder.totalAmount} Rs</p>
                              </div>
                              <div className=" flex justify-between">
                                <p>Status</p>
                                <p>{currentOrder.Status} </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className=" w-full flex justify-end p-10">
                          <div
                            className=" font-semibold text-sm cursor-pointer hover:text-green-600"
                            onClick={() => {
                              currentOrder != {} &&
                                handleInvoice(currentOrder._id);
                            }}
                          >
                            Generate Invoice
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </React.Fragment>
                </div>
                <div className=" text-sm w-full flex justify-between md:justify-start mt-4 ">
                  <button
                    className=" text-sm border-none  w-fit  hover:text-green-600 transition-all duration-75 ease-linear rounded-md md:px-3  md:py-2"
                    onClick={() => {
                      handleClickOpen(item);
                    }}
                  >
                    View Detail
                  </button>

                  <button
                    className=" text-sm hover:text-green-500   rounded-md md:px-2  md:py-1"
                    onClick={() => {
                      handleInvoice(item._id);
                    }}
                  >
                    Generate invoice
                  </button>
                </div>
                {item.items.length == 1 && item.Status == "delivered" && (
                  <div className=" w-full flex justify-end">
                    <button
                      className=" text-sm rounded-md px-3 py-2 hover:text-green-600"
                      onClick={() => {
                        showReview(item.items[0].product);
                      }}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
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
