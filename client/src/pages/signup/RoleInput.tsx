import { FormControl} from "@components/ui/Form";
import { Input } from "@components/ui/Input";

const RoleInput = ({ field, value }: { field: any, value: string }) => {
  return (
    <label className='inline-flex items-center flex-1 border-1 rounded-md px-2 hover:border-blue-600'>
      <FormControl className='mr-2'>
        <Input className='w-4' type='radio' {...field} value={value} />
      </FormControl>
      {value}
    </label>
  );
};

export default RoleInput;
