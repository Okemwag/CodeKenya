import React from "react";

import { FaArrowRight, FaPenNib } from "react-icons/fa6";

const Popular = () => {
  return (
    <div className="w-[90%] mx-auto py-[3rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Popular category </h1>
        <button className="flex items-center gap-3  bg-white border border-primaryGreenColor border-[2px] hover:bg-primaryGreenColor hover:text-white px-4 py-2 text-primaryGreenColor">
          View All <FaArrowRight />
        </button>
      </div>
      <div className="grid my-[3rem] grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-[#dae8daff] p-4 text-primaryGreenColor">
            <FaPenNib />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Graphics & Design</h2>
            <p className="text-sm text-slate-400">357 open positions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
