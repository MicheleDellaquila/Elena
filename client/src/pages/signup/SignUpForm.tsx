import { Form } from "@components/ui/Form";
import FullNameField from "./FullNameField";
import EmailField from "@components/emailField/EmailField";
import RoleField from "./RoleField";
import PasswordField from "@components/passwordField/PasswordField";
import ButtonForm from "@components/buttonForm/ButtonForm";
import { useForm } from "react-hook-form";
import type { SignUpFormValues } from "@/types/data";

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>();

  return (
    <Form {...form}>
      <form noValidate>
        <FullNameField control={form.control} />
        <EmailField control={form.control} />
        <RoleField control={form.control} />
        <PasswordField control={form.control} />
        <ButtonForm>Registrati</ButtonForm>
      </form>
    </Form>
  );
};

export default SignUpForm;
