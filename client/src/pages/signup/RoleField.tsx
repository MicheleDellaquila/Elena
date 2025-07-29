import { FormField } from "@components/ui/Form";
import RadioInput from "./RoleInput";
import type { SignUpFormField } from "@/types/components";
import { cn } from "@/lib/utils";

const RoleField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='role'
      render={({ field, fieldState: { error } }) => {
        const hasError = Boolean(error?.message);
        return (
          <fieldset className='flex gap-x-4 mb-4'>
            <legend className={cn('font-medium text-sm mb-1', hasError && "text-red-500")}>Ruolo</legend>
            <RadioInput field={field} isInValid={hasError} value='Studente' />
            <RadioInput field={field} isInValid={hasError} value='Insegnante' />
          </fieldset>
        );
      }}
    />
  );
};

export default RoleField;
