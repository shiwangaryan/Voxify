const mongoose = require("mongoose");

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {  // store creator ID
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: true,
  },
  audioURL: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

PodcastSchema.index({ likes: -1 });
PodcastSchema.index({ releaseDate: -1 });
PodcastSchema.index({ title: "text", author: "text" });

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
