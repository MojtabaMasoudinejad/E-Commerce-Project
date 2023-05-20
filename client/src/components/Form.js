import { useEffect, useState } from "react";
import styled from "styled-components";
import ConfirmedPurchase from "./ConfirmedPurchase";
import { AddToCart } from "./ItemDisplayBox";

/**
 *
 * @returns a form which the user needs to fill out to complete the purchase.
 */
const Form = ({ confirmation, setConfirmation, setCartLength }) => {
  // confirmationNumber contains the order Id number
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  // customerInfo contains all the necessary contact info of the user, and the cart data
  const [customerInfo, setCustomerInfo] = useState({
    givenName: "something",
    surname: "",
    email: "",
    address: "",
    province: "",
    postcode: "",
    country: "",
    payment: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    cartData: "",
  });

  useEffect(() => {
    // fetches (GET) all cart data and pushes it into the customerInfo variable
    fetch(`/api/all-cart-items`)
      .then((res) => res.json())
      .then((resData) => {
        setCustomerInfo({ ...customerInfo, cartData: resData.data });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  // handleChange updates the customer info based on the input the user is changing
  const handleChange = (value, name) => {
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // submits the info to the Order DB and resets the cart
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/add-to-order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(customerInfo),
    })
      .then((res) => res.json())
      .then((resData) => {
        setConfirmation(true);
        setConfirmationNumber(resData.data.insertedId);
        setCartLength(0);
      });
  };

  return (
    <>
      {!confirmation && (
        <WrapperForm onSubmit={(e) => handleSubmit(e)}>
          <InputContainer>
            <span>Name:</span>
            <Input
              name="givenName"
              type="text"
              placeholder={"Your first name"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              name="surname"
              type="text"
              placeholder={"Your last name"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <InputContainer>
            <span>Email:</span>
            <Input
              required
              name="email"
              type="email"
              placeholder={"Your email"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <InputContainer>
            <span>Address:</span>
            <Input
              required
              name="address"
              type="text"
              placeholder={"Streetname"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              required
              name="province"
              type="text"
              placeholder={"Province"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              required
              name="postcode"
              type="text"
              placeholder={"Postcode"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              required
              name="country"
              type="text"
              placeholder={"Country"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <InputContainer>
            <span>Payment method:</span>
            <Input
              required
              name="payment"
              type="radio"
              value={"Credit"}
              id="credit"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <label for="credit">Credit</label>
            <Input
              required
              name="payment"
              type="radio"
              value={"Dedit"}
              id="dedit"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <label for="dedit">Debit</label>
          </InputContainer>
          <InputContainer>
            <Input
              required
              name="cardNumber"
              type="number"
              min="0000000000000000"
              max="9999999999999999"
              placeholder={"XXXX-XXXX-XXXX-XXXX"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              required
              name="expiration"
              type="date"
              placeholder={"Expiration date"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <Input
              required
              name="cvv"
              type="number"
              pattern="[0-9]*"
              min="000"
              max="999"
              placeholder={"CVV"}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <AddToCart style={{ width: "30%" }} type="submit">
            Submit
          </AddToCart>
        </WrapperForm>
      )}
      {confirmation && (
        <ConfirmedPurchase
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          customerInfo={customerInfo}
          confirmationNumber={confirmationNumber}
        />
      )}
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  & span {
    font-size: 30px;
    font-weight: 500;
  }
  & label {
    font-size: 25px;
  }
  & input {
    height: 30px;
    font-size: 15px;
    font-family: "Raleway", sans-serif;
  }
`;

const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 70vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  margin: 10px;
`;

export default Form;
