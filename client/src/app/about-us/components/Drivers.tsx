import React from "react";
import Image from "next/image";

const Drivers = () => {
  const drivers = [
    {
      title: "Technical Excellence",
      description:
        "Intensive hands-on training in Software Engineering, Entrepreneurship, and Artificial Intelligence through practical projects and real-world applications.",
      image: "/images/daily-driver-img.png",
    },
    {
      title: "Cultural Exchange",
      description:
        "Immersive cross-cultural experiences fostering global perspectives and lasting international connections during the 7-week program.",
      image: "/images/daily-driver-img.png",
    },
    {
      title: "Professional Development",
      description:
        "Career-launching opportunities through industry exposure, mentorship, and development of in-demand skills for the modern workplace.",
      image: "/images/daily-driver-img.png",
    },
    {
      title: "Impact Creation",
      description:
        "Empowering students to make meaningful contributions while building practical experience through community-focused projects.",
      image: "/images/daily-driver-img.png",
    },
  ];

  return (
    <div className="w-[90%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Daily Drivers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {drivers.map((driver, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 hover:transform hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={driver.image}
              alt={driver.title}
              width={200}
              height={200}
              className="shadow-lg"
            />
            <div className="space-y-3 w-full">
              <p className="text-lg font-bold text-primary">{driver.title}</p>
              <p className="text-sm text-gray-600">{driver.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;
