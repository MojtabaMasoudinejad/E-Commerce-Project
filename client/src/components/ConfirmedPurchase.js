import { useEffect, useState } from "react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MainStoreContainer } from "./Browse";

/**
 * @returns a confirmation message that shows the user's name an the order's confirmation number
 */
const ConfirmedPurchase = ({
  confirmation,
  setConfirmation,
  customerInfo,
  confirmationNumber,
}) => {
  // yourOrder contains the user's entire cart info and his contact information
  const [yourOrder, setYourOrder] = useState("");
  const SpinnerIcon = withBaseIcon({ size: 42 });

  useEffect(() => {
    if (confirmationNumber) {
      // if the confirmation number is valid, fetches (GET) in priority all the current order info from DB and sets it into yourOrder variable
      fetch(`/api/add-to-order/${confirmationNumber}`)
        .then((res) => res.json())
        .then((resData) => {
          setYourOrder(resData.data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [confirmationNumber]);

  if (!yourOrder) {
    return (
      <MainStoreContainer>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </MainStoreContainer>
    );
  }
  return (
    <>
      <CartMainContainer>
        <h3>
          Thank you for shopping with us, {yourOrder[0].givenName}{" "}
          {yourOrder[0].surname}!
        </h3>
        <div>
          <h4>Here is order's id: </h4>
          <h3>{confirmationNumber}</h3>
        </div>
        <div>
          <StyledNav to={"/"}>
            <h2>Home</h2>
          </StyledNav>
        </div>
      </CartMainContainer>
    </>
  );
};

const CartMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  & h4 {
    text-align: center;
  }
`;

const StyledNav = styled(NavLink)``;

const SpinnerMove = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 1.5s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.2;
`;

export default ConfirmedPurchase;
