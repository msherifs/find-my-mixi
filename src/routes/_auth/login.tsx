import { useForm } from "@tanstack/react-form";
import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginCat from "@/assets/images/login-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { loginFormOptions, zLoginForm } from "@/forms/auth";
import { getIsAuthenticated, loginFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
	beforeLoad: async () => {
		const isAuthenticated = await getIsAuthenticated();
		if (isAuthenticated) {
			throw redirect({ to: "/map" });
		}
	},
});

function RouteComponent() {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();
	// const [rememberMeSelected, setRememberMeSelected] = useState(false);

	const form = useForm({
		...loginFormOptions,
		onSubmit: async ({ value }) => {
			setErrorMessage(null);
			try {
				await loginFn({ data: value });
				navigate({ to: "/map" });
			} catch (error) {
				const message =
					error instanceof Error && error.message === "ath.003"
						? t("login.invalid_credentials")
						: t("login.error_generic");
				setErrorMessage(message);
			}
		},
	});

	return (
		<>
			<img
				src={LoginCat}
				alt="Login Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-22"
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="flex flex-col items-center lg:w-[480px] gap-5 max-w-[80%]"
			>
				<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
					{t("login.login")}
				</h2>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
					{t("login.enter_email_and_password")}
				</p>
				{errorMessage && (
					<p className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
						{errorMessage}
					</p>
				)}
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
			</form>
		</>
	);
}
