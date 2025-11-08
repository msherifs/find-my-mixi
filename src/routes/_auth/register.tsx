import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SignupCat from "@/assets/images/signup-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { parseServerError } from "@/lib/utils";
import { registerFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const router = useRouter();
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	const isSubmitDisabled =
		isSubmitting ||
		formValues.firstName.trim().length === 0 ||
		formValues.lastName.trim().length === 0 ||
		formValues.email.trim().length === 0 ||
		formValues.password.trim().length === 0;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitDisabled) return;

		setErrorMessage(null);
		setIsSubmitting(true);
		try {
			await registerFn({
				data: {
					firstName: formValues.firstName,
					lastName: formValues.lastName,
					email: formValues.email,
					password: formValues.password,
				},
			});
			toast.success(t("signup.success"));
			await router.navigate({ to: "/" });
		} catch (error) {
			const { message: errorMessage, fieldErrors: fieldErrorMessages } =
				parseServerError(error, t("signup.error_generic"));
			const message =
				error instanceof Error && error.message === "Email already registered"
					? t("signup.email_exists")
					: errorMessage;
			setFieldErrors(fieldErrorMessages);
			message && setErrorMessage(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<img
				src={SignupCat}
				alt="Signup Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-22"
			/>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center lg:w-[480px] gap-5 max-w-[80%]"
			>
				<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
					{t("signup.sign_up")}
				</h2>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
					{t("signup.enter_required_data")}
				</p>
				{errorMessage && (
					<p className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
						{errorMessage}
					</p>
				)}
				<div className="flex items-center gap-4 w-full">
					<MixiInput
						label={t("signup.first_name")}
						placeholder="First Name"
						name="firstName"
						value={formValues.firstName}
						onChange={(event) =>
							setFormValues((prev) => ({
								...prev,
								firstName: event.target.value,
							}))
						}
						autoComplete="given-name"
						errorMessage={t(fieldErrors.firstName)}
					/>
					<MixiInput
						label={t("signup.last_name")}
						placeholder="Last Name"
						name="lastName"
						value={formValues.lastName}
						onChange={(event) =>
							setFormValues((prev) => ({
								...prev,
								lastName: event.target.value,
							}))
						}
						autoComplete="family-name"
						errorMessage={t(fieldErrors.lastName)}
					/>
				</div>
				<MixiInput
					label={t("signup.email")}
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
					label={t("signup.password")}
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
					autoComplete="new-password"
					errorMessage={t(fieldErrors.password)}
				/>
				<Button className="w-full" type="submit" disabled={isSubmitDisabled}>
					{isSubmitting ? t("signup.creating_account") : t("signup.sign_up")}
				</Button>
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
	);
}
