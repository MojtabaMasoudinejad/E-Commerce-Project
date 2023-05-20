import React from "react";
import AboutUs from "./AboutUs";
import HeroDisplay from "./HeroDisplay";
import { useEffect } from "react";

/**
 *
 * @returns a standard homepage and sets the navigationState to "home"
 */
const HomePage = ({ setNavigationState }) => {
  useEffect(() => {
    setNavigationState("home");
  }, []);
  return (
    <>
      <HeroDisplay />
      <AboutUs />
    </>
  );
};

export default HomePage;
