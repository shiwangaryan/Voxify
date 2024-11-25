const Album = require("../../models/album.model");
const Podcast = require("../../models/podcast.model");

const createPodcastController = async (req, res) => {
  try {
    // we abstract user ID after the middleware adds this field to req
    // and we send this in the author field for the podcast
    const userId = req.userId;
    const {
      title,
      author,
      category,
      description,
      transcription,
      audioURL,
      duration,
      thumbnailURL,
    } = req.body;

    const podcast = new Podcast({
      title,
      userId,
      author,
      category,
      description,
      transcription,
      audioURL,
      duration,
      thumbnailURL,
    });
    await podcast.save();
    return res
      .status(201)
      .json({ message: `Podcast- ${title} created successfully` });
  } catch (err) {
    console.error(`Podcast creation error: ${err}`);
    return res.status(500).json({ message: "Server error. Please try again later." });
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
    console.error(`Album creation error: ${err}`);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { createPodcastController, createAlbumController };
