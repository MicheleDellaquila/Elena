const { signUpSchema, loginSchema } = require("@schemas/authSchemas");
const { enrollCourseSchema } = require("@schemas/coursesSchemas");

const routeValidationConfig = [
  { path: "/register", method: "POST", schema: signUpSchema },
  { path: "/login", method: "POST", schema: loginSchema },
  { path: "/:courseId/enroll/:userId", method: "POST", schema: enrollCourseSchema },
];

module.exports = routeValidationConfig;
