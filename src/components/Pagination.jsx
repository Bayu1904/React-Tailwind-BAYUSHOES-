import React from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const slideR = () => {
    let slide = document.getElementById("slide");
    slide.scrollLeft = slide.scrollLeft + 500;
  };
  const slideL = () => {
    let slide = document.getElementById("slide");
    slide.scrollLeft = slide.scrollLeft - 500;
  };

  return (
    <ul className="pagination mt-7 w-3/4 m-auto flex items-center justify-center gap-1">
      <MdChevronLeft
        onClick={slideR}
        size={30}
        className="cursor-pointer bg-white"
      />
      <li
        className="flex flex-row justify-center overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        id="slide"
      >
        {pageNumbers.map((number) => (
          <div
            key={number}
            onClick={() => paginate(number)}
            className="cursor-pointer bg-white p-2 rounded-md border-2"
          >
            {number}
          </div>
        ))}
      </li>
      <MdChevronRight
        onClick={slideR}
        size={30}
        className="cursor-pointer bg-white"
      />
    </ul>
  );
};

export default Pagination;
