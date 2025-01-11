"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-primaryBlackColor h-full md:h-screen text-white">
      <Navbar />
      <div className="flex flex-col justify-between md:flex-row w-[90%] mx-auto py-10 pb-32 md:py-20">
        {/* LEFT-TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 w-full md:w-[40%] mb-[3rem] md:mb-0 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 ml-[2.5%] md:ml-0"
          >
            <Image
              src="/icons/check-circle.png"
              alt="check circle"
              width={15}
              height={15}
            />
            <p className="text-xs">Most trusted education platform</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl font-black"
          >
            Grow your skills and <br /> advance career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base"
          >
            Code Kenya program combines a career-focused bootcamp with an
            internship in a tech Field, aimed to help you gain experience in the
            industry
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex w-full gap-3 lg:flex-row flex-col items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                title="Explore Programs"
                variant="btn_white"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                title="Watch Demo"
                variant="btn_watch_demo"
                icon="/icons/play.png"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT-IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hero-img.svg"
              alt="Student"
              height={600}
              width={600}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
