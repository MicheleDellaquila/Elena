const { signUpSchema, loginSchema } = require("@schemas/authSchemas");
const { createCourseSchema, enrollCourseSchema, searchCoursesSchema } = require("@schemas/courseSchemas");
const { lessonsSchema } = require("@schemas/lessonSchemas");
const { profileSchema } = require("@schemas/userSchemas");

const routeValidationConfig = [
  { path: "/register", method: "POST", schema: signUpSchema },
  { path: "/login", method: "POST", schema: loginSchema },
  { path: "/create/course", method: "POST", schema: createCourseSchema },
  { path: "/:courseId/enroll/:userId", method: "POST", schema: enrollCourseSchema },
  { path: "/search", method: "POST", schema: searchCoursesSchema },
  { path: "/:courseId", method: "GET", schema: lessonsSchema },
  { path: "/profile", method: "PATCH", schema: profileSchema  },
];

module.exports = routeValidationConfig;
