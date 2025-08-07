import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import type { ButtonLinkProps } from "@/types/components";
import Button from "./Button";

const ButtonLink = ({ className, children, ...rest }: PropsWithChildren<ButtonLinkProps & ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <Button className={className} variant='link' {...rest}>{children}</Button>;
};

export default ButtonLink;
