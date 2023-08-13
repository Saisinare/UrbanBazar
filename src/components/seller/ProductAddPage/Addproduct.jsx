import React from "react";
import AddProductForm from "./AddProductForm";

const Addproduct = () => {
  return (
    <>
    <div className="px-20 pt-6 bg-gradient-to-t from-white to-slate-50">
      <AddProductForm />
    </div>
    <div className="h-10 w-screen bottom-0 sticky backdrop-blur-2xl bg-gray-300/40"></div>
    </>
  );
};

export default Addproduct;
