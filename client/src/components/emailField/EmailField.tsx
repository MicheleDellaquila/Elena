import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import type { SignUpFormField } from "@/types/components";

const EmailField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='email'
      render={({ field }) => (
        <FormItem className='mb-4'>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder='E.g. mario.rossi@studenti.uniba.it' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
