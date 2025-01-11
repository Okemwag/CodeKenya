import React from "react";

import TeamCarousel from "@/app/pages/components/TeamCarousel";

const LeadershipTeam = () => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-primaryGreenColor text-center text-2xl mb-[1rem] font-bold">
        Our leadership team
      </h1>
      <div className="container mx-auto py-8">
        <TeamCarousel />
      </div>
    </div>
  );
};

export default LeadershipTeam;
