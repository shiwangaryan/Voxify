const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: true,
  },
  showRealName: {
    type: Boolean,
    default: false,
  },
  profilePicURL: {
    type: String,
    required: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  FollowersList: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdPodcasts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
  createdAlbums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  favouritePodcasts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
  favouriteAlbums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  podcasterFollowed: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.index({ username: 1 });  // mongoose autimatically uses this when findbyone operation is done on username for login purpose
UserSchema.index({ username: 'text' });  // mongoose uses this while searching in app for username automatically

const User= mongoose.model('User', UserSchema);

module.exports= User;