import React from "react";
import styled from "styled-components";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

/**
 *
 * @returns a block of buttons that allow the user to update or delete any items in their cart
 */
const CartButtons = ({
  itemId,
  handleDelete,
  cartFlag,
  setCartFlag,
  _id,
  quantity,
  itemStock,
}) => {
  /**
   *
   * @param {string} operator
   * Adds or removes 1 from the current quantity of the selected item
   */
  const handleQuantityChange = (operator) => {
    let operatorResult;
    if (operator === "add") {
      operatorResult = quantity + 1;
    } else {
      operatorResult = quantity - 1;
    }

    fetch(`/api/add-to-cart/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({ updatedQuantity: operatorResult }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCartFlag(!cartFlag);
        } else {
          console.log("Unknown error has occured. Please try again.");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };

  return (
    <CartItemQuantityCounter>
      <StyledCartQuantityButtons
        disabled={quantity <= 1 ? true : false}
        onClick={() => {
          handleQuantityChange("remove");
        }}
      >
        <BiMinusCircle size={40} style={{ cursor: "pointer" }} />
      </StyledCartQuantityButtons>
      <StyledCartQuantityButtons
        disabled={itemStock === quantity ? true : false}
        onClick={() => {
          handleQuantityChange("add");
        }}
      >
        <BiPlusCircle size={40} style={{ cursor: "pointer" }} />
      </StyledCartQuantityButtons>
      <AiOutlineCloseSquare
        style={{ cursor: "pointer" }}
        size={40}
        onClick={() => {
          handleDelete(itemId);
        }}
      />
    </CartItemQuantityCounter>
  );
};
const StyledCartQuantityButtons = styled.button`
  border: none;
  background-color: transparent;
`;
const CartItemQuantityCounter = styled.div`
  display: flex;
  min-width: 25%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

export default CartButtons;
