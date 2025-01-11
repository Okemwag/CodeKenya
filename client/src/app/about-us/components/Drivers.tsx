import React from "react";
import Image from "next/image";

const Drivers = () => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-xl text-center mb-[2rem]">Our Daily Drivers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            <Image
              src="/images/daily-driver-img.png"
              alt="Person typing on laptop"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <div className="space-y-3 w-full">
              <p className="text-base font-extrabold">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
              <p className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;
