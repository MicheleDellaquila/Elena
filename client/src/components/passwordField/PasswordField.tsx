import type { FormFieldProps } from "@/types/components";
import type { FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { cn } from "@lib/utils";
import useShowPassword from "./useShowPassword";
import Icon from "@components/icon/Icon";

const PasswordField = <T extends FieldValues>({ control }: FormFieldProps<T>) => {
  const { showPassword, toggleShowPassword } = useShowPassword();
  const inputType = showPassword ? "text" : "password";

  return (
    <FormField
      control={control}
      name={'password' as Path<T>}
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
              <Icon
                iconName={showPassword ? "Eye" : "EyeOff"}
                className='absolute right-3 top-3 cursor-pointer'
                onClick={toggleShowPassword}
              />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default PasswordField;
