import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import {
  FaYoutube,
  FaLinkedin,
  FaMedium,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

const InternshipsFooter = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    general: {
      title: "General",
      links: [
        { name: "Internships", path: "/internships" },
        { name: "Tuition", path: "/tuition" },
        { name: "FAQs", path: "/" },
        { name: "Contact us", path: "/contact" },
      ],
    },
    bootcamps: {
      title: "Bootcamps",
      links: [
        { name: "Software Engineering", path: "/" },
        { name: "Entrepreneurship", path: "/" },
        { name: "Our SWE with AI", path: "/" },
      ],
    },
    resources: {
      title: "Resources",
      links: [{ name: "Code Kenya Blog", path: "/blog" }],
    },
    about: {
      title: "About",
      links: [
        { name: "Who we are", path: "/about-us" },
        { name: "Internship partners", path: "/internships" },
      ],
    },
  };

  const legalLinks = [{ name: "Deposit policy", path: "/tuition" }];

  return (
    <footer className="bg-primaryBlackColor text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Call to action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-internship-footer-bg1 bg-center rounded-lg p-6 transform scale-x-[-1]">
            <div className="transform scale-x-[-1] space-y-4">
              <h3 className="text-black font-semibold text-xl md:text-2xl">
                Become a Candidate
              </h3>
              <p className="text-slate-600 text-sm md:text-base w-full md:w-[60%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                cursus a dolor convallis efficitur.
              </p>
              <div>
                <Link href="/apply">
                  <button className="flex items-center gap-2 bg-white hover:bg-primaryRedColor hover:text-white px-6 py-3 text-primaryRedColor transition-colors duration-300 rounded">
                    Register Now <FaArrowRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-internship-footer-bg2 rounded-lg p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl md:text-2xl">
                Become a Partner
              </h3>
              <p className="text-sm md:text-base w-full md:w-[60%]">
                Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi
                sed efficitur dolor. Pelque augue risus, aliqu.
              </p>
              <button className="flex items-center gap-2 bg-white hover:bg-primaryGreenColor hover:text-white px-6 py-3 text-primaryGreenColor transition-colors duration-300 rounded">
                Register Now <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>

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
                placeholder="Enter your email Address"
                className="w-full px-4 py-2 rounded-l bg-gray-800 text-white"
              />
              <button className="bg-white text-black px-6 py-2 rounded-r font-semibold">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="https://youtube.com/@codekenya-h1v?si=cCMZ-nFJU25NymhN"
              target="_blank"
            >
              <FaYoutube />
            </Link>
            <Link
              href="https://www.linkedin.com/company/codekenya/"
              target="_blank"
            >
              <FaLinkedin />
            </Link>
            <Link href="https://medium.com/@raydon.mbehero" target="_blank">
              <FaMedium />
            </Link>
            <Link
              href="https://www.instagram.com/codekenya2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <FaInstagram />
            </Link>
            <Link href="https://github.com/muregii/codeKenya" target="_blank">
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Legal links and copyright */}
        <div className="text-center text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {legalLinks.map((link) => (
              <a key={link.name} href={link.path} className="hover:text-white">
                {link.name}
              </a>
            ))}
          </div>
          <div>{`© ${currentYear} All Rights Reserved`}</div>
        </div>
      </div>
    </footer>
  );
};

export default InternshipsFooter;
