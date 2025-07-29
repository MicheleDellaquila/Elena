import type { SignUpFormField } from "@/types/components";
import { FormControl, FormField, FormItem, FormLabel } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { cn } from "@lib/utils";
import { EyeOff, Eye } from "lucide-react";
import useShowPassword from "./useShowPassword";

const PasswordField = ({ control }: SignUpFormField) => {
  const { showPassword, toggleShowPassword } = useShowPassword();
  const inputType = showPassword ? "text" : "password";
  const inputIcon = showPassword ? <Eye size={18} /> : <EyeOff size={18} />;

  return (
    <FormField
      control={control}
      name='password'
      render={({ field, fieldState: { error } }) => {
        const hasError = Boolean(error?.message);

        return (
          <FormItem className='mb-6'>
            <FormLabel>Password</FormLabel>
            <div className='relative'>
              <FormControl className='relative'>
                <Input
                  placeholder='********'
                  type={inputType}
                  className={cn(hasError && "border-red-500 focus-visible:ring-0")}
                  {...field}
                />
              </FormControl>
              <div
                className='absolute right-3 top-3 cursor-pointer'
                onClick={toggleShowPassword}
              >
                {inputIcon}
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default PasswordField;
