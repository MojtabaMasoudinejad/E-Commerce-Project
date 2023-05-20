import React from "react";
import { useState } from "react";
import styled from "styled-components";
import backgroundImg from "./assets/hero_image_fitnessTech2.jpg";
import backgroundImg2 from "./assets/hero_image_2.jpg";
import backgroundImg3 from "./assets/hero_image_3.jpg";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

/**
 *
 * @returns a Hero display element that the user can change with arrows
 */
const HeroDisplay = () => {
  const [heroImageState, setHeroImageState] = useState(0);
  const clickHeroArrow = () => {
    if (heroImageState === 2) {
      setHeroImageState(0);
    } else {
      setHeroImageState(heroImageState + 1);
    }
  };
  return (
    <HeroMainContainer heroImageState={heroImageState}>
      <SlArrowLeft
        size={100}
        color="white"
        onClick={() => clickHeroArrow()}
        style={{ cursor: "pointer" }}
      />
      <SlArrowRight
        size={100}
        color="white"
        onClick={() => clickHeroArrow()}
        style={{ cursor: "pointer" }}
      />
    </HeroMainContainer>
  );
};

const HeroMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
  width: 100%;
  height: 90vh;
  margin-top: 80px;
  background-image: ${(props) =>
    props.heroImageState === 0
      ? `url(${backgroundImg})`
      : props.heroImageState === 1
      ? `url(${backgroundImg2})`
      : `url(${backgroundImg3})`};
  background-size: cover;
  background-position: center;
`;

export default HeroDisplay;
