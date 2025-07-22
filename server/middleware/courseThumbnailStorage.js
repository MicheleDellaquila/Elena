const { diskStorage } = require("multer");
const { Types: { ObjectId } } = require("mongoose");
const { createFolders } = require("@lib/fileSystem");
const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("@constants/uploadConstants");

const courseThumbnailStorage = diskStorage({
  destination: async function (req, file, cb) {
    if(!req.courseId) req.courseId = new ObjectId().toString();
    const destination = `uploads/courses/${req.courseId}/thumbnail`;
    cb(null, await createFolders(destination));
  },
  filename: async function (req, file, cb) {
    const { originalname } = file;
    const sanitizedName = originalname.trim().replace(/\s+/g, "_");
    cb(null, sanitizedName);
  },
});

const courseThumbnailFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (!ALLOWED_FILE_TYPES.includes(mimetype)) cb(new Error("Tipo di file non supportato"));
  cb(null, true);
};

const limits = { fileSize: MAX_FILE_SIZE };

module.exports = { courseThumbnailStorage, courseThumbnailFilter, limits };
