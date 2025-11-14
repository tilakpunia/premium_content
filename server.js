const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

// serve index.html
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Hello x402" });
});

// Payment-checking middleware
function checkPayment(req, res, next) {
  const paymentHeader = req.headers["x-payment"];

  if (!paymentHeader || paymentHeader !== "valid") {
    return res.status(402).json({
      error: "Payment Required",
      instructions: "Send X-PAYMENT: valid after completing payment."
    });
  }

  next(); // Payment is valid → move to next step (premium route)
}

app.get("/premium-content", (req, res) => {
  res.json({ message: "This is premium content" });
});

app.listen(PORT, () => {
  console.log('Server running at http://127.0.0.1:8000');
});