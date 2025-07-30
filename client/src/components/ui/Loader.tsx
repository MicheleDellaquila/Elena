import type { LoaderProps } from "@/types/components";

const loaderSizes = {
  mini: "h-4 w-4 border-3",
  small: "h-8 w-8 border-5",
  medium: "h-12 w-12 border-9",
} as const

const Loader = ({ primaryColor = "#1447e6", size = "medium" }: LoaderProps) => {
  const loaderClass = `${loaderSizes[size]} border-gray-300 border-r-[${primaryColor}] rounded-full animate-spin`;
  return <div className={loaderClass} />;
};

export default Loader;
