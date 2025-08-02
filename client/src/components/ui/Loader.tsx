import { cn } from "@lib/utils";
import type { LoaderProps } from "@/types/components";

const loaderSizes = {
  mini: "h-4 w-4 border-3",
  small: "h-8 w-8 border-5",
  medium: "h-12 w-12 border-9",
} as const;

const Loader = ({ primaryColor = "#1447e6", size = "medium" }: LoaderProps) => {
  return (
    <div
      className={cn(loaderSizes[size], "border-gray-300 rounded-full animate-spin")}
      style={{ borderRightColor: primaryColor }}
    />
  );
};

export default Loader;
