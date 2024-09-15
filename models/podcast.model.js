const mongoose = require("mongoose");
const { Schema }= mongoose;

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {  // store creator ID
    type: Schema.Types.ObjectId,
    ref: 'User',
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

PodcastSchema.index({ likes: -1 });   // for easier sorting by likes
PodcastSchema.index({ releaseDate: -1 });   // for easier sorting by release date
PodcastSchema.index({ title: "text"});  // for easier searching by podcast name
PodcastSchema.index({ author: 1 });  // for easier searching by author

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
