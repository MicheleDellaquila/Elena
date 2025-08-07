const getCategoryClass = (category: string) => {
  switch (category.replace(/\s+/g, '').trim()) {
    case "DesignUI/UX":
      return "bg-purple-100 text-purple-600";
    case "Matematica":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
}

export default getCategoryClass;