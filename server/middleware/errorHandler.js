class AppError extends Error {
  constructor(message, code) {
    super(message);

    this.code = code || 500;
  }
}

const errorHandler = (err, req, res, next) => {
  const errorResponse = {
    errorCode: err.code || 500,
    errorMessage: err.message || "Si è verificato un errore imprevisto",
    type: err.constructor.name,
    ...(process.env.NODE_ENV === "development" && {
      details: {
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        userAgent: req.get("User-Agent"),
      },
    }),
  };

  console.error("Error occurred:", errorResponse);
  res.status(errorResponse.errorCode).json({ error: errorResponse.errorMessage });
};

module.exports = { errorHandler, AppError };
