import zod from "zod";
import { regexUnibaEmail } from "@constants/index"

const signUpSchema = zod.object({
  fullName: zod.string().min(1, "Nome e cognome sono obbligatori"),
  email: zod.email("Email non valida").regex(regexUnibaEmail, "L'email deve appartenere al dominio uniba.it"),
  password: zod.string().min(8, "La password deve essere di almeno 8 caratteri"),
  role: zod.enum(["Studente", "Insegnante"], "Ruolo non valido")
});

export type SignUpSchemaType = zod.infer<typeof signUpSchema>;
export default signUpSchema;