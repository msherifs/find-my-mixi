import { useState } from "react";
import { useTranslation } from "react-i18next";
import { resendResetEmailFn } from "@/server/functions/auth";

type ResendResetEmailProps = {
	email: string;
};

export function ResendResetEmail({ email }: ResendResetEmailProps) {
	const { t } = useTranslation();
	const [isResending, setIsResending] = useState(false);

	const handleResend = async () => {
		setIsResending(true);
		try {
			await resendResetEmailFn({ data: { email } });
		} catch (error) {
			console.error(error);
		} finally {
			setIsResending(false);
		}
	};

	return (
		<div className="flex items-center gap-1">
			<p className="text-gray-600 font-normal text-sm leading-5 tracking-normal">
				{t("forgotPassword.did_not_receive")}
			</p>
			<button
				type="button"
				onClick={handleResend}
				disabled={isResending}
				className="text-primary font-normal text-sm leading-5 tracking-normal disabled:opacity-50"
			>
				{isResending
					? t("forgotPassword.resending")
					: t("forgotPassword.click_to_resend")}
			</button>
		</div>
	);
}
