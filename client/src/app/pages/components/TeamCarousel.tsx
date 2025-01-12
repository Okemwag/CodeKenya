'use client';

import React, { useState } from "react";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TeamCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      name: "Joan Ngoya",
      role: "CEO",
      image: '/images/CEO-img.jpg'
    },
    {
      name: "Sylvia Moraa",
      role: "COO",
      image: '/images/COO-img.jpg'
    },
    {
      name: "Joel Kiplagat",
      role: "Tech lead",
      image: '/images/tech-lead-img.jpg'
    },
    {
      name: "Judith Njeri",
      role: "Head of UX",
      image: '/images/head-ux-img.jpg'
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden relative rounded-lg">
        {/* Main carousel container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full flex-shrink-0 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="aspect-square w-48 mx-auto mb-4 bg-gray-200 rounded-lg">
                  <Image
                    src={`${member.image}`}
                    alt={`${member.name}'s placeholder`}
                    className="w-full h-full object-cover rounded-lg"
                    height={200}
                    width={200}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
        >
          <FaChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
        >
          <FaChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-primaryRedColor w-4"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
