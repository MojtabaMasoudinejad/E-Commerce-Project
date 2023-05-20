import React from "react";
import styled from "styled-components";
import ItemPurchaseCounter from "./ItemPurchaseCounter";
import { useState, useEffect } from "react";

/**
 *
 * @returns an item in a specific display, which the user can add to their cart
 */
const ItemDisplayBox = ({
  itemName,
  itemPrice,
  itemStock,
  itemImg,
  itemId,
  cartLength,
  setCartLength,
}) => {
  // Indicates if the user has added target item to cart
  const [addedToCart, setAddedToCart] = useState(false);
  // indicates the quantity of the selected item that will be added to cart
  const [itemCounterState, setItemCounterState] = useState(1);
  // contains all relevant info of the selected item
  const [addToCartState, setAddToCartState] = useState({
    itemId: itemId,
    itemName: itemName,
    itemPrice: itemPrice,
    itemImage: itemImg,
    quantity: itemCounterState,
    itemStock: itemStock,
  });

  // changes the quantity of the selected item based on the user's input
  useEffect(() => {
    setAddToCartState({ ...addToCartState, quantity: itemCounterState });
  }, [itemCounterState]);

  const handleAddToCart = (ev) => {
    ev.preventDefault();
    setCartLength(cartLength + 1);
    // adds selected items and all relevant info to the user's cart
    fetch("/api/add-to-cart", {
      method: "POST",
      body: JSON.stringify(addToCartState),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setAddedToCart(true);
        } else {
          setCartLength(cartLength - 1);
          window.alert("Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  return (
    <Wrapper>
      <ItemInfoContainer>
        <ItemPic src={itemImg} />
        <ItemTextElement>{itemName}</ItemTextElement>
        <ItemTextElement>{itemPrice}</ItemTextElement>
      </ItemInfoContainer>

      <ItemPurchaseCounter
        itemCounterState={itemCounterState}
        setItemCounterState={setItemCounterState}
        itemStock={itemStock}
      />

      {itemStock > 0 && !addedToCart && (
        <AddToCart onClick={(ev) => handleAddToCart(ev)}>Add to Cart</AddToCart>
      )}
      {addedToCart && (
        <OutofStockButton
          disabled="true"
          style={{ backgroundColor: "#3dacc9", color: "white", border: "none" }}
        >
          Added to your cart
        </OutofStockButton>
      )}
      {itemStock <= 0 && (
        <OutofStockButton disabled="true">Out of Stock</OutofStockButton>
      )}
    </Wrapper>
  );
};

const ItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 250ms ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;

const OutofStockButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  z-index: 1;
  height: 50px;
  font-size: 20px;
  width: 70%;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
`;

export const AddToCart = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  z-index: 1;
  height: 50px;
  font-size: 20px;
  width: 70%;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  transition: all 300ms ease-in-out;
  &:hover,
  :focus {
    color: white;
    border: none;
  }
  &::before {
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-color: #3dacc9;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;

const ItemTextElement = styled.p`
  margin: 5px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  height: 385px;
  margin-bottom: 50px;
  margin-top: 80px;
`;

const ItemPic = styled.img`
  margin-bottom: 5px;
  border-radius: 10px;
  width: 150px;
  height: 200px;
`;

export default ItemDisplayBox;
