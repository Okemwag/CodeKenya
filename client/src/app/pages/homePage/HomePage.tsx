import NavBar from "@/app/components/NavBar";
import React from "react";

function HomePage() {
  return (
    <div>
      {/* Top Section */}
      <div className="top-section bg-black text-white w-full">
        {/* Navbar */}
        <div className="navbar">
          <NavBar />
        </div>

        {/* Spacer Section */}
        <div className="relative h-[200px]"></div> {/* Spacer height set to 300px */}

        {/* Skills Section */}
        <div className="skills-section w-full bg-black text-white relative z-10 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <p className="text-lg font-medium mb-4">Most trusted education platform</p>
              <p className="text-4xl font-bold mb-6">Grow your skills and advance career</p>
              <p className="text-base leading-relaxed">
                Code Kenya program combines a career-focused bootcamp with an
                internship in a tech field, aimed to help you gain experience in
                the industry.
              </p>

              <button
              type="button"
              className="text-white border border-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center hover:border-blue-500 hover:bg-white hover:text-black mx-4"
            >
              Explore Programs
            </button>

            <button
              type="button"
              className="text-green-500 border border-green-500 bg-white hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx-4"
            >
              Watch Demo
            </button>
            </div>

            {/* Right Section */}
            <div className="flex justify-center items-center">
              <img
                src="/images/top-section.svg"
                alt="top section"
                className="w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="overview-section"></div>
    </div>
  );
}

export default HomePage;
