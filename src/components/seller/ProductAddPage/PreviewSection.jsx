import React from 'react';

const PreviewSection = (props) => {
    return (
        <div className='w-1/3 h-11/12   flex items-center justify-center '>
            <div className=" h- p-1  w-3/4 flex hover:p-0 transition-all ease-in-out duration-500 overflow-hidden ">
          <div className=" h-full w-full bg-white rounded-xl overflow-hidden  pb-3 ">
            <div className="pro-img w-full flex h-72 bg-slate-200 overflow-hidden">

              <img src="file:///d%3A/sai/code/reactjs/UrbanBazar/public/img/home/shoe.jpg" className="h-fit" alt='img' />
            </div>
            <div className=" h-8 w-full text-black font-semibold p-2 text-lg">
              {props.title}
            </div>
            <div className=" h-10 w-full text-black font-semibold mb-3 p-2 text-2xl">
              {props.price} &#8377;
            </div>
            <div className="w-full justify-center flex items-center ">
              <button className="btn btn-sm h-9 mb-1 w-11/12 rounded-xl bg-black text-gray-100 hover:bg-gray-900 transition-all duration-300 ease-in-out font-semibold text-sm ">
                Buy Now
              </button>
            </div>
            <div className="w-full justify-center flex items-center ">
              <button className="btn btn-sm py-1 w-11/12 rounded-xl border-2 border-black text-black bg-transparent hover:text-white hover:bg-gray-900 transition-all duration-500 ease-in-out font-semibold text-sm">
                Add To Cart
              </button>
            </div>
          </div>

      </div>
        </div>
    );
}

export default PreviewSection;