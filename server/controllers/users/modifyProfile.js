const { AppError } = require("@middleware/errorHandler");
const recoverUserId = require("@helpers/recoverUserId");
const userModel = require("@models/users");
const { removePassword } = require("@lib/password");

const modifyProfile = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const userId = recoverUserId(req);

    const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { fullName }, { new: true });
    if (!updatedUser) throw new AppError("Abbiamo riscontrato un problema nell'aggiornamento del profilo", 404);

    res.status(200).json({ data: removePassword(updatedUser._doc) });
  } catch (error) {
    next(error);
  }
};

module.exports = modifyProfile;
