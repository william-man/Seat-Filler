const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

//@Routes
const filmRoutes = require("./routes/filmsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
//@Middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World ASDF!");
});

app.use("/films", filmRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/booking", bookingRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App currently listening on port ${port}!`);
});
