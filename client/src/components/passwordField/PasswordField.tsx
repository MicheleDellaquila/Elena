import type { SignUpFormField } from "@/types/components";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
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
      render={({ field }) => (
        <FormItem className='mb-6'>
          <FormLabel>Password</FormLabel>
          <div className='relative'>
            <FormControl className='relative'>
              <Input placeholder='********' type={inputType} {...field} />
            </FormControl>
            <div
              className='absolute right-3 top-3 cursor-pointer'
              onClick={toggleShowPassword}
            >
              {inputIcon}
            </div>
          </div>
          <FormDescription className='text-sm'>
            La password deve contenere almeno 8 caratteri
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
