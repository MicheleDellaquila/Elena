const { signUpSchema, loginSchema } = require("@schemas/authSchemas");
const { AppError } = require("./error");

const routeValidationSchemas = { "/register": signUpSchema, "/login": loginSchema };

const dataValidation = async (req, _, next) => {
  const schema = routeValidationSchemas[req.path];
  if (!schema) throw new Error(`No validation schema found for path: ${req.path}`, 404);

  try {
    const isValidate = await schema.validateAsync(req.body);
    if (!isValidate || typeof isValidate !== "object") throw new AppError("Validation failed", 400);
    else next();
  } catch (error) {
    console.error("Validation failed:", error.message);
    next(error);
  }
};

module.exports = dataValidation;
