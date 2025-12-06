import { useForm } from "@tanstack/react-form";
import { mergeForm, useStore, useTransform } from "@tanstack/react-form-start";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ForgotPasswordCat from "@/assets/images/forgot-password-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { forgotPasswordFormOptions, zForgotPasswordForm } from "@/forms/auth";
import { forgotPasswordFn, getFormFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/forgot-password/")({
	component: RouteComponent,
	loader: async () => {
		return {
			state: await getFormFn(),
		}
	},
});

function RouteComponent() {
	const { state } = Route.useLoaderData();
	const { t } = useTranslation();

	const form = useForm({
		...forgotPasswordFormOptions,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	})

	const formErrors = useStore(form.store, (formState) => formState.errors);

	return (
		<>
			<img
				src={ForgotPasswordCat}
				alt="Forgot Password Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-36"
			/>
			<form
				action={forgotPasswordFn.url}
				method="post"
				encType="multipart/form-data"
				className="flex flex-col items-center lg:w-[480px] gap-5 max-w-[80%]"
			>
				<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center">
					{t("forgotPassword.forgot_password")}
				</h2>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
					{t("forgotPassword.no_worries")}
				</p>
				<form.Field
					name="email"
					validators={{ onChange: zForgotPasswordForm.shape.email }}
				>
					{(field) => (
						<MixiInput
							label={t("forgotPassword.email")}
							placeholder="you@email.com"
							type="email"
							name="email"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
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
				{formErrors.map((error) => (
					<p
						key={error}
						className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
					>
						{t(error)}
					</p>
				))}
				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
					]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" className="w-full" disabled={!canSubmit}>
							{isSubmitting
								? t("forgotPassword.sending")
								: t("forgotPassword.reset_password")}
						</Button>
					)}
				</form.Subscribe>
				<div className="flex items-center w-full justify-center gap-1">
					<p className="font-normal text-sm leading-5 tracking-normal text-[#626262]">
						{t("signup.already_have_account")}
					</p>
					<Link
						to="/login"
						className="font-semibold text-sm leading-5 tracking-normal text-primary"
					>
						{t("signup.login")}
					</Link>
				</div>
			</form>
		</>
	)
}
