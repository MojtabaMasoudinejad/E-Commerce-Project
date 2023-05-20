import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const OrderStatus = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <StatusContainer>
      <div>
        <h1>If it's your first time: Soon.</h1>
        <h3> If not; UPS lost your order, not our fault :( Sorry.</h3>
      </div>
    </StatusContainer>
  );
};

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
`;
