import { useEffect, useState } from "react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MainStoreContainer } from "./Browse";
import CartItem from "./CartItem";
import { AddToCart } from "./ItemDisplayBox";

/**
 *
 * @param {number} cartLength
 * @returns Maps over and array of all items the user added to his/her Cart. User can add, remove or delete items.
 */
const Cart = ({
  setNavigationState,
  setConfirmation,
  cartLength,
  setCartLength,
}) => {
  // yourCart contains all items added by user
  const [yourCart, setYourCart] = useState(null);
  // totalPrice calculates and shows the total price of all items in cart
  const [totalPrice, setTotalPrice] = useState(0);
  // cartFlag allows the updating and refetching of the Cart from DB
  const [cartFlag, setCartFlag] = useState(false);
  const SpinnerIcon = withBaseIcon({ size: 42 });

  useEffect(() => {
    setNavigationState("store");
    // On load, the page will scroll smoothly to the top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Gets all items in the user's cart from DB and sets it into the yourCart variable. Resets the total price to 0 to avoid miscalculations.
    fetch(`/api/all-cart-items`)
      .then((res) => res.json())
      .then((resData) => {
        setYourCart(resData.data);
        setTotalPrice(0);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [cartFlag]);

  if (!yourCart) {
    return (
      <MainStoreContainer>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </MainStoreContainer>
    );
  }
  // if Cart is empty, the page will show this
  else if (!yourCart[0]) {
    return <CartMainContainer> Your cart is empty D: </CartMainContainer>;
  }
  return (
    <CartMainContainer>
      <Wrapper>
        {yourCart.sort().map((item) => {
          return (
            <CartItem
              itemName={item.itemName}
              itemPrice={item.itemPrice}
              quantity={item.quantity}
              total={item.itemPrice.replace("$", "") * item.quantity}
              itemImage={item.itemImage}
              setTotalPrice={setTotalPrice}
              itemId={item._id}
              setCartFlag={setCartFlag}
              cartFlag={cartFlag}
              yourCart={yourCart}
              _id={item._id}
              itemStock={item.itemStock}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          );
        })}
      </Wrapper>
      <h1>Total: ${(Math.round(totalPrice * 100) / 100).toFixed(2)}</h1>
      <NavButton to={"/form"}>
        <AddToCart
          style={{ width: "100%", padding: "0px 35px" }}
          onClick={() => setConfirmation(false)}
        >
          Checkout
        </AddToCart>
      </NavButton>
    </CartMainContainer>
  );
};

const CartMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

const NavButton = styled(NavLink)``;

const Wrapper = styled.div`
  width: 80%;
  margin-top: 80px;
`;

export default Cart;

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 1.5s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.5;
`;
