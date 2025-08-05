import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema, { type SignUpSchemaType } from "@schemas/auth/signUpSchema";

const useSignUpForm = () => {
  const form = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });
  const { Form: FetcherForm, submit, state, data } = useFetcher();
  const navigate = useNavigate();
  const { reset } = form;
  const isSubmitting = state === "submitting";

  useEffect(() => {
    if (!data) return;

    if ("user" in data) {
      reset();
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    }
  }, [state, reset, data, navigate]);

  const signUpUser = (data: SignUpSchemaType) =>
    submit(data, { method: "post", action: "/" });

  return { form, FetcherForm, isSubmitting, signUpUser };
};

export default useSignUpForm;
