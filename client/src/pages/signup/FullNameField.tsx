import { FormControl, FormField, FormItem, FormLabel } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { cn } from "@lib/utils";
import type { SignUpFormField } from "@/types/components";

const FullNameField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='fullName'
      render={({ field, fieldState: { error } }) => {
        const hasError = error?.message;
        return (
          <FormItem className='mb-4'>
            <FormLabel>Nome e Cognome</FormLabel>
            <FormControl>
              <Input
                placeholder='E.g. Mario Rossi'
                className={cn(hasError && "border-red-500 focus-visible:ring-0")}
                {...field}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default FullNameField;
