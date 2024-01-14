import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ProgressBar from "react-bootstrap/ProgressBar";

const ProductPage = () => {
  let stars = [1, 2, 3, 4, 5];
  let summ = ["Excellent", "Best", "Ok", "Bad", "Very Bad"];
  summ = summ.reverse()
  const [detail, setdetail] = useState(false);
  const handleAddCart = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/add/${location.state.id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [product, setproduct] = useState();

  const location = useLocation();

  const handleBuy = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/buy/${location.state.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && res.data.session_id) {
          Cookies.set("chekoutsessionId", res.data.session_id);
          return res;
        }
      })
      .then((res) => {
        console.log(res.data.url);
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDetail = () => {
    setdetail(!detail);
  };
  const [reviews, setreviews] = useState([]);
  const [ratingStats, setratingStats] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/product/${location.state.id}`)
      .then((response) => {
        if (response.data) {
          if (response.data.products) {
            setproduct(response.data.products);
            console.log(product);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/review/${location.state.id}`)
      .then((res) => {
        console.log(res);
        if (res.data && res.data.reviews) {
          setreviews(res.data.reviews);
          setratingStats(res.data.ratingStats);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [location.pathname]);

  console.log(reviews.length == 0);
  console.log();
  return (
    <>
      <div className="rounded-xl bg-cover bg-no-repeat ">
        <div className="flex h-fit w-screen p-10  font-sans bg-white/70 backdrop-blur-2xl justify-center items-center ">
          <div className="image-section h-96  flex items-center w-fit">
            <img
              src={`${
                product && `${process.env.REACT_APP_BACKEND_API_URL}/products/${product.image}`
              }`}
              className=" h-full rounded"
              alt=""
            />
          </div>
          <div className="detail-section w-3/4 pt-0 p-10">
            <h1 className="font-bold font-sans text-5xl">{`${
              product && `${product.title}`
            }`}</h1>
            <p className=" text-lg font-semibold py-1 pt-2 text-gray-600">
              {Object.keys(ratingStats).length != 0 && ratingStats.average != 0
                ? ratingStats.average + " "
                : " No Rating Yet "}
              <i className="fa fa-star text-yellow-500"></i>
            </p>
            <p className=" font-semibold text-3xl font-sans">
              {" "}
              ₹ {`${product && `${parseInt(product.price)} `}`}
            </p>
            <div className=" mt-10 min-w-fit w-5/6 pr-5 border-2 border-gray-400 rounded py-5 ">
              <h1 className="font-bold text-md px-5 py-2">Key Features</h1>
              <ul className="pl-10">
                {product &&
                  product.description.map((keypoint, index) => {
                    return (
                      <li
                        key={index}
                        className=" text-gray-500 list-disc font-semibold"
                      >
                        {keypoint}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="h-fit p-5 px-10 flex flex-col gap-5">
          <h2 className=" font-semibold text-lg">Review & Ratings</h2>
          <div className="flex gap-1 ">
            <div className={` h-52 w-1/5 border shadow-lg flex items-center justify-center font-bold ${Object.keys(ratingStats).length != 0 && ratingStats.average != 0
                ? "text-7xl"
                : "text-3xl px-5 text-center"}`}>
              {Object.keys(ratingStats).length != 0 && ratingStats.average != 0
                ? ratingStats.average
                : "No Rating Yet"}
            </div>
            <div className=" h-52 w-full p-3 pl-0 flex flex-col justify-end gap-3">
              {stars.map((star, index) => (
                <div className=" flex gap-8">
                  <div key={index} className=" w-1/5 flex justify-end">
                    {Array(star)
                      .fill(null)
                      .map((_, innerIndex) => (
                        <span class="fa fa-star text-yellow-500 text-2xl"></span>
                      ))}
                  </div>
                  <div className=" w-20 font-semibold">{summ[index]}</div>
                  <div class="w-3/5 flex item-end">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 ">
                      <div
                        class="bg-yellow-500 h-2.5 rounded-full"
                        style={{
                          width:
                            Object.keys(ratingStats).length != 0 &&
                            Object.keys(ratingStats.percentage).length != 0 &&
                            ratingStats.percentage[index + 1] + "%",
                        }}
                      ></div>
                      <div className=" text-xs font-semibold">
                        {Object.keys(ratingStats).length != 0 &&
                          Object.keys(ratingStats.percentage).length != 0 &&
                          ratingStats.percentage[index + 1].toFixed(2) + "%"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {reviews.map((review) => {
            return (
              <div className=" p-4 h-fit w-full  shadow-md border-2 border-slate-100">
                <div className="flex">
                  <div className=" h-16 w-16 bg-slate-400 rounded-full"></div>
                  <div className=" text-lg font-bold flex flex-col h-16 w-auto justify-center px-3 pt-3">
                    <div>{review.user.username}</div>
                    <div className=" text-yellow-500">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={
                            index < review.rating ? "text-yellow-500" : ""
                          }
                        >
                          {index < review.rating ? " ★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full h-20 p-4 font-semibold text-sm ${
                    detail == false ? "overflow-hidden" : " h-fit"
                  }`}
                >
                  {review.comment}
                </div>
                <div
                  className=" w-full h-fit flex justify-end text-sm font-semibold pr-3 cursor-pointer hover:text-slate-600"
                  onClick={showDetail}
                >
                  {detail ? "show detail..." : "hide detail"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="foot w-screen h-20 bg-slate-100/50 backdrop-blur-lg sticky bottom-0 flex justify-between items-center px-24 pr-44 z-50 ">
        <div className="w-2/3 h-full text-black font-sans font-semibold p-3 flex items-center ">
          <img
            src={`${
              product && `${process.env.REACT_APP_BACKEND_API_URL}/products/${product.image}`
            }`}
            className=" h-full"
            alt=""
          />
          <div className="flex flex-col px-5">
            <p>{`${product && `${product.title}`}`}</p>
            <p>{`${product && product.price}`} ₹ </p>
          </div>
        </div>
        <div className="flex">
          <Link to="/cart">
            <button
              className="btn bg-gray-200 border border-black p-2 px-6 flex items-center font-semibold font-sans text-sm rounded-md mx-2"
              onClick={handleAddCart}
            >
              Add To Cart
            </button>
          </Link>
          <button
            type="button"
            className="btn bg-green-500 p-2 px-6 flex items-center font-semibold font-sans text-sm rounded-md text-gray-700"
            onClick={handleBuy}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
