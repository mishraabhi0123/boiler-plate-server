const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Name should have atleast 3 characters"],
    min: [15, "Name should not be more than 15 characters"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    min: [5, "Email should be atleast 5 characters"],
    max: [50, "Email cannot be more than 50 characters"]
  },

  password: {
    type: String,
    required: true,
  },
  
  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

module.exports = User