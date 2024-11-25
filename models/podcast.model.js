const mongoose = require("mongoose");
const { Schema }= mongoose;

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {  // store creator name
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
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
  likes: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
});

PodcastSchema.index({ likes: -1 });   // for easier sorting by likes
PodcastSchema.index({ releaseDate: -1 });   // for easier sorting by release date
PodcastSchema.index({ title: "text"});  // for easier searching by podcast name
PodcastSchema.index({ author: "text" });  // for easier searching by author
PodcastSchema.index({ category: "text" });  // for easier searching by category

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
