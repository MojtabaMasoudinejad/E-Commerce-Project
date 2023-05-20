import { useEffect, useState } from "react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MainStoreContainer } from "./Browse";

/**
 *
 * @returns a list of mapped Buttons that allow the user to search by Brand
 */
const BrowseByBrand = () => {
  // brandList contains an array of all brands in inventory
  const [brandList, setBrandList] = useState(null);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    // On load, the page will scroll smoothly to the top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Gets all brands from DB, and sets it into brandList
    fetch("/api/all-companies")
      .then((res) => res.json())
      .then((resData) => {
        setBrandList(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (!brandList) {
    return (
      <MainStoreContainer>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </MainStoreContainer>
    );
  }

  return (
    <MainStoreContainer>
      <AllBrandsContainer>
        {brandList.sort().map((company) => {
          return (
            <Wrapper>
              <NavBrowsing to={`/store/brand/${company}`}>
                <NavButton>
                  <span>{company}</span>
                </NavButton>
              </NavBrowsing>
            </Wrapper>
          );
        })}
      </AllBrandsContainer>
    </MainStoreContainer>
  );
};

export const AllBrandsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 70%;
  margin: 50px auto;
  gap: 2%;
`;

export const NavBrowsing = styled(Link)`
  text-decoration: none;
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 70px;

  width: 100%;
  transition: all 200ms ease-in-out;
  & span {
    font-size: 25px;
    font-weight: 600;
    font-family: "Raleway", sans-serif;
  }

  &:hover {
    scale: 1.1;
  }
`;

export const Wrapper = styled.div`
  width: 18%;
  margin-bottom: 20px;
`;

export default BrowseByBrand;

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
  scale: 1.2;
`;
