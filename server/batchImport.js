const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const items = require("./data/items.json");
const companies = require("./data/companies.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let productList = [];

items.map((item) => {
  let tempProduct = {
    _id: [item._id],
    ...item,
  };
  productList.push(tempProduct);
});

let companiesList = [];
companies.map((company) => {
  let tempCompany = {
    _id: [company._id],
    ...company,
  };
  companiesList.push(tempCompany);
});

/**
 * imports all relevant data to mongoDB
 */
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    await db.collection("products").insertMany(productList);
    await db.collection("companies").insertMany(companiesList);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

batchImport();
