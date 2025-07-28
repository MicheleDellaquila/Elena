import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import type { SignUpFormField } from "@/types/components";

const PasswordField = ({ control }: SignUpFormField) => {
  return (
    <FormField
      control={control}
      name='password'
      render={({ field }) => (
        <FormItem className="mb-6">
          <FormLabel>Password</FormLabel>
          <FormControl className="relative">
            <Input placeholder='********' type='password' {...field} />
          </FormControl>
          <FormDescription className="text-sm">La password deve contenere almeno 8 caratteri</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
