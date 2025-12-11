import { useForm } from "@tanstack/react-form";
import { mergeForm, useStore, useTransform } from "@tanstack/react-form-start";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import z from "zod";
import LoginCat from "@/assets/images/login-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { loginFormOptions, zLoginForm } from "@/forms/auth";
import { getCurrentUserFn, getFormFn, loginFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
	validateSearch: z.object({
		error: z.string().optional(),
	}),
	loader: async () => {
		return {
			state: await getFormFn(),
		};
	},
	beforeLoad: async () => {
		const { user } = await getCurrentUserFn();
		if (user) {
			throw redirect({ to: "/map" });
		}
	},
});

function RouteComponent() {
	const { t } = useTranslation();
	const { state } = Route.useLoaderData();
	const { error } = Route.useSearch();

	const form = useForm({
		...loginFormOptions,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);

	return (
		<>
			<img
				src={LoginCat}
				alt="Login Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-22"
			/>
			<form
				action={loginFn.url}
				method="post"
				encType="multipart/form-data"
				className="flex flex-col items-center lg:min-w-[480px] gap-5 max-w-[80%]"
			>
				<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
					{t("login.login")}
				</h2>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
					{t("login.enter_email_and_password")}
				</p>
				<div className="w-full flex flex-col items-center gap-5">
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
					<div className="w-full flex items-center justify-end">
						{/* <div className="flex-grow flex items-center gap-2">
						<Checkbox
							className="border-[#D5D7DA] rounded-[4px] h-4 w-4"
							checked={rememberMeSelected}
							onCheckedChange={(checkedState) => {
								setRememberMeSelected(checkedState === true);
							}}
						/>
						<p className="font-normal text-sm leading-5 tracking-normal text-[#575757]">
							{t("login.remember_me")}
						</p>
					</div> */}
						<Link
							to="/forgot-password"
							className="font-semibold text-sm leading-5 tracking-normal text-primary"
						>
							{t("login.forgot_password")}
						</Link>
					</div>
					{formErrors.map((error) => (
						<p
							key={error}
							className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
						>
							{t(error)}
						</p>
					))}
					{error && (
						<p className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
							{t(`errors.${error}`)}
						</p>
					)}
					<form.Subscribe
						selector={(formState) => [
							formState.canSubmit,
							formState.isSubmitting,
						]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button className="w-full" type="submit" disabled={!canSubmit}>
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
				</div>
			</form>
		</>
	);
}
