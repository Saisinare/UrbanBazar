import React from "react";
import Category from "./Category";

const Categories = () => {
  let items = [
    { title: "Fashion", imgurl: 'url("img/home/fashion.jpeg")' },
    { title: "Electronics", imgurl: 'url("img/home/electronics.jpg")' },
    { title: "Appliances", imgurl: 'url("img/home/appliances.jpg")' },
    { title: "Travel", imgurl: 'url("img/home/travel.jpg")' },
    { title: "Grocery", imgurl: 'url("img/home/grocery.jpg")' },
  ];
  return (
    <>
      <div class=" w-100 h-auto p-2 flex flex-col justify-center">
        <div className="font-semibold font-sans text-lg md:text-3xl py-5 pl-3 text-green-900">
          Categories
          </div>
          <div className="sm:h-fit overflow-x-scroll flex-wrap flex md:w-100 md:flex-nowrap md:overflow-hidden ">
          {items.map((item) => {
            return <Category title={item.title} imgurl={item.imgurl} />;
          })}
          </div>
      </div>
    </>
  );
};

export default Categories;
