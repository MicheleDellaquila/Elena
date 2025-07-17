const { Types } = require("mongoose");
const { ObjectId } = Types;

const validateObjectId = (id) => ObjectId.isValid(id) && new ObjectId(id).toString() === id;

module.exports = validateObjectId;
