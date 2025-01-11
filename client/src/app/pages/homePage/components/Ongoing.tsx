import React from "react";

import Image from "next/image";

const Ongoing = () => {
  return (
    <div className="bg-[#b3b4bdff]">
      <div className="w-[90%] mx-auto py-[4rem]">
        <div className="flex flex-col md:flex-row justify-between">
          <Image
            src="/images/ongoing-img.png"
            alt="Virtual Reality testing"
            className="rounded"
            height={400}
            width={400}
          />
          <div className="space-y-4">
            <div className="h-[3px] mt-[2rem] md:mt-0 bg-primaryGreenColor w-[3rem] justify-left"></div>
            <div className="">
              <h2 className="text-primaryGreenColor text-lg font-bold">
                Data Science
              </h2>
              <p className="text-xs">
                Learn to analyze data, build predictive models, and make
                data-driven decisions.
              </p>
            </div>
            <div className="">
              <h2 className="text-primaryGreenColor text-lg font-bold">
                Digital Marketing
              </h2>
              <p className="text-xs">
                Gain expertise in SEO, social media strategy, advertising, and
                content creation
              </p>
            </div>
            <div className="">
              <h2 className="text-primaryGreenColor text-lg font-bold">
                Management Consulting
              </h2>
              <p className="text-xs">
                Develop problem-solving, strategic thinking, and leadership
                skills to support businesses.
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center md:text-left text-primaryGreenColor py-[3rem]">
          Ongoing Bootcamps & internships
        </h1>
        <div className="flex flex-col md:flex-row gap-[3rem]  justify-between">
          <Image
            src="/images/investment-banking-overview.png"
            alt="Investment Banking"
            height={300}
            width={300}
          />
          <Image
            src="/images/software-development-overview.png"
            alt="Investment Banking"
            height={300}
            width={300}
          />
          <Image
            src="/images/artificial-intelligence-overview.png"
            alt="Investment Banking"
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
