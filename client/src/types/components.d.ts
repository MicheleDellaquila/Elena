import type { ButtonHTMLAttributes } from "react";
import type { Control } from "react-hook-form";
import type { SignUpFormValues } from "@/types/data";

export interface LogoProps { className?: string; }
export interface ButtonFormProps extends ButtonHTMLAttributes<HTMLButtonElement> { disabled?: boolean; }
export interface SignUpFormField { control: Control<SignUpFormValues> }