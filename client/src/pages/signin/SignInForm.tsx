import type { SignInSchemaType } from "@schemas/auth/signInSchema";
import { Form } from "@components/ui/Form";
import EmailField from "@components/emailField/EmailField";
import PasswordField from "@components/passwordField/PasswordField";
import ButtonForm from "@components/buttonForm/ButtonForm";
import useSignInForm from "./hook/useSignInForm";

const SignInForm = () => {
  const { form, FetcherForm } = useSignInForm();

  return (
    <Form {...form}>
      <FetcherForm noValidate>
        <EmailField<SignInSchemaType> control={form.control} />
        <PasswordField<SignInSchemaType> control={form.control} />
        <ButtonForm>Accedi</ButtonForm>
      </FetcherForm>
    </Form>
  );
};

export default SignInForm;
