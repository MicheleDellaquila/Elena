import { z } from "zod";

const zodSchemaValidation = <T>(
  schema: z.ZodType<T, any, any>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
};

export default zodSchemaValidation;
