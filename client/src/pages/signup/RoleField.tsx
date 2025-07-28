import { FormField } from "@components/ui/Form";
import RadioInput from "./RoleInput";
import type { SignUpFormField } from "@/types/components";

const RoleField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='role'
      render={({ field }) => (
        <fieldset className='flex gap-x-4 mb-4'>
          <legend className='font-medium mb-1'>Ruolo</legend>
          <RadioInput field={field} value='Studente' />
          <RadioInput field={field} value='Insegnante' />
        </fieldset>
      )}
    />
  );
};

export default RoleField;
