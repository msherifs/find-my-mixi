import { useTranslation } from "react-i18next";
import GetYourCatHome from "@/assets/images/get-your-cat.svg";
import WaitForNotification from "@/assets/images/notification.svg";
import ReportLostCat from "@/assets/images/report-missing-cat.svg";
import { cn } from "@/lib/utils";

const steps = [
	{
		image: ReportLostCat,
		title: "report_your_lost_cat.title",
		description: "report_your_lost_cat.description",
		className: "bg-[#D5F3FF]",
		imageClassName: "w-[106px]",
	},
	{
		image: WaitForNotification,
		title: "wait_for_notifications.title",
		description: "wait_for_notifications.description",
		className: "bg-[#ADF6BD]",
		imageClassName: "w-[106px]",
	},
	{
		image: GetYourCatHome,
		title: "reunite_with_your_cat.title",
		description: "reunite_with_your_cat.description",
		className: "bg-[#FFF597]",
		imageClassName: "w-[115px]",
	},
];

const HowItWorksSection = () => {
	const { t } = useTranslation("");
	return (
		<section className="flex flex-col w-full gap-[43px] items-center mt-20 max-w-[1280px] mx-auto lg:px-9 px-4">
			<div className="flex flex-col items-center">
				<h2 className="font-epilogue font-bold text-[40px] leading-[100%] tracking-[0%]">
					{t("landing.howItWorksSection.title")}
				</h2>
				<p className="font-normal text-[18px] leading-[140%] tracking-[-0.01em] text-center lg:w-[400px]">
					{t("landing.howItWorksSection.description")}
				</p>
			</div>
			<div className="flex items-center gap-6 w-full lg:flex-row flex-col">
				{steps.map((step) => (
					<StepCard
						key={step.title}
						image={step.image}
						title={t(`landing.howItWorksSection.${step.title}`)}
						description={t(`landing.howItWorksSection.${step.description}`)}
						className={step.className}
						imageClassName={step.imageClassName}
					/>
				))}
			</div>
		</section>
	);
};
export default HowItWorksSection;

const StepCard = ({
	image,
	title,
	description,
	className,
	imageClassName,
}: {
	image: string;
	title: string;
	description: string;
	className: string;
	imageClassName: string;
}) => {
	return (
		<div
			className={cn(
				"p-6 rounded-[24px] flex-1 flex flex-col justify-between h-[310px]",
				className,
			)}
		>
			<img src={image} alt={title} className={imageClassName} />
			<div className="flex flex-col gap-1 items-start">
				<h3 className="font-semibold text-[18px] leading-[28px] tracking-normal text-gray-900">
					{title}
				</h3>
				<p className="font-normal text-[16px] leading-[24px] tracking-[-0.01em] text-gray-600">
					{description}
				</p>
			</div>
		</div>
	);
};
