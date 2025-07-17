const { diskStorage } = require("multer");
const { createFolders } = require("./fileSystem");
const { MAX_TITLE_LENGTH, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("@constants/files");

const validateTitle = (title) => title && typeof title === "string" && title.trim().length < MAX_TITLE_LENGTH;

const fileDestination = async (req, _, callback) => {
  const { title } = req.body;

  if (!validateTitle(title)) callback(new Error("Il titolo è obbligatorio"));

  const destination = `uploads/${title.toLowerCase().trim()}`;
  callback(null, await createFolders(destination));
};

const fileName = (_, file, cb) => {
  const { originalname } = file;
  const newFileName = originalname.trim().replace(/\s+/g, "_");
  cb(null, newFileName);
};

const fileFilter = (_, file, cb) => {
  const { mimetype } = file;
  if (!ALLOWED_FILE_TYPES.includes(mimetype)) cb(new Error("Tipo di file non supportato"));
  cb(null, true);
};

const courseThumbnailStorage = diskStorage({
  destination: fileDestination,
  filename: fileName,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = courseThumbnailStorage;
