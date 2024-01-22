import React, { useEffect, useState } from "react";

const PropertyCard = (props) => {
  const [val, setvalue] = useState();
  const [Editable, setEditable] = useState(false);
  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const changeEditable = () => {
    setEditable(!Editable);
  };

  const handleCancel = ()=>{
    setEditable(!Editable);
  }
  

  useEffect(() => {
    setvalue(props.value);
  }, [props.value]);

  return (
    <div className=" h-24 rounded-md w-full md:w-3/6  p-2">
      <div className="min-h-5/6 w-full shadow rounded-md p-3 flex text-sm font-semibold  justify-between ">
        <div>
          <div className=" text-green-600">{props.title}</div>
          <div>
            {" "}
            <input
              type="text"
              value={val}
              className={`text-sm font-semibold h-6 bg-transparent px-0  ${
                Editable ? " border  border-slate-500 rounded-sm px-1" : " border-none"
              } `}
              onChange={handleChange}
              id="input"
              readOnly={!Editable}
            />{" "}
            {Editable && (
              <div className="flex gap-2 text-sm float-right ml-1">
                <div className=" hover:text-green-600 cursor-pointer" onClick={()=>{props.onInputChange(props.field,val)}}>save</div>
                <div className=" hover:text-red-600 cursor-pointer" onClick={handleCancel}>cancel</div>
              </div>
            )}
          </div>
        </div>
        <div>
          <i
            class="fas fa-edit hover:text-green-800"
            onClick={changeEditable}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
