const express = require("express");
const router = express.Router();

const disc = require("./discController");

router.route("/")
  .get(disc.findAll)
  .post(disc.create)
  .put(disc.updateMany);

router.route("/:id")
  .get(disc.findById)
  .delete(disc.deleteOne);

module.exports = router;
