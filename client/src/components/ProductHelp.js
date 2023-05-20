import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const ProductHelp = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <PHelpContainer>
      <div>Step 1: Buy the product</div>
      <div>Step 2: ????</div>
      <div>
        Step 3: <Span>We </Span> profit.
      </div>
    </PHelpContainer>
  );
};

const PHelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const Span = styled.span`
  opacity: 0.3;
  font-size: 15px;
`;
