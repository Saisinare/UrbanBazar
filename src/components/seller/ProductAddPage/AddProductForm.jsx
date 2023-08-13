import axios from "axios";
import React, { useState } from "react";

const AddProductForm = () => {
  const [file,setfile] = useState()
  const handChanges = (e)=>{
    setfile(e.target.files[0])
  } 
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = {};
    formData.title = e.target.title.value;
    formData.description = e.target.description.value;
    formData.price = e.target.price.value;
    formData.image = file;
    formData.product_quantity = e.target.product_quantity.value;
    formData.category = e.target.category.value;
    formData.subcategory = e.target.subcategory.value;
    formData.brand = e.target.brand.value;
    console.log(file)
    axios
      .post("http://localhost:8000/seller/api/product", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className="h-screen w-screen ">
      <div className=" h-16 w-64 border-b-2 border-dashed border-gray-300 flex items-end p-2 pb-2">
        <h1 className="font-bold text-xl">Add Product</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-field">
          Product Name <br />
          <input
            type="text"
            name="title"
            className="border-none shadow rounded-sm outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field">
          Description <br />
          <input
            type="text"
            name="description"
            className="border-none shadow rounded-sm outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image</label> <br />
          <input
            type="file"
            onChange={handChanges}
            name="image"
            className="border-none shadow rounded-sm outline-none bg-green-200/80 backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price</label> <br />
          <input
            type="text"
            name="price"
            className="border-none shadow rounded-sm outline-none bg-green-200/80 backdrop-blur-2xl text-sm px-3 py-1"
          />
          $
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label> <br />
          <select name="" id="" className="text-sm px-10 pl-2">
            <option value="electronics">Electronics</option>
            <option value="Sport">Sport</option>
            <option value="Game">Game</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="subcategory">Sub Category</label> <br />
          <select
            name="subcategory"
            id="category"
            className="text-sm px-10 pl-2"
          >
            <option value="phones">Electronics</option>
            <option value="shoes">Sport</option>
            <option value="Hater">Game</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="brand">Brand</label> <br />
          <input
            type="text"
            name="brand"
            className="border-none shadow rounded-sm outline-none  backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <div className="form-field">
          <label htmlFor="product_quantity">Quantity</label> <br />
          <input
            type="text"
            name="product_quantity"
            className="border-none shadow rounded-sm outline-none  backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <button type="submit" className="btn border p-3">
          Add New Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
