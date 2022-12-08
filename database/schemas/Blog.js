const mongoose = require("mongoose");
const { Schema } = mongoose;

const Blog = new Schema({
  userId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  }
})

module.exports = Blog