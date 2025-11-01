import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginCat from "@/assets/images/login-cat.svg";
import MixiInput from "@/components/shared/mixi-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const [rememberMeSelected, setRememberMeSelected] = useState(false);
	return (
		<div className="flex flex-col items-center w-[480px] gap-5">
			<img
				src={LoginCat}
				alt="Login Cat"
				className="absolute left-8 bottom-0 z-10"
			/>
			<h2 className="font-epilogue font-bold text-[96.96px] leading-[1] tracking-[-0.02em]">
				{t("login.login")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center">
				{t("login.enter_email_and_password")}
			</p>
			<MixiInput label={t("login.email")} placeholder="you@email.com" />
			<MixiInput
				label={t("login.password")}
				placeholder="Password"
				type="password"
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
				<p className="font-semibold text-sm leading-5 tracking-normal text-primary">
					{t("login.forgot_password")}
				</p>
			</div>
			<Button className="w-full">{t("login.sign_in")}</Button>
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
		</div>
	);
}
