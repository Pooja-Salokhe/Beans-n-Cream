const express = require("express");
const app = express();
port = 3080;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const orders = require("./mock-JSON/orders.json");
const payments = require("./mock-JSON/payments.json");
const prices = require("./mock-JSON/prices.json");

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/payments", (req, res) => {
  res.json(payments);
});

app.get("/api/prices", (req, res) => {
  res.json(prices);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
