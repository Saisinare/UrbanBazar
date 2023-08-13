import axios from "axios";
import React from "react";

const AddProductForm = (props) => {
  const handleChange = (e) => {
    const targetName = e.target.name; // Get the name attribute of the target element
    const form = document.querySelector('form'); // Assuming there's only one form

    if (targetName === 'title') {
        props.settitle(form.title.value);
    } else if (targetName === 'description') {
        props.setdescription(form.description.value);
    } else if (targetName === 'price') {
        props.setprice(form.price.value);
    } else if (targetName === 'image') {
        props.setfile(form.elements.image.files[0]);
    } else if (targetName === 'product_quantity') {
        props.setquantity(form.product_quantity.value);
    } else if (targetName === 'category') {
        props.setcategory(form.category.value);
    } else if (targetName === 'subcategory') {
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
      product_quantity: props.product_quantity,
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
      <div className=" h-16 w-64 border-b-2 border-dashed border-gray-300 flex items-end p-2 pb-2">
        <h1 className="font-bold text-xl">Add Product</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-field">
          Product Name 
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="border-none shadow rounded-sm outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field">
          Description 
          <input
            onChange={handleChange}
            type="text"
            name="description"
            className="border-none shadow rounded-sm outline-none bg-white/80 backdrop-blur-2xl"
          />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image</label>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="border-none shadow rounded-sm outline-none bg-green-200/80 backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            type="text"
            name="price"
            className="border-none shadow rounded-sm outline-none bg-green-200/80 backdrop-blur-2xl text-sm px-3 py-1"
          />
          $
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label> 
          <select name="" id="" className="text-sm px-10 pl-2" onChange={handleChange}>
            <option value="electronics">Electronics</option>
            <option value="Sport">Sport</option>
            <option value="Game">Game</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="subcategory">Sub Category</label>
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
        <div className="form-field">
          <label htmlFor="brand">Brand</label>
          <input
            onChange={handleChange}
            type="text"
            name="brand"
            className="border-none shadow rounded-sm outline-none  backdrop-blur-2xl text-sm p-1"
          />
        </div>
        <div className="form-field">
          <label htmlFor="product_quantity">Quantity</label>
          <input
            onChange={handleChange}
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
