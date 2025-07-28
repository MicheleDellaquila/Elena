import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import type { SignUpFormField } from "@/types/components";

const FullNameField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='fullName'
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Nome e Cognome</FormLabel>
          <FormControl>
            <Input placeholder='E.g. Mario Rossi' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FullNameField;
