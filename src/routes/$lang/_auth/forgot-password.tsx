import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CheckEmailCat from "@/assets/images/check-email-cat.svg";
import ForgotPasswordCat from "@/assets/images/forgot-password-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$lang/_auth/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	const [authStep, setAuthStep] = useState<"enterEmail" | "checkEmail">(
		"enterEmail",
	);
	return (
		<>
			{authStep === "enterEmail" && (
				<EnterEmailScreen onNext={() => setAuthStep("checkEmail")} />
			)}
			{authStep === "checkEmail" && <CheckEmailScreen />}
		</>
	);
}

const EnterEmailScreen = ({ onNext }: { onNext: () => void }) => {
	const { t } = useTranslation();
	const { lang } = useParams({ from: "/$lang" });
	return (
		<div className="flex flex-col items-center lg:w-[480px] gap-5 max-w-[80%]">
			<img
				src={ForgotPasswordCat}
				alt="Forgot Password Cat"
				className="absolute left-8 bottom-0 z-10 lg:w-auto w-36"
			/>
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center">
				{t("forgotPassword.forgot_password")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
				{t("forgotPassword.no_worries")}
			</p>
			<MixiInput
				label={t("forgotPassword.email")}
				placeholder="you@email.com"
			/>
			<Button className="w-full" onClick={onNext}>
				{t("forgotPassword.reset_password")}
			</Button>
			<div className="flex items-center w-full justify-center gap-1">
				<p className="font-normal text-sm leading-5 tracking-normal text-[#626262]">
					{t("signup.already_have_account")}
				</p>
				<Link
					to="/$lang/login"
					params={{ lang }}
					className="font-semibold text-sm leading-5 tracking-normal text-primary"
				>
					{t("signup.login")}
				</Link>
			</div>
		</div>
	);
};

const CheckEmailScreen = () => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center gap-5 max-w-[80%]">
			<img
				src={CheckEmailCat}
				alt="Check Email Cat"
				className="lg:w-auto w-22"
			/>
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center">
				{t("forgotPassword.check_your_email")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
				{t("forgotPassword.we_sent_reset_link", { email: "test@gmail.com" })}
			</p>
			<div className="flex items-center gap-1">
				<p className="text-gray-600 font-normal text-sm leading-5 tracking-normal">
					{t("forgotPassword.did_not_receive")}
				</p>
				<button
					type="button"
					className="text-primary font-normal text-sm leading-5 tracking-normal"
				>
					{t("forgotPassword.click_to_resend")}
				</button>
			</div>
		</div>
	);
};
