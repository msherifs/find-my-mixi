import { createMiddleware } from "@tanstack/react-start";
import { useAppSession } from "./auth";
import { redirect } from "@tanstack/react-router";

// verifies that the user is an admin
export const adminMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await useAppSession();
  if (!session.data.role) {
    throw redirect("/login");
  }

  if (session.data.role !== "ADMIN") {
    throw redirect("/");
  }

  return next();
});
