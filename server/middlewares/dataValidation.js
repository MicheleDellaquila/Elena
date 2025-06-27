const { signUpSchema } = require("@schemas/authSchemas");

const schemas = {
  "/register": signUpSchema,
};

const dataValidation = async (req, _, next) => {
  const body = req.body;
  const schema = schemas[req.path];
  if (!schema) throw new Error(`No validation schema found for path: ${req.path}`);

  try {
    const isValidate = await schema.validateAsync(body);
    if (!isValidate || typeof isValidate !== 'object') throw new Error("Validation failed")
    else next();
  } catch (error) {
    console.error("Validation failed:", error.message);
    throw new Error(`Validation failed: ${error.message}`);
  }
};

module.exports = dataValidation;
