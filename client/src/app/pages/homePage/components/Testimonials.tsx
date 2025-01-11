import React from "react";

import SuccessStoriesCarousel from "../../components/SuccessStoriesCarousel";

const Testimonials = () => {
  return (
    <div className="w-full md:w-[90%] mx-auto py-[4rem]">
      <h2 className="text-4xl font-bold text-center md:text-left text-primaryGreenColor">
        Student Success Stories
      </h2>
      <SuccessStoriesCarousel/>
    </div>
  );
};

export default Testimonials;
