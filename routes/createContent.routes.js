const express = require("express");
const {
  createPodcastController,
  createAlbumController,
} = require("../controllers/generate_content/createContent.controller");
const createRouter = express.Router();

createRouter.post("/podcast", createPodcastController);
createRouter.post("/album", createAlbumController);

module.exports = createRouter;
