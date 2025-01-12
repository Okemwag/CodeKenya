"use client";

import React, { useState } from "react";
import axios from "axios";

import Link from "next/link";
import Image from "next/image";

import {
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
  FaMedium,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

import SubscriptionModal from "./SubscriptionModal";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showSubscribedPopup, setShowSubscribedPopup] = useState(false);
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    general: {
      title: "General",
      links: [
        { name: "Internships", path: "/internships" },
        { name: "Tuition and financial aid", path: "/" },
        { name: "Health and safety", path: "/" },
        { name: "FAQs", path: "/" },
        { name: "Contact us", path: "/contact" },
      ],
    },
    bootcamps: {
      title: "Bootcamps",
      links: [
        { name: "Management Consulting", path: "/" },
        { name: "Data Science", path: "/" },
        { name: "Investment Banking", path: "/" },
        { name: "Digital Marketing", path: "/" },
        { name: "Software Development", path: "/" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Teach with Code Kenya", path: "/" },
        { name: "Code Kenya Blog", path: "/blog" },
        { name: "Developers", path: "/" },
        { name: "Support", path: "/" },
      ],
    },
    about: {
      title: "About",
      links: [
        { name: "Information for parents", path: "/" },
        { name: "Who we are", path: "/about-us" },
        { name: "Careers", path: "/" },
        { name: "Internship partners", path: "/internships" },
      ],
    },
  };

  const legalLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Deposit policy",
    "Legal",
    "Website and student portal policy",
  ];

  const subscribeHandler = async () => {
    const base_url = process.env.NEXT_PUBLIC_BASE_API_URL;
    // e.preventDefault();

    try {
      if (email) {
        // console.log("Email provided::", email)
        const response = await axios.post(`${base_url}/api/subscribe`, {
          email,
        });
        if (response.status === 200) {
          setShowSubscribedPopup(true);
          setEmail("");
          // alert("Subscribed!");
        }
      }
    } catch (error) {
      console.log("Subscription error::", error);
      alert("An error occured when subscribing");
    }
  };

  return (
    <footer className="bg-primaryBlackColor text-white px-8 py-12">
      {showSubscribedPopup && (
        <SubscriptionModal
          isOpen={showSubscribedPopup}
          onClose={() => setShowSubscribedPopup(false)}
        />
      )}
      {/* Main footer content */}
      <div className="w-full md:w-[90%] mx-auto">
        {/* Logo and navigation links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="md:col-span-1">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/code-kenya-logo.png"
                alt="Code Kenya Logo"
                height={100}
                width={100}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subscribe section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-b border-gray-800 py-8 mb-8">
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold">Subscribe</h3>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="flex">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Address"
                className="w-full px-4 py-2 rounded-l bg-gray-800 text-white"
              />
              <button
                className="bg-white text-black px-6 py-2 rounded-r font-semibold"
                onClick={subscribeHandler}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="">
              <FaFacebook />
            </Link>
            <Link href="">
              <FaXTwitter />
            </Link>
            <Link href="">
              <FaYoutube />
            </Link>
            <Link href="">
              <FaLinkedin />
            </Link>
            <Link href="">
              <FaMedium />
            </Link>
            <Link href="">
              <FaInstagram />
            </Link>
            <Link href="">
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Legal links and copyright */}
        <div className="text-center text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <div>{`© ${currentYear} All Rights Reserved`}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
