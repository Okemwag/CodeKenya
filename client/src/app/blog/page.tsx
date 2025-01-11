import React from "react";

import Navbar from "../pages/components/Navbar";
import InsightsSection from "./components/InsightsSection";
import Footer from "../pages/components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <InsightsSection />
      <Footer />
    </div>
  );
};

export default page;
