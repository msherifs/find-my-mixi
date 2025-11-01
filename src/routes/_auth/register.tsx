import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SignupCat from "@/assets/images/signup-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center w-[480px] gap-5">
			<img
				src={SignupCat}
				alt="Signup Cat"
				className="absolute left-8 bottom-0 z-10"
			/>
			<h2 className="font-epilogue font-bold text-[96.96px] leading-[1] tracking-[-0.02em]">
				{t("signup.sign_up")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
				{t("signup.enter_required_data")}
			</p>
			<div className="flex items-center gap-4 w-full">
				<MixiInput label={t("signup.first_name")} placeholder="First Name" />
				<MixiInput label={t("signup.last_name")} placeholder="Last Name" />
			</div>
			<MixiInput label={t("signup.email")} placeholder="you@email.com" />
			<MixiInput
				label={t("signup.password")}
				placeholder="Password"
				type="password"
			/>
			<Button className="w-full">{t("signup.sign_up")}</Button>
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
		</div>
	);
}
