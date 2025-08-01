import type { SignInSchemaType } from "@schemas/auth/signInSchema";
import { Form } from "@components/ui/Form";
import EmailField from "@components/emailField/EmailField";
import PasswordField from "@components/passwordField/PasswordField";
import ButtonForm from "@components/buttonForm/ButtonForm";
import Loader from "@components/ui/Loader";
import AlertForm from "@components/alertErrorsForm/AlertErrorsForm";
import useSignInForm from "./hook/useSignInForm";

const SignInForm = () => {
  const { form, FetcherForm, isSubmitting, signInUser } = useSignInForm();
  const { handleSubmit, formState: { errors } } = form;

  return (
    <Form {...form}>
      <FetcherForm onSubmit={handleSubmit(signInUser)} noValidate>
        <AlertForm title='Modulo non valido' errors={errors} />
        <EmailField<SignInSchemaType> control={form.control} />
        <PasswordField<SignInSchemaType> control={form.control} />
        <ButtonForm>
          {isSubmitting && <Loader primaryColor='#000' size='mini' />}
          Accedi
        </ButtonForm>
      </FetcherForm>
    </Form>
  );
};

export default SignInForm;
