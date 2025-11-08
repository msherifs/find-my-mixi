import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LoginCat from "@/assets/images/login-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { getLoginServerForm, loginFn } from "@/server/functions/auth";
import { loginFormOptions, zLoginForm } from "@/forms/auth";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  loader: async () => {
    return { state: await getLoginServerForm() };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const { state } = Route.useLoaderData();

  const form = useForm({
    ...loginFormOptions,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  return (
    <>
      <img
        src={LoginCat}
        alt="Login Cat"
        className="absolute left-8 bottom-0 z-10 lg:w-auto w-22"
      />
      <form
        action={loginFn.url}
        method="POST"
        encType={"multipart/form-data"}
        className="flex flex-col items-center lg:w-[480px] gap-5 max-w-[80%]"
      >
        <h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
          {t("login.login")}
        </h2>
        <p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
          {t("login.enter_email_and_password")}
        </p>
        <form.Field
          name="email"
          validators={{ onChange: zLoginForm.shape.email }}
        >
          {(field) => (
            <MixiInput
              label={t("login.email")}
              placeholder="you@email.com"
              type="email"
              name="email"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              autoComplete="email"
              errorMessage={
                field.state.meta.errors[0]
                  ? t(field.state.meta.errors[0].message)
                  : undefined
              }
            />
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{ onChange: zLoginForm.shape.password }}
        >
          {(field) => (
            <MixiInput
              label={t("login.password")}
              placeholder="Password"
              type="password"
              name="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              autoComplete="current-password"
              errorMessage={
                field.state.meta.errors[0]
                  ? t(field.state.meta.errors[0].message)
                  : undefined
              }
            />
          )}
        </form.Field>
        <div className="w-full flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="font-semibold text-sm leading-5 tracking-normal text-primary"
          >
            {t("login.forgot_password")}
          </Link>
        </div>
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full"
              type="submit"
              disabled={!canSubmit}
              // onClick={() => form.handleSubmit()}
            >
              {isSubmitting ? t("login.signing_in") : t("login.sign_in")}
            </Button>
          )}
        </form.Subscribe>
        <div className="flex items-center w-full justify-center gap-1">
          <p className="font-normal text-sm leading-5 tracking-normal text-[#626262]">
            {t("login.dont_have_account")}
          </p>
          <Link
            to="/register"
            className="font-semibold text-sm leading-5 tracking-normal text-primary"
          >
            {t("login.sign_up")}
          </Link>
        </div>
      </form>
    </>
  );
}
