import React from "react";

import Image from "next/image";
import { FaArrowRight, FaBookmark, FaMapPin } from "react-icons/fa6";

const JobCard = ({ title, company, location, employmentType, salary }) => {
  const typeColorMap = {
    "FULL-TIME": "bg-green-100 text-green-800",
    "PART-TIME": "bg-blue-100 text-blue-800",
    INTERNSHIP: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            <Image
              src="/images/microsoft-logo.png"
              alt="Microsoft Logo"
              className="w-6 h-6"
              height={100}
              width={100}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <span>{company}</span>
              <div className="flex items-center gap-1">
                <FaMapPin size={14} />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FaBookmark size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${typeColorMap[employmentType]}`}
          >
            {employmentType}
          </span>
          <span className="text-sm text-gray-600">Salary: {salary}</span>
        </div>
      </div>
    </div>
  );
};

const AvailableInternships = () => {
  const jobs = [
    {
      title: "Technical Support Specialist",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "PART-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Senior UX Designer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Marketing Officer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "INTERNSHIP",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "INTERNSHIP",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Interaction Designer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "PART-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Project Manager",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Software Engineer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Visual Designer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Project Manager",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Front End Developer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "PART-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Senior UX Designer",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "FULL-TIME",
      salary: "$20,000 - $25,000",
    },
    {
      title: "Marketing Manager",
      company: "Google Inc.",
      location: "Nairobi, Kenya",
      employmentType: "INTERNSHIP",
      salary: "$20,000 - $25,000",
    },
  ];
  return (
    <div className="w-[90%] mx-auto py-[3rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Available Internships </h1>
        <button className="flex items-center gap-3  bg-white border border-primaryGreenColor border-[2px] hover:bg-primaryGreenColor hover:text-white px-4 py-2 text-primaryGreenColor">
          View All <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-1 my-[2rem] md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default AvailableInternships;