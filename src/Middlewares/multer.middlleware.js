import multer from "multer";

const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    crypto.randomUUID((err, raw) => {
      if (err) return cb(err);
      cb(null, `${file.originalname}-${raw}`);
    });
  },
});

export const upload = multer({ storage });
