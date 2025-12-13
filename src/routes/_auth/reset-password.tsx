import { useForm } from "@tanstack/react-form";
import { mergeForm, useStore, useTransform } from "@tanstack/react-form-start";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GreenCheckMark from "@/assets/images/green-check-mark.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { resetPasswordFormOptions, zResetPasswordForm } from "@/forms/auth";
import { getFormFn, resetPasswordFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_auth/reset-password")({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			token: (search.token as string) || "",
			error: (search.error as string) || undefined,
		};
	},
	loader: async () => {
		return {
			state: await getFormFn(),
		};
	},
});

function RouteComponent() {
	const [step, setStep] = useState<"enterPassword" | "loginScreen">(
		"enterPassword",
	);
	const { token, error } = useSearch({ from: "/_auth/reset-password" });
	const { state } = Route.useLoaderData();

	return (
		<>
			{step === "enterPassword" && (
				<EnterPasswordScreen
					token={token}
					state={state}
					error={error}
					onNext={() => setStep("loginScreen")}
				/>
			)}
			{step === "loginScreen" && <LoginScreen />}
		</>
	);
}

const EnterPasswordScreen = ({
	token,
	state,
	error,
	onNext,
}: {
	token: string;
	state: unknown;
	error?: string;
	onNext: () => void;
}) => {
	const { t } = useTranslation();

	const form = useForm({
		...resetPasswordFormOptions,
		defaultValues: {
			password: "",
			confirmPassword: "",
			token,
		},
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);

	return (
		<form
			action={resetPasswordFn.url}
			method="post"
			encType="multipart/form-data"
			onSubmit={(e) => {
				const formData = new FormData(e.currentTarget);
				const success = formData.get("success");
				if (success === "true") {
					onNext();
				}
			}}
			className="flex flex-col items-center gap-5 max-w-[80%]"
		>
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center lg:w-[680px]">
				{t("resetPassword.set_new_password")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[453px]">
				{t("resetPassword.new_password_must_be_different")}
			</p>
			<input type="hidden" name="token" value={token} />
			<form.Field
				name="password"
				validators={{ onChange: zResetPasswordForm.shape.password }}
			>
				{(field) => (
					<MixiInput
						label={t("resetPassword.password")}
						placeholder={t("resetPassword.password")}
						type="password"
						name="password"
						className="lg:w-[480px]"
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						autoComplete="new-password"
						errorMessage={
							field.state.meta.errors[0]
								? t(field.state.meta.errors[0].message)
								: undefined
						}
					/>
				)}
			</form.Field>
			<form.Field
				name="confirmPassword"
				validators={{ onChange: zResetPasswordForm.shape.confirmPassword }}
			>
				{(field) => (
					<MixiInput
						label={t("resetPassword.confirm_password")}
						placeholder={t("resetPassword.confirm_password")}
						type="password"
						name="confirmPassword"
						className="lg:w-[480px]"
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						autoComplete="new-password"
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
					className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 lg:w-[480px]"
				>
					{t(error)}
				</p>
			))}
			{error && (
				<p className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 lg:w-[480px]">
					{t(`errors.${error}`)}
				</p>
			)}
			<form.Subscribe
				selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<Button
						type="submit"
						className="w-full max-w-[480px]"
						disabled={!canSubmit}
					>
						{isSubmitting
							? t("resetPassword.resetting")
							: t("resetPassword.reset_password")}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
};

const LoginScreen = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center gap-5 max-w-[80%]">
			<img
				src={GreenCheckMark}
				alt="Reset Successful"
				className="lg:w-auto w-22"
			/>
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center">
				{t("resetPassword.password_reset")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[453px]">
				{t("resetPassword.password_successfully_reset")}
			</p>
			<Button
				className="w-full max-w-[480px]"
				onClick={() => {
					navigate({ to: "/login" });
				}}
			>
				{t("resetPassword.continue")}
			</Button>
		</div>
	);
};
