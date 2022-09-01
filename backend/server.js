const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

//@Routes
const filmRoutes = require("./routes/filmsRoutes");
const adminRoutes = require("./routes/adminRoutes");
//@Middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World ASDF!");
});

app.use("/films", filmRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
