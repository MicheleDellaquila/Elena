const { AppError } = require("./errorHandler");
const routeValidationConfig = require("@constants/routeValidationConfig");

const findMatchingRouteConfig = (path, method) => {
  return routeValidationConfig.find((route) => {
    const escapedPath = route.path.replace(/:[^/]+/g, "([^/]+)").replace(/\//g, "\\/");
    const routeRegex = new RegExp(`^${escapedPath}$`);
    return routeRegex.test(path) && route.method.toLowerCase() === method.toLowerCase();
  });
};

const dataValidation = async (req, _, next) => {
  const { path, method } = req;
  const routeConfig = findMatchingRouteConfig(path, method);

  if (!routeConfig) throw new AppError(`Nessun percorso trovato per la rotta ${path}`, 404);

  try {
    const dataToValidate = { ...req.body, ...req.params };
    const isValidate = await routeConfig.schema.validateAsync(dataToValidate);
    if (!isValidate || typeof isValidate !== "object") throw new AppError("Validation failed", 400);
    else next();
  } catch (error) {
    next(error);
  }
};

module.exports = dataValidation;
