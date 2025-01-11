import React from "react";

import Hero from "./components/Hero";
import Goals from "./components/Goals";
import Empowering from "./components/Empowering";
import Impact from "./components/Impact";
import Drivers from "./components/Drivers";
import MissionAndVision from "./components/MissionAndVision";
import LeadershipTeam from "./components/LeadershipTeam";
import Footer from "../pages/components/Footer";

function About() {
  return (
    <div>
      <Hero />
      <Goals />
      <Empowering />
      <Impact />
      <Drivers />
      <MissionAndVision />
      <LeadershipTeam />
      <Footer />
    </div>
  );
}

export default About;
