import React from "react";

import Button from "@/app/pages/components/Button";
import { SunIcon, StarIcon, EyeIcon, GlobeIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col md:flex-row md:max-w-[90%] w-full justify-between mx-auto py-20">
        <div className="space-y-8 w-full md:w-[50%] text-center md:text-left">
          <h1 className="text-5xl font-black leading-12">
            Invest in your success with Code Kenya
          </h1>
          <p className="text-base">
            Financial considerations play a crucial role in your decision to
            pursue a transformative study abroad experience. Our goal is to make
            our programs as accessible as possible while ensuring that you
            receive the highest quality education and support. We firmly believe
            in the transformative power of international experience. To make
            this opportunity accessible to as many students as possible, we
            offer a range of financial aid options.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="/apply">
              <Button
                type="button"
                title="Apply Now"
                variant="btn_green_rect"
              />
            </Link>
            <Link href="/bootcamps">
              <Button type="button" title="Explore more" variant="btn_red" />
            </Link>
          </div>
          <div className="hidden md:flex space-y-4 md:space-y-0 space-x-1 md:space-x-4 border p-4 rounded-lg w-fit">
            <div className="flex flex-col items-start space-y-2">
              <SunIcon size={32} />
              <p>Scholarships</p>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <StarIcon size={32} />
              <p>Private Loans</p>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <EyeIcon size={32} />
              <p>Work Study Programs</p>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <GlobeIcon size={32} />
              <p>State based aid</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/tuition-hero-img.svg"
            alt="Image with dollar sign"
            height={400}
            width={400}
            loading="lazy"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
