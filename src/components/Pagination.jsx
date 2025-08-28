import React from "react";

function Pagination({pageNumber, nextFn, previousFn}) {
  return (
    <div className=" flex justify-center pt-3 mt-8 bg-gray-400 w-full h-[50px] mb-5">
      <div onClick={previousFn }><i class=" pr-10 fa-solid fa-arrow-left"></i></div>
      <div>{pageNumber}</div>
      <div onClick={nextFn}><i class=" pl-7 fa-solid fa-arrow-right"></i></div>
    </div>
  );
}

export default Pagination;
