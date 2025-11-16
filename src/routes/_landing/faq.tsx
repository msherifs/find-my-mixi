import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_landing/faq")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center justify-center h-full gap-[40px] md:gap-[80px] my-20 mx-auto">
			<div className="flex flex-col items-center w-full gap-4">
				<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
					{t("faq.faq")}
				</h2>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-[0] text-center lg:w-[420px] max-w-[80%]">
					{t("faq.cant_find_answer")}
				</p>
			</div>

			<div className="flex flex-col items-start gap-8 w-[80vw] md:w-[768px]">
				<FAQCard question={t("faq.how_to_report_lost_cat_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p className="mb-4">{t("faq.how_to_report_lost_cat_answer")}</p>
						<ul className="list-disc pl-5 space-y-2">
							<li>{t("faq.cat's_name")}</li>
							<li>{t("faq.fur_color_and_pattern")}</li>
							<li>{t("faq.coat_type")}</li>
							<li>{t("faq.distinctive_marks")}</li>
							<li>{t("faq.eye_color")}</li>
							<li>{t("faq.cats_size")}</li>
							<li>{t("faq.date_and_location_lost")}</li>
							<li>{t("faq.recent_photo")}</li>
							<li>{t("faq.additional_information")}</li>
						</ul>
						<p className="mt-4">{t("faq.after_submission")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.what_to_do_if_find_cat_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p className="mb-4">{t("faq.what_to_do_if_find_cat_answer")}</p>
						<p className="font-semibold mb-2">{t("faq.rescuers_location")}</p>
						<ul className="list-disc pl-5 mb-4">
							<li>{t("faq.address_where_found")}</li>
						</ul>
						<p className="font-semibold mb-2">{t("faq.cats_information")}</p>
						<ul className="list-disc pl-5 space-y-2 mb-4">
							<li>{t("faq.fur_color_and_pattern")}</li>
							<li>{t("faq.coat_type")}</li>
							<li>{t("faq.distinctive_marks")}</li>
							<li>{t("faq.eye_color")}</li>
							<li>{t("faq.cats_size")}</li>
							<li>{t("faq.date_seen")}</li>
							<li>{t("faq.photo_of_cat")}</li>
						</ul>
						<p>{t("faq.share_social_media")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.receive_notifications_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.receive_notifications_answer")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.use_interactive_map_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p className="mb-4">{t("faq.use_interactive_map_answer")}</p>
						<p className="mb-2">{t("faq.map_filter_options")}</p>
						<ul className="list-disc pl-5 space-y-2 mb-4">
							<li>{t("faq.filter_fur_color")}</li>
							<li>{t("faq.filter_fur_pattern")}</li>
							<li>{t("faq.filter_coat_length")}</li>
							<li>{t("faq.filter_eye_color")}</li>
							<li>{t("faq.filter_size")}</li>
							<li>{t("faq.filter_collar")}</li>
						</ul>
						<p>{t("faq.map_tool_description")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.safe_to_share_info_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.safe_to_share_info_answer")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.cat_reported_found_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.cat_reported_found_answer")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.donate_support_platform_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.donate_support_platform_answer")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.errors_or_issues_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.errors_or_issues_answer")}</p>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.premium_service_ads_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p className="mb-4">{t("faq.premium_service_ads_answer")}</p>
						<p className="font-semibold mb-2">
							{t("faq.premium_service_notes")}
						</p>
						<ul className="list-disc pl-5 space-y-2">
							<li>{t("faq.ads_config_based_on_report")}</li>
							<li>{t("faq.ads_campaign_duration")}</li>
							<li>{t("faq.ads_views_depend")}</li>
							<li>{t("faq.ads_optional_service")}</li>
						</ul>
					</div>
				</FAQCard>

				<hr className="bg-gray-200 h-[1px] border-0 w-full" />

				<FAQCard question={t("faq.cancel_premium_subscription_question")}>
					<div className="font-normal text-base leading-6 tracking-normal text-[#545454]">
						<p>{t("faq.cancel_premium_subscription_answer")}</p>
					</div>
				</FAQCard>
			</div>
		</div>
	);
}

const FAQCard = ({
	question,
	children,
}: {
	question: string;
	children: React.ReactNode;
}) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	return (
		<div className="w-full flex flex-col gap-1 items-start">
			<button
				type="button"
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="w-full items-center flex justify-between gap-4"
			>
				<h3 className="text-gray-900 font-semibold text-[16px] leading-[24px] tracking-[0] text-start">
					{question}
				</h3>
				<ChevronDown
					className={cn(isCollapsed ? "rotate-0" : "rotate-180")}
					size={20}
				/>
			</button>
			{!isCollapsed && <div className="mt-4">{children}</div>}
		</div>
	);
};
