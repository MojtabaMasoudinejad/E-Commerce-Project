import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CartButtons from "./CartButtons";

/**
 *
 * @returns a single item through mapping in Cart.js
 */
const CartItem = ({
  itemName,
  itemPrice,
  quantity,
  total,
  itemImage,
  setTotalPrice,
  itemId,
  setCartFlag,
  cartFlag,
  yourCart,
  _id,
  itemStock,
  cartLength,
  setCartLength,
}) => {
  /**
   *
   * @param {string} itemId
   * Deletes a single target item from the cart DB
   */
  const handleDelete = (itemId) => {
    setCartLength(cartLength - 1);
    fetch(`/api/add-to-cart/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCartFlag(!cartFlag);
        } else {
          setCartLength(cartLength + 1);
          window.alert("Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };

  useEffect(() => {
    setTotalPrice((price) => (price += total));
  }, [yourCart]);

  return (
    <IndividualItemContainer>
      <ItemPicContainer src={itemImage} />
      <ItemDetailsContainer>
        <p>{itemName}</p>
        <p>
          <span>Price:</span> {itemPrice}
        </p>
        <p>
          <span>Quantity:</span> {quantity}
        </p>
      </ItemDetailsContainer>
      <ItemDetailsContainer>
        <p> ${(Math.round(total * 100) / 100).toFixed(2)}</p>
      </ItemDetailsContainer>
      <CartButtons
        itemId={itemId}
        handleDelete={handleDelete}
        cartFlag={cartFlag}
        setCartFlag={setCartFlag}
        _id={_id}
        quantity={quantity}
        itemStock={itemStock}
        cartLength={cartLength}
        setCartLength={setCartLength}
      />
    </IndividualItemContainer>
  );
};

const ItemDetailsContainer = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  padding-left: 30px;
  & p {
    margin: 0px;
    font-size: 20px;
  }
  & p:nth-child(1) {
    font-size: 20px;
    font-weight: 500;
  }
  & span {
    font-weight: 500;
  }
`;
const ItemPicContainer = styled.img`
  width: 125px;
  height: 125px;
  border-radius: 20px;
`;
const IndividualItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 25px;
  min-width: 100%;
  height: 20vh;
  background-color: #e8e8e7;
  border-radius: 20px;
  margin: 0px auto 20px auto;
  & :nth-child(2) {
    align-items: flex-start;
  }
`;

export default CartItem;
