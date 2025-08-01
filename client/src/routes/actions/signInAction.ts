import type { ActionFunction } from "react-router-dom";
import signInSchema, { type SignInSchemaType } from "@schemas/auth/signInSchema";
import validateData from "@helpers/validateData";
import { signIn } from "@services/auth/authService";
import { successNotification, errorNotification } from "@lib/notification";
import { AxiosError } from "axios";

const signInAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const parsedData = validateData(signInSchema, data);

    if (!parsedData.success) return { error: parsedData.error };

    const createdUser = await signIn(parsedData.data as SignInSchemaType);
    successNotification(
      "Accesso effettuato con successo!",
      "Ora puoi accedere ai corsi di Elena"
    );
    return { user: createdUser };
  } catch (error: any) {
    console.error("Error during sign in:", error);
    const errorTitle = "Errore durante l'accesso";

    if (error instanceof AxiosError) {
      const errorDescription =
        error.response?.data?.error || "Si è verificato un errore di rete";
      errorNotification(errorTitle, errorDescription);
      return;
    }

    errorNotification(errorTitle, error.message);
    return;
  }
};

export default signInAction;
