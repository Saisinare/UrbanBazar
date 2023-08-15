import axios from "axios";
import React, { useState } from "react";



const AddProductForm = (props) => {
  const [curentsubcategory,setcurentsubcategory]=useState([]);
  const handleChange = (e) => {
    const targetName = e.target.name;
    const form = document.querySelector("form");
    const subcategories = {
      fashion: ['shirts', 'shoes', 'pants', 'hats', 'dresses'],
      electronics: ['mobiles', 'headphones', 'laptop', 'tv', 'cameras'],
      appliances: ['refrigerator', 'washing machine', 'microwave', 'blender', 'vacuum cleaner'],
      groceries: ['fruits', 'vegetables', 'dairy', 'canned goods', 'snacks'],
      travel: ['flights', 'hotels', 'car rentals', 'vacation packages', 'cruises']
    };
    
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
      setcurentsubcategory(subcategories[form.category.value])
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
            <p className="pt-2 font-bold text-sm font-body text-secondary-500">
              {" "}
              Identification For Product
            </p>
          </label>

          <br />
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="border-none h-10 shadow rounded-lg w-3/6 text-sm font-semibold text-gray-500 outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5">
          <label className="font-semibold text-black" htmlFor="description">
            Description
          </label>{" "}
          <p className="font-bold text-sm font-body text-secondary-500">
            Detailed Information About Product
          </p>
          <br />
          <textarea
            onChange={handleChange}
            name="description"
            className="border-none shadow rounded-lg outline-none bg-white/80 backdrop-blur-2xl w-full p-3 text-sm font-semibold text-gray-700"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="image">
            Image
            <p className="font-bold text-sm font-body text-secondary-500">
            For Easy Recognization 
          </p>
          </label>

          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="border-none rounded-lg outline-none shadow  backdrop-blur-2xl text-sm p-2 w-60 bg-white "
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="price">
            Price
            <p className="font-bold text-sm font-body text-secondary-500">
            For Purchasing 
          </p>
          </label>
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="price"
              className="border-none shadow rounded-lg outline-none font-semibold  backdrop-blur-2xl text-sm px-1 py-1 h-10 text-gray-500"
            />
            <span className="pl-3 font-semibold">INR</span>
          </div>
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-start">
          <div className="form-field pt-2 w-1/3 py-5">
            <label className="font-semibold text-black" htmlFor="category">
              Category
              <p className="font-bold text-sm font-body text-secondary-500">
            For Easy Filterization 
          </p>
            </label>
            <select
              name="category"
              id="category"
              className="text-sm px-10 pl-2 mt-3"
              onChange={handleChange}
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="appliances">Appliances</option>
            </select>
          </div>
          <div className="form-field pt-2 w-1/3 py-5">
            <label className="font-semibold text-black" htmlFor="subcategory">
              Sub Category
              <p className="font-bold text-sm font-body text-secondary-500">
              For Easy Filterization
          </p>
            </label>
            <select
              name="subcategory"
              id="subcategory"
              className="text-sm mt-3 px-10 pl-2"
              onChange={handleChange}
            >
              
              <option >"</option>
              {curentsubcategory.map(subcat=>{
                return <option value={subcat}>{subcat}</option>
              })}
            </select>                                                 
          </div>
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between">
          <label className="font-semibold text-black" htmlFor="brand">
            Brand
            <p className="font-bold text-sm font-body text-secondary-500">
              For Ranking
          </p>
          </label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="brand"
            className="border-none shadow rounded-lg outline-none  w-2/5 backdrop-blur-2xl text-sm p-2 font-semibold text-gray-500 h-10"
          />
        </div>
        <div className="form-field pt-2 w-5/6 border-b py-5 flex justify-between ">
          <label
            className="font-semibold text-black"
            htmlFor="product_quantity"
          >
            Quantity
            <p className="font-bold text-sm font-body text-secondary-500">
              How Many Copies Of Product Available 
          </p>
          </label>
          <br />
          <input
            onChange={handleChange}
            type="number"
            name="product_quantity"
            className="border-none shadow h-10  outline-none w-2/5 rounded-lg  backdrop-blur-2xl text-sm p-2 font-semibold text-gray-500"
          />
        </div>
        <div className="form-field pt-2 w-5/6  py-5 flex justify-end ">
          <button
            type="submit"
            className="btn border bg-gradient-to-t from-black to-slate-900 text-gray-100 text-sm rounded-xl font-semibold p-3 px-5"
          >
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
