import React from "react";

function Pagination({page, handleNext, handlePrev}) {
  return (
    <div className=" flex justify-center pt-3 mt-8 bg-gray-400 w-full h-[50px] mb-5">
      <div onClick={handlePrev }><i class=" pr-10 fa-solid fa-arrow-left"></i></div>
      <div>{page}</div>
      <div onClick={handleNext}><i class=" pl-7 fa-solid fa-arrow-right"></i></div>
    </div>
  );
}

export default Pagination;
