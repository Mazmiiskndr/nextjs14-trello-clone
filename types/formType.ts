import { loginValidationSchema } from "@/validations/loginValidation";
import { z } from "zod";
export type LoginFormValues = z.infer<typeof loginValidationSchema>;
