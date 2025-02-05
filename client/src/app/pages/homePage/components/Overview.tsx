import React from "react";
// import Image from "next/image";
import Button from "../../components/Button";

const Overview = () => {
  return (
    <div
      id="overview"
      className="flex flex-col md:flex-row justify-between text-black w-[90%] mx-auto py-[4rem]"
    >
      <div className="space-y-8 w-full md:w-[40%] mb-[3rem] md:mb-0 text-center md:text-left">
        <h1 className="text-4xl font-black">Overview of the 2025 Program</h1>
        <div className="space-y-4">
          <p className="text-sm">
            Apply early to enjoy exclusive benefits that give you a head start,
            including priority access and premium perks.
          </p>
          <p className="font-semibold">
            Regular 1 deadline: February 14th 2025.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              type="button"
              title="Explore tuition & financial aid"
              variant="btn_green_rect"
            />
          </div>
        </div>
      </div>
      {/* <Image
        src="/images/overview-img.png"
        alt="Program Overview"
        height={500}
        width={500}
      /> */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="py-[4rem] px-[2rem] space-y-4 bg-overview-bg-img1  md:rounded-b-full text-white bg-center bg-no-repeat flex flex-col items-center justify-center">
          <h2 className="font-bold text-xl">Nairobi Kenya</h2>
          <p className="text-sm">Applications are now open</p>
          <p className="text-xs">Starts from</p>
          <p>June 15th to August 1st</p>
          <Button type="button" title="Learn more" variant="btn_green_rect" />
        </div>
        <div className="py-[4rem] px-[2rem] space-y-4 bg-overview-bg-img2  md:rounded-b-full text-white bg-center bg-no-repeat flex flex-col items-center justify-center">
          <h2 className="font-bold text-xl">Online Program</h2>
          <p className="text-sm">Applications are now open</p>
          <p className="text-xs">Starts from</p>
          <p> May 13th to July 20th.</p>
          <Button type="button" title="Learn more" variant="btn_green_rect" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
