import React, { useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/**
 *
 * @returns a header element including cart icon and nav links to the store pages
 */
const Header = ({ navigationState, cartLength, setCartLength }) => {
  useEffect(() => {
    // fetches (GET) the length of the current user's cart to show ammount in the badge
    fetch(`/api/all-cart-items`)
      .then((res) => res.json())
      .then((resData) => {
        setCartLength(resData.data.length);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  return (
    <>
      <StyledHeader>
        <NavContainer>
          {navigationState !== "store" && (
            <StyledNav to={"/store"}>Shop</StyledNav>
          )}
          {navigationState !== "home" && <StyledNav to={"/"}>Home</StyledNav>}
          {navigationState === "store" && (
            <>
              <StyledNav to={"/store/brands"}>Browse by Brands</StyledNav>
              <StyledNav to={"/store/categories"}>
                Browse by Categories
              </StyledNav>
            </>
          )}
          {navigationState === "home" && (
            <>
              <p>
                <a href="#about">About us</a>
              </p>
              <p>
                <a href="#contact">Info</a>
              </p>
            </>
          )}
        </NavContainer>
        <CartContainer>
          {cartLength > 0 && (
            <BadgeContainer>
              <span>{cartLength}</span>
            </BadgeContainer>
          )}
          <StyledNav to={"/cart"}>
            <BsCart4 size={35} />
          </StyledNav>
          <FaUser size={35} />
        </CartContainer>
      </StyledHeader>
    </>
  );
};

const BadgeContainer = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 20px;
  height: 20px;
  align-self: flex-start;
  margin-top: 13%;
  margin-left: -24%;
  position: absolute;
  background-color: #3dacc9;
  & span {
    color: whitesmoke;
    font-weight: 500;
  }
`;

const StyledNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10%;
  margin: 0px 10%;
  position: relative;
`;

const NavContainer = styled.div`
  margin: 0px 7%;
  display: flex;
  width: fit-content;
  gap: 60px;
  justify-content: space-between;
  align-items: center;
`;
const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98.9vw;
  background-color: black;
  height: 80px;
  z-index: 2;
  color: white;
  top: 0;
  & p {
    font-size: 25px;
    cursor: pointer;
    & a {
      text-decoration: none;
      color: white;
    }
  }
  & p:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  & p:hover:after {
    transform: scaleX(1);
  }
`;

export default Header;
