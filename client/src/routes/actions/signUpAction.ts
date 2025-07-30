import type { ActionFunction } from "react-router-dom";
import signUpSchema, { type SignUpSchemaType } from "@schemas/auth/signUpSchema";
import validateData from "@helpers/validateData";
import { signUp } from "@services/auth/authService";
import { successNotification, errorNotification } from "@lib/notification";
import { AxiosError } from "axios";

const signUpAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const parsedData = validateData(signUpSchema, data);

    if (!parsedData.success) return { error: parsedData.error };

    const createdUser = await signUp(parsedData.data as SignUpSchemaType);
    successNotification("Account creato con successo!", "Ora puoi accedere ai corsi di Elena");
    return { user: createdUser };
  } catch (error: any) {
    console.error("Error during sign up:", error);
    const errorTitle = "Errore durante la registrazione";

    if (error instanceof AxiosError) {
      const errorDescription = error.response?.data?.error || "Si è verificato un errore di rete";
      errorNotification(errorTitle, errorDescription);
      return;
    }

    errorNotification(errorTitle, error.message);
    return;
  }
};

export default signUpAction;
