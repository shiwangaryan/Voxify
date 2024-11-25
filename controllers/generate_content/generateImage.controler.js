import OpenAI from 'openai';
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateImageController = async (req, res) => {
  try {
    const { description } = req.body;

    const response = await openai.image.generate({
      model: "dall-e-3",
      prompt: description,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log("Image generated successfully");
    return res.status(200).json({imageUrl});
  } catch (error) {
    console.log("Error in generateImageController: ", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = generateImageController;
