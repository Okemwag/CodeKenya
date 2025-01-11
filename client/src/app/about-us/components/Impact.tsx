import React from "react";

import Image from "next/image";

const Impact = () => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-primaryGreenColor text-2xl text-center mb-[1rem] font-bold">
        Our Impact
      </h1>
      <Image
        src="/images/bootcamp.png"
        alt="Learners in a bootcamp session"
        className="my-[3rem] mx-auto"
        height={1000}
        width={1000}
      />
    </div>
  );
};

export default Impact;
