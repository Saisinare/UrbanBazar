import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import PreviewSection from "./PreviewSection";

const Addproduct = (props) => {
  let intitalvale = ' '
  const [file, setfile] = useState();
  const [title, settitle] = useState(intitalvale);
  const [description, setdescription] = useState(intitalvale);
  const [price, setprice] = useState(intitalvale);
  const [category, setcategory] = useState(intitalvale);
  const [subcategory, setsubcategory] = useState(intitalvale);
  const [brand, setbrand] = useState(intitalvale);
  const [quantity, setquantity] = useState(intitalvale);
  const [preimage, setpreimage] = useState(intitalvale)
  return (
    <>
      <div className="h-fit p-6 px-20 pt-6 bg-gradient-to-r from-slate-100 to-gray-100 flex">
        <AddProductForm
          setfile={setfile}
          settitle={settitle}
          setdescription={setdescription}
          setprice={setprice}
          setcategory={setcategory}
          setsubcategory={setsubcategory}
          setbrand={setbrand}
          setquantity={setquantity}
          setpreimage={setpreimage}

          title={title}
          price={price}
          description={description}
          file={file}
          category={category}
          subcategory={subcategory}
          brand={brand}
          quantity={quantity}
          />
        <PreviewSection
          title={title}
          price={price}
          description={description}
          file={file}
          category={category}
          subcategory={subcategory}
          brand={brand}
          quantity={quantity}
          preimage={preimage}
          />
      </div>
    </>
  );
};

export default Addproduct;
