const multer = require("multer");
const path = require("path");
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/filesdirectory",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    console.log("Middleware cb", "v")
  },
});
const upload = multer({ storage: storage });

module.exports = upload;