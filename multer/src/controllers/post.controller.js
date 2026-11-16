const sendFilesToIK = require("../config/imagekit");

const createPostController = async (req, res) => {
  try {
    let media = req.file;

    let uploadedImg = await sendFilesToIK(media.buffer, media.originalname);

    console.log(uploadedImg);

    return res.send("ok");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = createPostController;
