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
        <div className="relative h-[200px]"></div>{" "}
        {/* Spacer height set to 300px */}

        {/* Skills Section */}
        <div className="skills-section w-full bg-black text-white relative z-10 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <p className="text-lg font-medium mb-4">
                Most trusted education platform
              </p>
              <p className="text-4xl font-bold mb-6">
                Grow your skills and advance career
              </p>
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
      <div className="overview-section bg-white py-10">
        <div className="container mx-auto px-4">
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nairobi Kenya Card */}

            <div className="flex justify-center items-center">
              {/* Title and Description */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Overview of the 2025 Program
                </h2>
                <p className="text-lg">
                  Apply early to enjoy exclusive benefits that give you a head
                  start, including priority access and premium perks.
                </p>
                <p className="text-sm mt-2">
                  Regular 1 deadline: December 3, 2024
                </p>

                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Explore tuition & financial aid
                </button>

              </div>
            </div>

            <div className="flex justify-center items-center">
              <img
                src="/images/overview1.svg"
                alt="Nairobi Kenya Overview"
                className="w-full max-w-[300px]"
              />
            </div>

            {/* Online Program Card */}
            <div className="flex justify-center items-center">
              <img
                src="/images/overview2.svg"
                alt="Online Program Overview"
                className="w-full max-w-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <p>overview section</p>
      </div>

    </div>
  );
}

export default HomePage;
