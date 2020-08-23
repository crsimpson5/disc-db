const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const apiRouter = require("./apiRouter");

const PORT = 9000;

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../build"));

mongoose.connect("mongodb://localhost/disc-db", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use("/api", apiRouter);



app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
