import { FormControl, FormField, FormItem, FormLabel } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { cn } from "@lib/utils";
import type { SignUpFormField } from "@/types/components";

const EmailField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='email'
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
