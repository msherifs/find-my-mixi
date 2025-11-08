import { formOptions } from "@tanstack/react-form";
import z from "zod";

export const zLoginForm = z.object({
  email: z.email({ error: "errors.email" }),
  password: z
    .string({ error: "errors.required" })
    .min(6, { error: "errors.tooShort" }),
});

export const loginFormOptions = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

export const zRegisterForm = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const registerFormOptions = formOptions({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
});
