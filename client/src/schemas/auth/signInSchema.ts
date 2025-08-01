import * as zod from "zod";
import { regexUnibaEmail } from "@constants/index";

const signInSchema = zod.object({
  email: zod
    .email("Email non valida")
    .regex(regexUnibaEmail, "L'email deve appartenere al dominio uniba.it"),
  password: zod
    .string("La password deve essere di almeno 8 caratteri")
    .min(8, "La password deve essere di almeno 8 caratteri"),
});

export type SignInSchemaType = zod.infer<typeof signInSchema>;
export default signInSchema;
