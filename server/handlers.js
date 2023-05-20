"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// returns an array of all companies
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const companyNames = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const result = await db.collection("companies").find().toArray();

    if (result) {
      result.forEach((item) => {
        companyNames.push(item.name);
      });
      res.status(200).json({
        status: 200,
        data: companyNames,
        message: "All The Companies",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of specific  company Items
const getSpecificCompanyItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { company } = req.params;

  const specificCompanyitems = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const allCompanyNames = await db.collection("companies").find().toArray();
    const allProductNames = await db.collection("products").find().toArray();

    if (allCompanyNames && allProductNames) {
      allCompanyNames.map((item) => {
        if (item.name.toLowerCase() === company.toLowerCase()) {
          allProductNames.map((product) => {
            if (product.companyId === item._id) {
              specificCompanyitems.push(product);
            }
          });
          res.status(200).json({
            status: 200,
            data: specificCompanyitems,
            message: "All The product for Specific Company",
          });
        }
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of all Items
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemsData = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const result = await db.collection("products").find().toArray();

    if (result) {
      result.forEach((item) => {
        let itemTempo = { ...item };

        itemsData.push(itemTempo);
      });
      res.status(200).json({
        status: 200,
        data: itemsData,
        message: "All The Products",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of all categories
const getAllCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const allCategoryData = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const result = await db.collection("products").find().toArray();

    if (result) {
      result.forEach((item) => {
        allCategoryData.push(item.category);
      });

      let uniqueCategories = [...new Set(allCategoryData)];
      res.status(200).json({
        status: 200,
        data: uniqueCategories,
        message: "All The Categories",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of specific  category Items
const getSpecificCategoryItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { category } = req.params;

  const specificCategoryitems = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const allProductNames = await db.collection("products").find().toArray();

    if (allProductNames) {
      allProductNames.map((item) => {
        if (item.category.toLowerCase() === category.toLowerCase()) {
          specificCategoryitems.push(item);
        }
      });
      res.status(200).json({
        status: 200,
        data: specificCategoryitems,
        message: "All The product for Specific Category",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// Add New Item to Cart
const addToCart = async (req, res) => {
  const { itemId, itemName, itemPrice, itemImage, quantity, itemStock } =
    req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const newItemToCart = await db.collection("cart").insertOne({
      _id: uuidv4(),
      itemId: itemId,
      itemName: itemName,
      itemPrice: itemPrice,
      itemImage: itemImage,
      quantity: quantity,
      itemStock: itemStock,
    });

    if (newItemToCart.acknowledged) {
      res.status(200).json({
        status: 200,
        data: newItemToCart,
        message: "The New Item is Added to Cart",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: "The Item is Not Added to Cart" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// updates a specified item in cart
const updateCartItemQuantity = async (req, res) => {
  const { updatedQuantity } = req.body;
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const updatecart = await db.collection("cart").updateOne(
      { _id: id },
      {
        $set: {
          quantity: updatedQuantity,
        },
      }
    );

    if (updatecart.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Cart is Updatad Successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        data: "The Cart Update is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// deletes a specified item from cart
const deleteCartItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const deleteItem = await db.collection("cart").deleteOne({ _id: id });

    if (deleteItem.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Item Is Deleted Successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: "The Operation Is Not Completed" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// returns an array of all Items in Cart
const getCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const cartItemsData = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const result = await db.collection("cart").find().toArray();

    if (result) {
      result.forEach((item) => {
        let itemTempo = { ...item };

        cartItemsData.push(itemTempo);
      });
      res.status(200).json({
        status: 200,
        data: cartItemsData,
        message: "All The Cart items",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// Add New order
const addToOrder = async (req, res) => {
  const {
    givenName,
    surname,
    email,
    address,
    province,
    postcode,
    country,
    payment,
    cardNumber,
    expiration,
    cvv,
    cartData,
  } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Ecommerce");

    const newItemToOrder = await db.collection("order").insertOne({
      _id: uuidv4(),
      givenName: givenName,
      surname: surname,
      email: email,
      address: address,
      province: province,
      postcode: postcode,
      country: country,
      payment: payment,
      cardNumber: cardNumber,
      expiration: expiration,
      cvv: cvv,
      cartData: cartData,
    });

    const cartDatabase = await db.collection("cart").find().toArray();
    const allproducts = await db.collection("products").find().toArray();

    let cartItemId = [];
    let quantityOfItem = [];

    cartDatabase.forEach((cartItem) => {
      allproducts.forEach((product) => {
        if (parseInt(cartItem.itemId) === product._id) {
          cartItemId.push(product._id);
          quantityOfItem.push(product.numInStock - parseInt(cartItem.quantity));
        }
      });
    });

    for (let i = 0; i < cartItemId.length; i++) {
      const update = await db.collection("products").updateOne(
        { _id: cartItemId[i] },
        {
          $set: {
            numInStock: quantityOfItem[i],
          },
        }
      );
    }

    const deleteCartItems = await db.collection("cart").deleteMany();

    if (newItemToOrder.acknowledged) {
      res.status(200).json({
        status: 200,
        data: newItemToOrder,
        message: "The New Order is Added to Order",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: "The Order is Not Added to Order" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

const getSpecificOrderById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { orderId } = req.params;

  const specificOrder = [];
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const allOrders = await db.collection("order").find().toArray();

    if (allOrders) {
      allOrders.map((item) => {
        if (item._id === orderId) {
          specificOrder.push(item);
        }
      });
      res.status(200).json({
        status: 200,
        data: specificOrder,
        message: "The Specific Order is Found",
      });
    } else {
      res.status(404).json({ status: 404, data: "The Data Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = {
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
};
