const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentSchema");

const checkout = asyncHandler(async (req, res) => {
  const { email, card, basket, total } = req.body;
  if (!card) {
    res.status(400);
    throw new Error("Please enter your card details.");
  }

  if (!basket) {
    res.status(400);
    throw new Error("Your basket is empty.");
  }

  const pay = await Payment.create({
    email,
    card,
    basket,
    total,
  });

  if (pay) {
    res.status(200).send("Thank you for your purchase.");
  } else {
    res.status(400);
    throw new Error(
      "There was an error completing your purchase, please try again."
    );
  }
});

module.exports = { checkout };
