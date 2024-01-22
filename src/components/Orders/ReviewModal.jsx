import axios from "axios";
import jsCookie from "js-cookie";
import React, { useState } from "react";
const arr = [1, 2, 3, 4, 5];

const ReviewModal = (props) => {
  console.log(props.display);
  const [rate, setrate] = useState(0);
  const [review, setreview] = useState("");
  const handlRate = (value) => {
    setrate(value);
  };
  const handleReviewChange = () => {
    setreview(document.getElementById("review").value);
  };
  const [display, setdisplay] = useState(true);
  const hide = () => {
    setdisplay(!display);
  };

  const handleReviewSubmit = () => {

    let data = { productId: props.product._id, rating: rate, review: review};
    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/review?token=${jsCookie.get("token")}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      }).catch(err=>{
        console.log(err)
      });
  };
  return (
    <div
      className={` fixed top-24 left-0 p-10 pt-5 pb-24 h-screen w-screen z-50 bg-white ${
        display ? "flex" : "hidden"
      }`}
    >
      <div className=" h-full w-full bg-slate-50 p-10 flex flex-col">
        <div>
          <div className=" flex items-end ">
            <img
              src={`${process.env.REACT_APP_BACKEND_API_URL}/products/${props.product.image}`}
              className=" h-24 rounded-lg m-2"
            />
            <div className="pt-3 font-semibold text-xl mb-3">
              {props.product.title}
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <div>
              <div className=" text-base font-semibold mb-4">
                Rate the product
              </div>
              <div className=" h-9 flex ">
                {arr.map((star, index) => {
                  return (
                    <img
                      className=" h-7 mr-3"
                      src={`${process.env.REACT_APP_BACKEND_API_URL}/icons/${
                        index < rate ? "fillstar" : "emptystar"
                      }.png`}
                      onClick={() => {
                        handlRate(star);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" text-base font-semibold mb-4 ">Write a Review</div>
          <div>
            {" "}
            <textArea
              className=" h-52 w-full border-none shadow rounded-lg p-5 text-sm font-semibold"
              onChange={handleReviewChange}
              id="review"
            ></textArea>
          </div>
          <div className="text-sm float-right flex gap-3">
            <button
              className="h-fit w-fit p-2 px-10 rounded-md font-semibold border-red-500 transition-all duration-100  hover:bg-red-500 border text-red-500 shadow hover:text-black"
              onClick={hide}
            >
              cancel
            </button>
            <button
              onClick={handleReviewSubmit}
              className="h-fit w-fit p-2 px-10 rounded-md font-semibold bg-green-500 hover:bg-green-400 shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
