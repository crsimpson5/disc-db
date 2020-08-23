const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const apiRouter = require("./apiRouter");

const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/disc-db"

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRouter);

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
