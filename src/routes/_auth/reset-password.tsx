import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GreenCheckMark from "@/assets/images/green-check-mark.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/reset-password")({
	component: RouteComponent,
});

function RouteComponent() {
	const [step, setStep] = useState<"enterPassword" | "loginScreen">(
		"enterPassword",
	);
	return (
		<>
			{step === "enterPassword" && (
				<EnterPasswordScreen onNext={() => setStep("loginScreen")} />
			)}
			{step === "loginScreen" && <LoginScreen />}
		</>
	);
}

const EnterPasswordScreen = ({ onNext }: { onNext: () => void }) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center gap-5 max-w-[80%]">
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center lg:w-[680px]">
				{t("resetPassword.set_new_password")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[453px]">
				{t("resetPassword.new_password_must_be_different")}
			</p>
			<MixiInput
				label={t("resetPassword.password")}
				placeholder={t("resetPassword.password")}
				type="password"
				className="lg:w-[480px]"
			/>
			<MixiInput
				label={t("resetPassword.confirm_password")}
				placeholder={t("resetPassword.confirm_password")}
				type="password"
				className="lg:w-[480px]"
			/>
			<Button className="w-full max-w-[480px]" onClick={onNext}>
				{t("resetPassword.reset_password")}
			</Button>
		</div>
	);
};

const LoginScreen = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center gap-5 max-w-[80%]">
			<img src={GreenCheckMark} alt="Reset Successful" />
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em] text-center">
				{t("resetPassword.password_reset")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[453px]">
				{t("resetPassword.password_successfully_reset")}
			</p>
			<Button
				className="w-full max-w-[480px]"
				onClick={() => {
					navigate({ to: "/" });
				}}
			>
				{t("resetPassword.continue")}
			</Button>
		</div>
	);
};
