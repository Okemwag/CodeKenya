import React from "react";
import Image from "next/image";
import Button from "../../components/Button";

const Overview = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between text-black w-[90%] mx-auto py-[4rem]">
      <div className="space-y-8 w-full md:w-[40%] mb-[3rem] md:mb-0 text-center md:text-left">
        <h1 className="text-4xl font-black">Overview of the 2025 Program</h1>
        <div className="space-y-4">
          <p className="text-sm">
            Apply early to enjoy exclusive benefits that give you a head start,
            including priority access and premium perks.
          </p>
          <p>Regular 1 deadline: December 3, 2024</p>
          <div className="flex justify-center md:justify-start">
            <Button
              type="button"
              title="Explore tuition & financial aid"
              variant="btn_green_rect"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/overview-img.png"
        alt="Program Overview"
        height={500}
        width={500}
      />
    </div>
  );
};

export default Overview;
