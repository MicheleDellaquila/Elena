import type { ErrorFormItemProps } from "@/types/components";

const ErrorFormItem = ({ fieldName, message }: ErrorFormItemProps) => {
  return <li>{fieldName}: {message}</li>;
};

export default ErrorFormItem;
