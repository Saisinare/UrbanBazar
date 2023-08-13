import axios from "axios";
import React from "react";

const AddProductForm = (props) => {
  const handleChange = (e) => {
    const targetName = e.target.name; // Get the name attribute of the target element
    const form = document.querySelector("form"); // Assuming there's only one form

    if (targetName === "title") {
      props.settitle(form.title.value);
    } else if (targetName === "description") {
      props.setdescription(form.description.value);
    } else if (targetName === "price") {
      props.setprice(form.price.value);
    } else if (targetName === "image") {
      props.setfile(form.elements.image.files[0]);
    } else if (targetName === "product_quantity") {
      props.setquantity(form.product_quantity.value);
    } else if (targetName === "category") {
      props.setcategory(form.category.value);
    } else if (targetName === "subcategory") {
      props.setsubcategory(form.subcategory.value);
    } else {
      props.setbrand(form.subcategory.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formData = {
      title: props.title,
      description: props.description,
      image: props.file,
      price: props.price,
      category: props.category,
      subcategory: props.subcategory,
      brand: props.brand,
      product_quantity: props.quantity,
    };
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
    <div className=" w-2/3 ">
      <div className=" h-16 w-64  border-gray-300 flex items-end pb-2">
        <h1 className="font-bold text-2xl">Add Product</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="title">
            Product Name
          </label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="border-none shadow rounded-sm w-3/6 text-sm font-semibold text-gray-500 outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5">
          <label className="font-semibold text-black" htmlFor="description">
            Description
          </label>
          <br />
          <textarea
            onChange={handleChange}
            name="description"
            className="border-none shadow rounded-sm outline-none bg-white/80 backdrop-blur-2xl w-full p-3 text-sm font-semibold text-gray-700"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="image">
            Image
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="border-none shadow rounded-sm outline-none  backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="price">
            Price
          </label>
          <div>
          <input
            onChange={handleChange}
            type="text"
            name="price"
            className="border-none shadow rounded-sm outline-none  backdrop-blur-2xl text-sm px-3 py-1 "
          />
          <span className="pl-3 font-semibold">INR</span> 
          </div>
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-start">
          <div className="form-field pt-2 w-1/3 py-5">
            <label className="font-semibold text-black" htmlFor="category">
              Category
            </label>
            <br />
            <select
              name=""
              id=""
              className="text-sm px-10 pl-2"
              onChange={handleChange}
            >
              <option value="electronics">Electronics</option>
              <option value="Sport">Sport</option>
              <option value="Game">Game</option>
            </select>
          </div>
          <div className="form-field pt-2 w-1/3 py-5">
            <label className="font-semibold text-black" htmlFor="subcategory">
              Sub Category
            </label>
            <br />
            <select
              name="subcategory"
              id="category"
              className="text-sm px-10 pl-2"
              onChange={handleChange}
            >
              <option value="phones">Electronics</option>
              <option value="shoes">Sport</option>
              <option value="Hater">Game</option>
            </select>
          </div>
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="brand">
            Brand
          </label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="brand"
            className="border-none shadow rounded-sm outline-none  w-2/5 backdrop-blur-2xl text-sm p-2 font-semibold text-gray-700"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between ">
          <label
            className="font-semibold text-black"
            htmlFor="product_quantity"
          >
            Quantity
          </label>
          <br />
          <input
            onChange={handleChange}
            type="number"
            name="product_quantity"
            className="border-none shadow rounded-sm outline-none w-2/5  backdrop-blur-2xl text-sm p-2"
          />
        </div>
        <div className="form-field pt-2 w-5/6  py-5 flex justify-end ">
        <button type="submit" className="btn border bg-gradient-to-t from-black to-slate-900 text-gray-100 rounded-xl font-semibold p-3">
          Add New Product
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
