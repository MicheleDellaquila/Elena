const fs = require("fs/promises");
const path = require("path");

const getAbsolutePath = (relativePath) => path.join(__dirname, "../", relativePath);
const folderExist = async (folderPath) => await fs.access(folderPath);

const createFolders = async (destination) => {
  const absolutePath = getAbsolutePath(destination);

  try {
    await folderExist(absolutePath);
    console.error("Folder already exists:", absolutePath);
  } catch {
    await fs.mkdir(absolutePath, { recursive: true });
  }

  return absolutePath;
};

const deleteFile = async (filePath) => {
  const absolutePath = getAbsolutePath(filePath);

  try {
    await fs.unlink(absolutePath);
    console.log("File deleted successfully:", absolutePath);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const deleteDirectoryWithContents = async (dirPath) => {
  const absolutePath = getAbsolutePath(dirPath);

  try {
    await fs.rm(absolutePath, { recursive: true, force: true });
    console.log("Directory deleted successfully:", absolutePath);
  } catch (error) {
    console.error("Error deleting directory:", error);
  }
};

module.exports = { createFolders, folderExist, deleteFile, deleteDirectoryWithContents };
