import { createServerFn } from "@tanstack/react-start";
import {
  createServerValidate,
  getFormData,
  ServerValidateError,
} from "@tanstack/react-form/start";
import { UserRole } from "@/server/db/enums";
import { findUser, insertUser } from "@/server/db/queries";
import { hashPassword, verifyPassword } from "@/server/utils/crypto";
import { useAppSession } from "../auth";
import { ObjectId } from "mongodb";
import { LiteralError } from "../error";
import {
  loginFormOptions,
  registerFormOptions,
  zLoginForm,
  zRegisterForm,
} from "@/forms/auth";

const loginServerValidate = createServerValidate({
  ...loginFormOptions,
  onServerValidate: ({ value }) => {},
});

// const registerServerValidate = createServerValidate({
//   ...registerFormOptions,
//   onServerValidate: zRegisterForm,
// });

export const getLoginServerForm = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  },
);

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new LiteralError("MALFORMED_REQUEST");
    }

    return data;
  })
  .handler(async (ctx) => {
    const { email, password } = await loginServerValidate(ctx.data);

    const user = await findUser({ email });
    if (!user) {
      throw new LiteralError("INVALID_CREDENTIALS");
    }

    const isValidPassword = await verifyPassword(user.hashedPassword, password);
    if (!isValidPassword) {
      throw new LiteralError("INVALID_CREDENTIALS");
    }

    const session = await useAppSession();
    session.update({
      userId: user._id.toHexString(),
      role: user.role,
    });

    return {};
  });

export const registerFn = createServerFn({ method: "POST" })
  .inputValidator(zRegisterForm)
  .handler(async (ctx) => {
    try {
      const { firstName, lastName, email, password } = ctx.data;
      const existingUser = await findUser({ email });
      if (existingUser) {
        throw new LiteralError("EMAIL_ALREADY_USED");
      }

      const hashedPassword = await hashPassword(password);
      const user = await insertUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        hashedPassword,
        role: UserRole.USER,
      });

      const session = await useAppSession();
      session.update({
        userId: user._id.toHexString(),
        role: user.role,
      });

      return {};
    } catch (error) {
      if (error instanceof ServerValidateError) {
        return error.response;
      }

      throw new LiteralError("MALFORMED_REQUEST");
    }
  });

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    const user = await findUser({ _id: new ObjectId(session.data.userId) });

    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: {
        id: user._id.toHexString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  },
);
