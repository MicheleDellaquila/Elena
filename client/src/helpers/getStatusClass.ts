import type { StatusCourse } from "@/types/data";

const getStatusClass = (status: StatusCourse) => {
  switch (status) {
    case "Completato":
      return "bg-green-100 text-green-600";
    case "In corso":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

export default getStatusClass;
