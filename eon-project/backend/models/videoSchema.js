const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;