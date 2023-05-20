import React from "react";
import styled from "styled-components";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

/**
 *
 * @returns a plus and a minus button that change the quantity of the selected item. Shows the current quantity
 */
const ItemPurchaseCounter = ({
  itemCounterState,
  setItemCounterState,
  itemStock,
}) => {
  // either adds or removes 1 from the quantity
  const addToCounter = (counter) => {
    if (counter === 1) {
      if (itemStock > itemCounterState) {
        setItemCounterState((count) => count + 1);
      }
    } else {
      if (itemCounterState > 1) {
        setItemCounterState((count) => count - 1);
      }
    }
  };
  return (
    <>
      {itemStock > 0 && (
        <ItemQuantityDiv>
          <BiMinusCircle
            style={{ cursor: "pointer" }}
            size={25}
            onClick={() => addToCounter(-1)}
          />
          <p>{itemCounterState}</p>
          <BiPlusCircle
            style={{ cursor: "pointer" }}
            size={25}
            onClick={() => addToCounter(1)}
          />
        </ItemQuantityDiv>
      )}
      {itemStock <= 0 && (
        <ItemQuantityDiv style={{ color: "grey" }}>
          <BiMinusCircle style={{ cursor: "pointer" }} size={25} />
          <p>{itemStock}</p>
          <BiPlusCircle style={{ cursor: "pointer" }} size={25} />
        </ItemQuantityDiv>
      )}
    </>
  );
};

const ItemQuantityDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;
  align-items: center;
  width: 100%;
  & p {
    font-size: 15px;
  }
`;

export default ItemPurchaseCounter;
