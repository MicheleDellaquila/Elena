const { diskStorage } = require("multer");
const { createFolders } = require("./fileSystem");
const { MAX_TITLE_LENGTH, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("@constants/files");

const validateTitle = (title) => title && typeof title === "string" && title.trim().length < MAX_TITLE_LENGTH;

const courseThumbnailStorage = diskStorage({
  destination: async function (req, file, cb) {
    const { title } = req.body;
    if (!validateTitle(title)) cb(new Error("Il titolo è obbligatorio"));
    const destination = `uploads/${title.toLowerCase().replace(/\s+/g, "_")}`;
    cb(null, await createFolders(destination));
  },
  filename: async function (req, file, cb) {
    const { originalname } = file;
    const newFileName = originalname.trim().replace(/\s+/g, "_");
    cb(null, newFileName);
  },
  fileFilter: () => {
    const { mimetype } = file;
    if (!ALLOWED_FILE_TYPES.includes(mimetype)) cb(new Error("Tipo di file non supportato"));
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = courseThumbnailStorage;
