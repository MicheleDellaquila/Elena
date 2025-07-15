const { signUpSchema, loginSchema } = require("@schemas/authSchemas");
const { enrollCourseSchema, searchCoursesSchema } = require("@schemas/coursesSchemas");

const routeValidationConfig = [
  { path: "/register", method: "POST", schema: signUpSchema },
  { path: "/login", method: "POST", schema: loginSchema },
  { path: "/:courseId/enroll/:userId", method: "POST", schema: enrollCourseSchema },
  { path: "/search", method: "POST", schema: searchCoursesSchema },
];

module.exports = routeValidationConfig;
