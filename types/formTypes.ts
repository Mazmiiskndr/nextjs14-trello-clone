import {
  signInValidationSchema,
  signUpValidationSchema,
} from "@/validations/authValidation";
import { z } from "zod";
export type SignInFormValues = z.infer<typeof signInValidationSchema>;
export type SignUpFormValues = z.infer<typeof signUpValidationSchema>;
