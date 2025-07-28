import type { ButtonHTMLAttributes } from "react";
import type { Control } from "react-hook-form";
import type { SignUpSchemaType } from "@schemas/auth/signUpSchema";

export interface LogoProps { className?: string; }
export interface ButtonFormProps extends ButtonHTMLAttributes<HTMLButtonElement> { disabled?: boolean; }
export interface SignUpFormField { control: Control<SignUpSchemaType> }