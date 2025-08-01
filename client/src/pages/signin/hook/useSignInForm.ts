import { useFetcher } from "react-router-dom";
import { useForm } from "react-hook-form";
import { type SignInSchemaType } from "@schemas/auth/signInSchema";

const useSignInForm = () => {
  const form = useForm<SignInSchemaType>();
  const { Form: FetcherForm } = useFetcher();

  return { form, FetcherForm };
};

export default useSignInForm;
