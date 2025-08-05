import type { AlertErrorsProps } from "@/types/components";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/Alert";
import Icon from "@components/icon/Icon";
import ErrorFormItem from "./ErrorFormItem";

const AlertErrorsForm = ({ title, description, errors }: AlertErrorsProps) => {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <Alert className="mb-4" variant='destructive'>
      <Icon iconName='CircleAlert' size={20} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description && <p>{description}</p>}
        <ul className='list-inside list-disc text-sm'>
          {Object.entries(errors).map(([key, error]) => (
            <ErrorFormItem key={key} fieldName={key} message={error?.message?.toString()} />
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default AlertErrorsForm;
