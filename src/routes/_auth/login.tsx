import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import LoginCat from "@/assets/images/login-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { parseServerError } from "@/lib/utils";
import { loginFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const router = useRouter();
	const [rememberMeSelected, setRememberMeSelected] = useState(false);
	const [formValues, setFormValues] = useState({ email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	const isSubmitDisabled =
		isSubmitting ||
		formValues.email.trim().length === 0 ||
		formValues.password.trim().length === 0;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitDisabled) return;

		setErrorMessage(null);
		setIsSubmitting(true);
		try {
			await loginFn({
				data: {
					email: formValues.email,
					password: formValues.password,
				},
			});
			toast.success(t("login.success"));
			await router.navigate({ to: "/" });
		} catch (error) {
			const fieldErrorMessages = parseServerError(error);
			const message =
				error instanceof Error && error.message === "Invalid credentials"
					? t("login.invalid_credentials")
					: t("login.error_generic");
			setFieldErrors(fieldErrorMessages);
			Object.keys(fieldErrorMessages).length === 0 && setErrorMessage(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<img
				src={LoginCat}
				alt="Login Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-22"
			/>
			<form
				onSubmit={handleSubmit}
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
				<MixiInput
					label={t("login.email")}
					placeholder="you@email.com"
					type="email"
					name="email"
					value={formValues.email}
					onChange={(event) =>
						setFormValues((prev) => ({
							...prev,
							email: event.target.value,
						}))
					}
					autoComplete="email"
					errorMessage={t(fieldErrors.email)}
				/>
				<MixiInput
					label={t("login.password")}
					placeholder="Password"
					type="password"
					name="password"
					value={formValues.password}
					onChange={(event) =>
						setFormValues((prev) => ({
							...prev,
							password: event.target.value,
						}))
					}
					autoComplete="current-password"
					errorMessage={t(fieldErrors.password)}
				/>
				<div className="w-full flex items-center justify-between">
					<div className="flex-grow flex items-center gap-2">
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
					</div>
					<Link
						to="/forgot-password"
						className="font-semibold text-sm leading-5 tracking-normal text-primary"
					>
						{t("login.forgot_password")}
					</Link>
				</div>
				<Button className="w-full" type="submit" disabled={isSubmitDisabled}>
					{isSubmitting ? t("login.signing_in") : t("login.sign_in")}
				</Button>
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
