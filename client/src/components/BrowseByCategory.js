import { useEffect, useState } from "react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import styled, { keyframes } from "styled-components";
import { MainStoreContainer } from "./Browse";
import {
  AllBrandsContainer,
  NavBrowsing,
  NavButton,
  Wrapper,
} from "./BrowseByBrand";

/**
 *
 * @returns a list of mapped Buttons that allow the user to search by Category
 */
const BrowseByCategory = () => {
  // categories contains an array of all categories in inventory
  const [categories, setCategories] = useState(null);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    // On load, the page will scroll smoothly to the top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Gets all categories from DB, and sets it into categories variable
    fetch("/api/all-categories")
      .then((res) => res.json())
      .then((resData) => {
        setCategories(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (!categories) {
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
      <MainStoreContainer>
        <AllBrandsContainer>
          {categories.sort().map((category) => {
            return (
              <Wrapper>
                <NavBrowsing to={`/store/category/${category}`}>
                  <NavButton>
                    <span>{category}</span>
                  </NavButton>
                </NavBrowsing>
              </Wrapper>
            );
          })}
        </AllBrandsContainer>
      </MainStoreContainer>
    </>
  );
};
export default BrowseByCategory;

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
