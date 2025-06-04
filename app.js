require("dotenv").config();
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errors");
const routes = require("./routes/index");

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

const corsOptions = {origin: ["https://www.wtwr.smelly.cc", "http://localhost:3001"]}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", indexRouter);

app.use(routes);
app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
