require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);
const indexRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//   req.user = {};
//   next();
// });
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
