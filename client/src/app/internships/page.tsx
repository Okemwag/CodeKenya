import React from "react";

import Hero from "./components/Hero";
import Popular from "./components/Popular";
import AvailableInternships from "./components/AvailableInternships";
import TopCompanies from "./components/TopCompanies";
import InternshipsSect from "../pages/homePage/components/InternshipsSect";
import Partners from "./components/Partners";
import InternshipsFooter from "./components/InternshipsFooter";

function page() {
  return (
    <div>
      <Hero />
      <Popular />
      <AvailableInternships />
      <TopCompanies />
      <InternshipsSect />
      <Partners />
      <InternshipsFooter />
    </div>
  );
}

export default page;
