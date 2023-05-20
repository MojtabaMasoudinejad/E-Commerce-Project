import { useEffect, useState } from "react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MainStoreContainer } from "./Browse";
import ItemDisplayBox from "./ItemDisplayBox";

/**
 *
 * @param {number} cartLength
 * @returns Maps to a list of items, user can add item to the cart individually
 */
const BrowseABrand = ({ cartLength, setCartLength }) => {
  // brandItems is an array of the products of selected brand in inventory
  const [brandItems, setBrandItems] = useState(null);
  // company is the specific brand selected by the user
  const { company } = useParams();
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    // On load, the page will scroll smoothly to the top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // returns all items of selected brand through params
    fetch(`/api/all-companies/${company}`)
      .then((res) => res.json())
      .then((resData) => {
        setBrandItems(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (!brandItems) {
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
      <AllItemsContainer>
        {brandItems.sort().map((item) => {
          return (
            <ItemDisplayBox
              key={item._id}
              itemId={item._id}
              itemName={item.name}
              itemPrice={item.price}
              itemStock={item.numInStock}
              itemImg={item.imageSrc}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          );
        })}
      </AllItemsContainer>
    </>
  );
};
export default BrowseABrand;

const AllItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  justify-content: center;
  gap: 3%;
  width: 80%;
  margin: 50px auto 0px auto;
`;

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
