import { Form } from "@components/ui/Form";
import FullNameField from "./FullNameField";
import EmailField from "@components/emailField/EmailField";
import RoleField from "./RoleField";
import PasswordField from "@components/passwordField/PasswordField";
import ButtonForm from "@components/buttonForm/ButtonForm";
import useSignUpForm from "./hook/useSignUpForm";
import Loader from "@components/ui/Loader";
import AlertForm from "@components/alertErrorsForm/AlertErrorsForm";

const SignUpForm = () => {
  const { form, FetcherForm, isSubmitting, signUpUser } = useSignUpForm();
  const { handleSubmit, formState: { errors} } = form;

  return (
    <Form {...form}>
      <FetcherForm onSubmit={handleSubmit(signUpUser)} noValidate>
        <AlertForm title='Modulo non valido' errors={errors} />
        <FullNameField control={form.control} />
        <EmailField control={form.control} />
        <RoleField control={form.control} />
        <PasswordField control={form.control} />
        <ButtonForm>
          {isSubmitting && <Loader primaryColor='#000' size='mini' />}
          Registrati
        </ButtonForm>
      </FetcherForm>
    </Form>
  );
};

export default SignUpForm;
