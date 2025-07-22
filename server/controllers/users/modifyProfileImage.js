const { AppError } = require("@middleware/errorHandler");
const recoverUserId = require("@helpers/recoverUserId");
const findUserById = require("@helpers/findUserById");
const { deleteFile } = require("@lib/fileSystem");
const userModel = require("@models/users");

const modifyProfileImage = async (req, res, next) => {
  try {
    const { filename: profileImage } = req.file;
    if (!profileImage) throw new AppError("Nessuna immagine del profilo fornita", 404);

    const userId = recoverUserId(req);
    const user = await findUserById(userId);
    if (!user) console.error(`Utente con ID ${userId} non trovato`);

    // Delete the old profile image if it exists
    if (user.profileImage) {
      const filePath = `uploads/profileImages/${userId}/${user.profileImage}`;
      await deleteFile(filePath);
    }

    const updatedImage = await userModel.findByIdAndUpdate({ _id: userId }, { profileImage }, { new: true });
    if (!updatedImage) throw new AppError("Impossibile aggiornare l'immagine del profilo", 500);

    const { profileImage: image } = updatedImage._doc;
    res.status(200).json({ profileImage: image });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyProfileImage;
