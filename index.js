const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3010;

app.use(express.static('static'));

function cartTotalFunc(newItemPrice, cartTotal) {
  let result = newItemPrice + cartTotal;
  return result.toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(cartTotalFunc(newItemPrice, cartTotal));
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discountedPercent = isMember ? 10 : 0;
  let discount = cartTotal * (discountedPercent / 100);
  let finalPrice = cartTotal - discount;

  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = 5;
  let finalTax = cartTotal * (tax / 100);
  res.send(finalTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let distanceCovered = shippingMethod === 'Standard' ? 50 : 100;
  let estimatedFinalDelivery = distance / distanceCovered;
  res.send(estimatedFinalDelivery.toString());
});


app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});


app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoing = purchaseAmount * 2;
  res.send(loyaltyPoing.toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
