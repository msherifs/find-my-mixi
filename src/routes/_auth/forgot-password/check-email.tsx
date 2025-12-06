import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import CheckEmailCat from "@/assets/images/check-email-cat.svg";
import { ResendResetEmail } from "@/components/shared/resend-reset-email";

type ForgotPasswordCheckEmailSearch = {
	email: string;
};

export const Route = createFileRoute("/_auth/forgot-password/check-email")({
	component: RouteComponent,
	validateSearch: (
		search: Record<string, unknown>,
	): ForgotPasswordCheckEmailSearch => {
		return {
			email: (search.email as string) || "",
		}
	},
});

function RouteComponent() {
	const { email } = Route.useSearch();
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
				{t("forgotPassword.we_sent_reset_link", { email })}
			</p>
			<ResendResetEmail email={email} />
		</div>
	)
}
