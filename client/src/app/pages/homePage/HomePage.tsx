import React from "react";

import Hero from "./components/Hero";
import Overview from "./components/Overview";
import Ongoing from "./components/Ongoing";
import Discover from "./components/Discover";
import Testimonials from "./components/Testimonials";
import HowCKWorks from "./components/HowCKWorks";
import InternshipsSect from "./components/InternshipsSect";
import HowToApply from "./components/HowToApply";
import AlumniProfile from "./components/AlumniProfile";
// import Footer from "./components/Footer";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      <Overview />
      <Ongoing />
      <Discover />
      <Testimonials />
      <HowCKWorks />
      <InternshipsSect />
      <HowToApply />
      <AlumniProfile />
      <Footer />
    </div>
  );
}

export default HomePage;