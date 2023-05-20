import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import bgPic1 from "./assets/rockclimber1.jpg";

/**
 *
 * @param {string} navigationState
 * @returns the presentation page of the Store with slide in text
 */
const Browse = ({ setNavigationState }) => {
  // On load, the page will scroll smoothly to the top
  useEffect(() => {
    setNavigationState("store");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <MainStoreContainer
        style={{
          backgroundImage: `url(${bgPic1})`,
          backgroundSize: "cover",
        }}
      >
        <StorePageContentContainer>
          <SlideInTextDiv>
            <p>Over 70 Major Brands</p>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <p>More than 200 Products</p>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <p>International Shipping</p>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <p>Satisfaction Guaranteed</p>
          </SlideInTextDiv>
        </StorePageContentContainer>
      </MainStoreContainer>
    </>
  );
};

const SlideInFromLeft = keyframes`
from {
  margin-left: -150%;
  opacity: 0;
}
to {
  margin-left: 0%;
  opacity: 1;
}
`;

const SlideInTextDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 15%;
  width: 100%;
  & p {
    font-size: 45px;
    font-weight: 500;
    color: #031345;
  }
`;

const StorePageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  height: 70vh;
  justify-content: flex-start;
  padding-top: 5%;
  align-self: center;
  width: 40%;
  overflow: hidden;
  & ${SlideInTextDiv}:nth-child(1) {
    animation: ${SlideInFromLeft} 1.5s ease-in-out;
  }
  & ${SlideInTextDiv}:nth-child(2) {
    animation: ${SlideInFromLeft} 1.75s ease-in-out;
  }
  & ${SlideInTextDiv}:nth-child(3) {
    animation: ${SlideInFromLeft} 2s ease-in-out;
  }
  & ${SlideInTextDiv}:nth-child(4) {
    animation: ${SlideInFromLeft} 2.25s ease-in-out;
  }
`;

export const MainStoreContainer = styled.div`
  min-height: 90vh;
  height: fit-content;
  margin-top: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

export default Browse;
