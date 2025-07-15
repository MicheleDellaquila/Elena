const coursesModel = require("@models/courses");

const validatePaginationParams = (page, limit) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Validate pagination parameters
  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) throw new AppError("Parametri di paginazione non validi", 400);
  if (limitNum > 100) throw new AppError("Limite massimo di 100 elementi per pagina", 400);

  return { page: pageNum, limit: limitNum };
};

const calculateOffset = (page, limit) => {
  return (page - 1) * limit;
};  

const getPaginationParams = async (current_page, limit = 12) => {
  const total_courses = await coursesModel.countDocuments();
  const total_pages = Math.ceil(total_courses / limit);
  const next_page = current_page < total_pages ? current_page + 1 : null;
  const prev_page = current_page > 1 ? current_page - 1 : null;

  return {
    total_courses,
    current_page,
    total_pages,
    next_page,
    prev_page,
  };
};

module.exports = { validatePaginationParams, calculateOffset, getPaginationParams };
