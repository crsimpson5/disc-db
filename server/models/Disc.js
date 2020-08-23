const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  manufacturer: {
    type: String,
    trim: true,
    required: "Manufacturer name is required"
  },
  type: {
    type: String,
    trim: true,
    required: "Type is required"
  },
  description: {
    type: String,
    trim: true
  },
  imgSrc: {
    type: String,
    trim: true,
    required: "Image source is required"
  },
  speed: {
    type: Number,
    required: "Speed value is required",
    validate: [
      val => {
        return val >= 1 && val <= 15;
      },
      "Speed value must be between 1 and 14"
    ] 
  },
  glide: {
    type: Number,
    required: "Glide value is required",
    validate: [
      val => {
        return val >= 1 && val <= 7;
      },
      "Glide value must be between 1 and 7"
    ] 
  },
  turn: {
    type: Number,
    required: "Turn value is required",
    validate: [
      val => {
        return val >= -5 && val <= 1;
      },
      "Turn value must be between -5 and 1"
    ] 
  },
  fade: {
    type: Number,
    required: "Fade value is required",
    validate: [
      val => {
        return val >= 0 && val <= 5;
      },
      "Fade value must be between 0 and 5"
    ] 
  }
});

const Disc = mongoose.model("Disc", DiscSchema);

module.exports = Disc;
