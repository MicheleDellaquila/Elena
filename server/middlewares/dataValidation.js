const { signUpSchema, loginSchema } = require("@schemas/authSchemas");

const routeValidationSchemas = { "/register": signUpSchema, "/login": loginSchema };

const dataValidation = async (req, _, next) => {
  const schema = routeValidationSchemas[req.path];
  if (!schema) throw new Error(`No validation schema found for path: ${req.path}`);

  try {
    const isValidate = await schema.validateAsync(req.body);
    if (!isValidate || typeof isValidate !== "object") throw new Error("Validation failed");
    else next();
  } catch (error) {
    console.error("Validation failed:", error.message);
    throw new Error(`Validation failed: ${error.message}`);
  }
};

module.exports = dataValidation;
