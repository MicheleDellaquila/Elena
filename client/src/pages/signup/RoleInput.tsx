import type { RoleInputProps } from "@/types/components";
import { cn } from "@lib/utils";
import { FormControl } from "@components/ui/Form";
import { Input } from "@components/ui/Input";

const RoleInput = ({ field, isInValid, value }: RoleInputProps) => {
  return (
    <label
      className={cn(
        "inline-flex items-center flex-1 text-base border-1 rounded-md px-2",
        isInValid && "border-red-500",
        !isInValid && "hover:border-blue-600"
      )}
    >
      <FormControl className='mr-2'>
        <Input className='w-4' type='radio' {...field} value={value} />
      </FormControl>
      {value}
    </label>
  );
};

export default RoleInput;
