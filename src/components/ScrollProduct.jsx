import React, { useEffect, useState } from "react";
import { kontenbase } from "../config/base";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Scroll() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const find = async () => {
      const { data, error } = await kontenbase.service("Products").find();
      setProducts(data);

      if (error) {
        console.log(error);
        return;
      }
    };
    find();
  }, []);

  const slideR = () => {
    let slide = document.getElementById("slide");
    slide.scrollLeft = slide.scrollLeft + 500;
  };
  const slideL = () => {
    let slide = document.getElementById("slide");
    slide.scrollLeft = slide.scrollLeft - 500;
  };
  return (
    <div className="w-3/4 m-auto mt-9 mb-16">
      <div className="text-orange-700 mb-9 flex items-center justify-between">
        <div className="text-4xl font-semibold">Our Products Shoes</div>
        <div className="tetx-2xl font-semibold">Lainnya</div>
      </div>
      <div className="flex items-center">
        <MdChevronLeft onClick={slideL} size={40} />
        <div
          id="slide"
          className="flex flex-row gap-9 w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {products?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col w-44 bg-white rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <img src={item.image} alt="" className="rounded-t-md" />
              <div className="p-2 ">
                <div className="text-orange-800 font-bold">{item.name}</div>
                <div className="text-sm font-medium text-red-500">
                  Rp. {item.price_sell}
                </div>
                <div className="text-sm font-medium text-red-500">
                  Stok : {item.stok}
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight onClick={slideR} size={40} />
      </div>
    </div>
  );
}
