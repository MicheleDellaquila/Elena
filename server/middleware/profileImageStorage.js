const { diskStorage } = require("multer");
const recoverUserId = require("@helpers/recoverUserId");
const { createFolders } = require("@lib/fileSystem");
const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("@constants/uploadConstants");

const profileImageStorage = diskStorage({
  destination: async function (req, _, cb) {
    const userId = recoverUserId(req);
    const destination = `uploads/profileImages/${userId}`;
    cb(null, await createFolders(destination));
  },
  filename: async function (_, file, cb) {
    const { originalname } = file;
    const sanitizedName = originalname.trim().replace(/\s+/g, "_");
    cb(null, sanitizedName);
  },
  fileFilter: () => {
    const { mimetype } = file;
    if (!ALLOWED_FILE_TYPES.includes(mimetype)) cb(new Error("Tipo di file non supportato"));
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = profileImageStorage;
