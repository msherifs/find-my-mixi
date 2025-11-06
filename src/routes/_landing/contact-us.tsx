import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import MixiInput from "@/components/shared/mixi-input";
import MixiSelect from "@/components/shared/mixi-select";
import MixiTextarea from "@/components/shared/mixi-textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_landing/contact-us")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center justify-center h-full gap-4 my-20 mx-auto">
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
				{t("contactUs.contact_us")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[668px] max-w-[80%]">
				{t("contactUs.already_part_of_community")}
			</p>
			<div className="lg:w-[480px] w-[80%] flex flex-col items-center gap-5">
				<MixiInput label={t("contactUs.email")} placeholder="you@email.com" />
				<MixiSelect
					label={t("contactUs.select_a_topic")}
					placeholder={t("contactUs.select_a_topic")}
					options={[
						{ value: "lost_a_cat", label: t("contactUs.lost_a_cat") },
						{ value: "found_a_cat", label: t("contactUs.found_a_cat") },
					]}
				/>
				<MixiTextarea
					label={t("contactUs.or_tell_us_what_you_need")}
					placeholder={t("contactUs.or_tell_us_what_you_need")}
				/>
			</div>
			<Button className="lg:w-[480px] max-w-[80%] w-full">
				{t("contactUs.get_assistance")}
			</Button>
		</div>
	);
}
