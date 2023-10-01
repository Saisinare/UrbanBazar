import axios from "axios";
import React, { useEffect, useState } from "react";
import { setcheckoutsessionId } from "../../redux/slice/products";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const CheckOutCard = () => {
  
  const [cart, setcart] = useState([]);
  const [totalPrice, settotalPrice] = useState(0) 
  const [deliveryCharge,setdeliveryCharge] = useState(0)
  const [tax,settax] = useState(0)
  const [productsPrice,setProductsPrice] = useState(0)
  const [sessionId,setSessionId] = useState('')
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(productsState)
    axios
      .get("http://localhost:8000/cart/products", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setcart(response.data.cart);
          response.data.cart.forEach(item=>{
            console.log(item)
            settotalPrice(response.data.totalPrice) 
            settax(response.data.tax) 
            setProductsPrice(response.data.productsPrice) 
            setdeliveryCharge(response.data.deliveryCharges) 
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productsState.checkoutSessionId]);



  const handleClick = ()=>{
    axios.get('http://localhost:8000/checkout',{withCredentials:true}).then(res=>{
      if(res.data && res.data.session_id){
      dispatch(setcheckoutsessionId(res.data.session_id));
      Cookies.set('chekoutsessionId',res.data.session_id)
      return res
      }
    }).then(res=>{
       window.location.href = res.data.url;
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className=" sticky top-20 flex h-auto w-5/12 item-center justify-center pt-5">
      <div class="flex flex-col h-auto w-11/12 p-6  bg-white border border-green-500 rounded-lg shadow">
        <form>
          <div class="relative">
            <input
              type="search"
              class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500"
              placeholder="Enter Promo Code "
            />
            <button
              type="submit"
              class="text-white absolute right-0 bottom-0 px-5 font-bold rounded-lg text-sm bg-green-950 hover:bg-gray-800  h-full "
            >
              Apply Coupon
            </button>
          </div>
        </form>
        <div className="details h-56 p-5 px-11  text-gray-800 font-semibold">
            <div className="data w-full flex justify-between">
                <div className="label">Product Cost</div>
                <div className="value">{productsPrice}₹</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label">Delivery Charges</div>
                <div className="value">{deliveryCharge}₹</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label">Tax</div>
                <div className="value">{tax}₹</div>
            </div>
            <div className="data w-full flex justify-between">
                <div className="label font-bold text-l">Estimated Total</div>
                <div className="value">{totalPrice}₹</div>
            </div>
        </div>
        <div className="h-16 p-5">
        <button
              type="submit"
              class="text-gray-900  font-bold rounded-lg bg-green-500 hover:bg-green-300  h-12 w-full flex items-center justify-center"
              onClick={handleClick}
            >
              Check Out
            </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
