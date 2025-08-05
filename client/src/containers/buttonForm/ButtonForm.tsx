import type { PropsWithChildren } from "react";
import type { ButtonFormProps } from "@/types/components";
import Button from "@components/ui/Button";

const ButtonForm = ({
  children,
  disabled,
  ...props
}: PropsWithChildren<ButtonFormProps>) => {
  return (
    <Button
      type='submit'
      className='w-full bg-blue-600 hover:bg-blue-700'
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonForm;
