import React from "react";

import Navbar from "@/app/pages/components/Navbar";
import Button from "@/app/pages/components/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-about-sect-hero-bg-img h-screen  bg-no-repeat bg-center">
      <Navbar />
      <div className="w-[90%] mx-auto flex items-start h-full">
        <div className="w-full md:w-[30%] bg-gradient-to-b from-primaryRedColor to-transparent text-white rounded-lg mt-[4rem] space-y-6 p-7 shadow-lg">
          <p>✦ About us</p>
          <h1 className="text-5xl font-bold">Who we are</h1>
          <p>
            At Code Kenya we inspire and enable people to realize their
            potential. We mentor them, encourage them, get behind them, and
            believe in them, to stretch the limits of what they think they can
            do.
          </p>
          <div>
            <Link href="/apply">
              <Button type="button" title="Enroll now" variant="btn_green" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
