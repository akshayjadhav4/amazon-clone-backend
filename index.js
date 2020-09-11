require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.stripe_private_key);

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// app port
const PORT = process.env.PORT || 2004;

// testing
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("AMOUNT IS ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
