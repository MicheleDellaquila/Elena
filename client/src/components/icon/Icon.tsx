import type { ComponentProps, ComponentType } from "react";
import type { IconProps } from "@/types/components";
import * as LucideIcons from "lucide-react";
import { cn } from "@lib/utils";

const Icon = ({
  iconName,
  size = 16,
  color = "currentColor",
  className,
  ...props
}: ComponentProps<"span"> & IconProps) => {
  const IconComponent = LucideIcons[iconName] as ComponentType<LucideIcons.LucideProps>;

  if (!IconComponent) return null;

  return (
    <span className={cn("block w-fit cursor-pointer", className)} {...props}>
      <IconComponent size={size} color={color} />
    </span>
  );
};

export default Icon;
