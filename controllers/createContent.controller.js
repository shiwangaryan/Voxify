const Album = require("../models/album.model");
const Podcast = require("../models/podcast.model");

const createPodcastController = async (req, res) => {
  try {
    // we abstract user ID after the middleware adds this field to req
    // and we send this in the author field for the podcast
    const userId = req.userId;
    const {
      title,
      category,
      description,
      transcription,
      audioURL,
      duration,
      thumbnailURL,
      language,
    } = req.body;

    const podcast = new Podcast({
      title,
      author: userId,
      category,
      description,
      transcription,
      audioURL,
      duration,
      thumbnailURL,
      language,
    });
    await podcast.save();
    return res
      .status(201)
      .json({ message: `Podcast- ${title} created successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again later." });
    console.error(`Podcast creation error: ${err}`);
  }
};

const createAlbumController = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, podcastList, thumbnailURL } = req.body;
    const album = new Album({
      title,
      author: userId,
      description: description || "",
      podcastList,
      thumbnailURL,
    });

    await album.save();
    return res
      .status(201)
      .json({ message: `Album- ${title} created successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again later." });
    console.error(`Album creation error: ${err}`);
  }
};

module.exports = { createPodcastController, createAlbumController };
