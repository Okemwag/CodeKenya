import React from "react";

import Hero from "./components/Hero";
import MCBootcamp from "./components/MCBootcamp";
import BootcampClass from "./components/BootcampClass";
import WhatYouWillLearn from "./components/WhatYouWillLearn";
import SummerInternship from "./components/SummerInternship";
import Partners from "./components/Partners";
import Footer from "../pages/components/Footer";

function page() {
  return (
    <div>
      <Hero />
      <MCBootcamp />
      <BootcampClass />
      <WhatYouWillLearn />
      <SummerInternship />
      <Partners />
      <Footer />
    </div>
  );
}

export default page;
