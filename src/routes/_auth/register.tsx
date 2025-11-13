import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SignupCat from "@/assets/images/signup-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { registerFormOptions, zRegisterForm } from "@/forms/auth";
import { getRegisterServerForm, registerFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
	beforeLoad: async () => {
		await getRegisterServerForm();
	},
});

function RouteComponent() {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();

	const form = useForm({
		...registerFormOptions,
		onSubmit: async ({ value }) => {
			setErrorMessage(null);
			try {
				await registerFn({ data: value });
				toast.success(t("signup.success"));
				navigate({ to: "/" });
			} catch (error) {
				const message =
					error instanceof Error && error.message === "ath.004"
						? t("signup.email_exists")
						: t("signup.error_generic");
				setErrorMessage(message);
			}
		},
	});

	return (
		<>
			<img
				src={SignupCat}
				alt="Signup Cat"
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
					<form.Field
						name="firstName"
						validators={{ onChange: zRegisterForm.shape.firstName }}
					>
						{(field) => (
							<MixiInput
								label={t("signup.first_name")}
								placeholder={t("signup.first_name")}
								name="firstName"
								value={field.state.value}
								onChange={(event) => field.handleChange(event.target.value)}
								autoComplete="given-name"
								onBlur={field.handleBlur}
								errorMessage={
									field.state.meta.errors[0]
										? t(field.state.meta.errors[0].message)
										: undefined
								}
							/>
						)}
					</form.Field>
					<form.Field
						name="lastName"
						validators={{ onChange: zRegisterForm.shape.lastName }}
					>
						{(field) => (
							<MixiInput
								label={t("signup.last_name")}
								placeholder={t("signup.last_name")}
								name="lastName"
								value={field.state.value}
								onChange={(event) => field.handleChange(event.target.value)}
								autoComplete="family-name"
								onBlur={field.handleBlur}
								errorMessage={
									field.state.meta.errors[0]
										? t(field.state.meta.errors[0].message)
										: undefined
								}
							/>
						)}
					</form.Field>
				</div>
				<form.Field
					name="email"
					validators={{ onChange: zRegisterForm.shape.email }}
				>
					{(field) => (
						<MixiInput
							label={t("signup.email")}
							placeholder="you@email.com"
							type="email"
							name="email"
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
							autoComplete="email"
							onBlur={field.handleBlur}
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
					validators={{ onChange: zRegisterForm.shape.password }}
				>
					{(field) => (
						<MixiInput
							label={t("signup.password")}
							placeholder={t("signup.password")}
							type="password"
							name="password"
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
							autoComplete="new-password"
							onBlur={field.handleBlur}
							errorMessage={
								field.state.meta.errors[0]
									? t(field.state.meta.errors[0].message)
									: undefined
							}
						/>
					)}
				</form.Field>
				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
					]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button className="w-full" type="submit" disabled={!canSubmit}>
							{isSubmitting
								? t("signup.creating_account")
								: t("signup.sign_up")}
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
	);
}
