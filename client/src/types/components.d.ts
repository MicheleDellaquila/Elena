import type { ButtonHTMLAttributes } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldErrors,
  Message,
} from "react-hook-form";
import type { SignUpSchemaType } from "@schemas/auth/signUpSchema";
import * as LucideIcons from "lucide-react";

export interface LogoProps {
  className?: string;
}

export interface ButtonFormProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export interface SignUpFormField {
  control: Control<SignUpSchemaType>;
}

export interface RoleInputProps {
  field: ControllerRenderProps<any, string>;
  isInValid: boolean;
  value: string;
}

export interface LoaderProps {
  primaryColor?: string;
  size: "mini" | "small" | "medium";
}

export interface IconProps {
  iconName: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
}

export interface AlertErrorsProps {
  title: string;
  description?: string;
  errors: FieldErrors;
}

export interface ErrorFormItemProps {
  fieldName: string;
  message: FieldErrors[string] | Message | undefined;
}
