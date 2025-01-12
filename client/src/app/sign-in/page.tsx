"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const ApplicationForm: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_phone: "",
    dob: "",
    course_id: "",
    university_name: "",
    essay: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dob = "You must be at least 16 years old";
      }
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    // University validation
    if (!formData.university.trim()) {
      newErrors.university = "University is required";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while submitting the form");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Carousel Section */}
          <div className="relative bg-primaryRedColor rounded-2xl p-8 flex flex-col">
            <h2 className="text-white text-xl md:text-2xl text-center mb-8">
              Welcome Back! Please log in to access your account.
            </h2>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="absolute inset-0 bg-primaryGreenColor rounded-full"></div>
              <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[...Array(totalSlides)].map((_, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Image
                        src="/images/application-carousel-img.png"
                        alt={`Application feature ${index + 1}`}
                        className="w-full h-full object-cover"
                        height={200}
                        width={200}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? "bg-white w-4" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="flex flex-col space-y-4 mb-8">
                <Image
                  src="/images/code-kenya-logo-black.png"
                  alt="Code Kenya Logo"
                  //   className="h-12 w-16"
                  height={200}
                  width={200}
                />
                <div>
                  <h2 className="text-2xl font-semibold">Login now</h2>
                  <p>Login to your student account</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
                {/* First Name */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.dob
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  />
                  {errors.dob && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.dob}
                    </span>
                  )}
                </div>

                {/* Course Selection */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    What course are you most interested in?
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.course
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  >
                    <option value="">Select a course</option>
                    <option value="software-dev">Software Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="management">Management Consulting</option>
                    <option value="investment">Investment Banking</option>
                  </select>
                  {errors.course && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.course}
                    </span>
                  )}
                </div>

                {/* University */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.university
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                    placeholder="Enter your university"
                  />
                  {errors.university && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.university}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white mt-6 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryGreenColor hover:bg-green-700 transition-colors"
                }`}
              >
                {isSubmitting ? "Logging you in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
