const express = require("express");
const { generateImageController} = require("../controllers/generate_content/generateImage.controler");
const {  generateAudioController } = require("../controllers/generate_content/generateAudio.controller");
const generateRouter = express.Router();

generateRouter.post("/image", generateImageController);
generateRouter.post("/audio", generateAudioController);

module.exports = generateRouter;
