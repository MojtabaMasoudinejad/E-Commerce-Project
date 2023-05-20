"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getCompanies,
  getItems,
  getAllCategories,
  getSpecificCompanyItems,
  getSpecificCategoryItems,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  addToOrder,
  getCartItems,
  getSpecificOrderById,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // fetches (GET) info from all companies
  .get("/api/all-companies", getCompanies)
  // fetches (GET) info from a specific company
  .get("/api/all-companies/:company", getSpecificCompanyItems)
  // fetches (GET) info from all items in inventory
  .get("/api/all-items", getItems)
  // fetches (GET) info from all categories
  .get("/api/all-categories", getAllCategories)
  // fetches (GET) info from a specific category
  .get("/api/all-categories/:category", getSpecificCategoryItems)
  // Adds the selected item info to the cart
  .post("/api/add-to-cart", addToCart)
  // Updates the quantity of selected item in the cart
  .patch("/api/add-to-cart/:id", updateCartItemQuantity)
  // deletes the selected item in the cart based on its ID
  .delete("/api/add-to-cart/:id", deleteCartItem)
  // Fetches (GET) all items in the cart
  .get("/api/all-cart-items", getCartItems)

  // transfers form data and cart info to order and adds the object to the Order DB
  .post("/api/add-to-order", addToOrder)
  // Fetches (GET) a specific order based on its ID
  .get("/api/add-to-order/:orderId", getSpecificOrderById)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
