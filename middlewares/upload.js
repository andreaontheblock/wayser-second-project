'use strict';

const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary');

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'wayser', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
