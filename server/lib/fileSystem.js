const fs = require("fs/promises");
const path = require("path");

const folderExist = async (folderPath) => {
  return await fs.access(folderPath);
};

const createFolders = async (destination) => {
  const absolutePath = path.join(__dirname, "../", destination);

  try {
    await folderExist(absolutePath);
    console.error("Folder already exists:", absolutePath);
  } catch {
    await fs.mkdir(absolutePath, { recursive: true });
  }

  return absolutePath;
};

module.exports = { createFolders, folderExist };
