class AppError extends Error {
  constructor(message, code) {
    super(message);

    this.code = code || 500;
  }
}

const errorHandler = (err, req, res, next) => {
  const errorResponse = {
    errorCode: err.code || 500,
    errorMessage: err.message || "An unexpected error occurred",
    errorContext: {
      requestId: req.id || "N/A",
      requestParams: req.params,
      requestBody: req.body,
    },
    timestamp: new Date().toISOString(),
  };

  return res.status(err.status || errorResponse.errorCode).json({ error: errorResponse.errorMessage });
};

module.exports = { errorHandler, AppError };
