import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { useNavigate } from "react-router";
import styled from "styled-components";
import bgImage from "./assets/bg_2.png";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <AboutUsContainer id="about">
      <AboutUsTextContainer>
        <p style={{ lineHeight: "1.2" }}>
          We are a leading wearable tech store that offers a range of innovative
          products to enhance your lifestyle. Our products include fitness
          trackers, smartwatches, VR headsets, and more. We are committed to
          providing our customers with the latest and greatest wearable
          technology products and exceptional customer service.
        </p>
      </AboutUsTextContainer>
      <BrowseStoreButton
        onClick={() => {
          navigate("/store");
        }}
      >
        <p style={{ margin: "10px", fontSize: "35px" }}>Shop Now</p>
        <BiRightArrow size={40} />
      </BrowseStoreButton>
    </AboutUsContainer>
  );
};

const BrowseStoreButton = styled.button`
  position: relative;
  font-family: "Raleway", sans-serif;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
  display: flex;
  gap: 5px;
  height: fit-content;
  margin-top: 5%;
  padding: 0;
  align-items: center;
  &::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: white;
    position: absolute;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;
const AboutUsTextContainer = styled.div`
  font-weight: 400;
  display: flex;
  color: black;
  font-size: 35px;
  width: 60%;
  justify-self: flex-start;
`;

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  width: 100%;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center center;
`;

export default AboutUs;
