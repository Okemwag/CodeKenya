import React from "react";

import Navbar from "../pages/components/Navbar";
import Hero from "./components/Hero";
import Payment from "./components/Payment";
import Pricing from "./components/Pricing";
import Footer from "../pages/components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Payment />
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
