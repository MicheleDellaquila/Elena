import type { FormFieldProps } from "@/types/components";
import type { FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { cn } from "@lib/utils";

const EmailField = <T extends FieldValues>({ control }: FormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={'email' as Path<T>}
      render={({ field, fieldState: { error } }) => {
        const hasError = error?.message;
        return (
          <FormItem className='mb-4'>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder='E.g. mario.rossi@studenti.uniba.it'
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

export default EmailField;
