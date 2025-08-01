import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signInSchema, { type SignInSchemaType } from "@schemas/auth/signInSchema";

const useSignInForm = () => {
  const form = useForm<SignInSchemaType>({ resolver: zodResolver(signInSchema) });
  const { Form: FetcherForm, submit, state, data } = useFetcher();
  const navigate = useNavigate();
  const { reset } = form;
  const isSubmitting = state === "submitting";

  useEffect(() => {
    if (!data) return;

    if ("user" in data) {
      reset();
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    }
  }, [state, reset, data, navigate]);

  const signInUser = (data: SignInSchemaType) =>
    submit(data, { method: "post", action: "/accedi" });

  return { form, FetcherForm, isSubmitting, signInUser };
};

export default useSignInForm;
