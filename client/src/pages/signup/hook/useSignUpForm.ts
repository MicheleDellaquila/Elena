import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema, { type SignUpSchemaType } from "@schemas/auth/signUpSchema";

const useSignUpForm = () => {
  const form = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });

  const signUpUser = (data: SignUpSchemaType) => {
    console.log("User signed up with data:", data);
  };

  return { form, signUpUser };
};

export default useSignUpForm;
