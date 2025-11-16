import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import DoneStep from "@/assets/images/done-step.svg";
import Logo from "@/assets/images/logo-letters.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const ProgressBar = ({
	currentStep,
	onStepClick,
}: {
	currentStep: number;
	onStepClick: (step: number) => void;
}) => {
	const { t } = useTranslation("");
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className="w-full flex flex-col gap-4 p-4 bg-[#FAF9F9] rounded-[32px]">
				<Link to="/">
					<img src={Logo} alt="Find My Mixi Logo" className="h-8 w-auto" />
				</Link>
				<div className="flex items-start justify-between w-full">
					<MobileStep
						isDone={currentStep > 1}
						stepNumber={1}
						title={t("reportCat.cat_information")}
						disabled={false}
						onStepClick={currentStep > 1 ? () => onStepClick(1) : undefined}
					/>
					<MobileConnector />
					<MobileStep
						isDone={currentStep > 2}
						stepNumber={2}
						title={t("reportCat.cat_address")}
						disabled={currentStep < 2}
						onStepClick={currentStep > 2 ? () => onStepClick(2) : undefined}
					/>
					<MobileConnector />
					<MobileStep
						isDone={false}
						stepNumber={3}
						title={t("reportCat.review")}
						disabled={currentStep < 3}
						onStepClick={currentStep > 3 ? () => onStepClick(3) : undefined}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full bg-[#FAF9F9] rounded-[32px] max-w-[440px] w-[25vw] flex flex-col justify-between">
			<div className="flex flex-col items-start pt-8 px-8 gap-[80px] w-full">
				<Link to="/">
					<img src={Logo} alt="Find My Mixi Logo" />
				</Link>
				<div className="flex flex-col items-start gap-1 pr-8 w-full">
					<Step
						isDone={currentStep > 1}
						stepNumber={1}
						title={t("reportCat.cat_information")}
						disabled={false}
						onStepClick={currentStep > 1 ? () => onStepClick(1) : undefined}
					/>
					<Connector />
					<Step
						isDone={currentStep > 2}
						stepNumber={2}
						title={t("reportCat.cat_address")}
						disabled={currentStep < 2}
						onStepClick={currentStep > 2 ? () => onStepClick(2) : undefined}
					/>
					<Connector />
					<Step
						isDone={false}
						stepNumber={3}
						title={t("reportCat.review")}
						disabled={currentStep < 3}
						onStepClick={currentStep > 3 ? () => onStepClick(3) : undefined}
					/>
				</div>
			</div>
			<div className="p-8 font-normal text-[14px] leading-[20px] tracking-[0] text-[#535862]">
				© FindMyMixi 2024
			</div>
		</div>
	);
};

export default ProgressBar;

const Step = ({
	isDone,
	stepNumber,
	title,
	onStepClick,
	disabled,
}: {
	isDone: boolean;
	stepNumber: number;
	title: string;
	onStepClick?: () => void;
	disabled: boolean;
}) => {
	return (
		<button
			type="button"
			className={cn(
				"flex items-center gap-4 w-full",
				!isDone && "cursor-default",
			)}
			onClick={onStepClick}
		>
			{isDone ? (
				<img src={DoneStep} alt="Done Step" />
			) : (
				<div
					className={cn(
						"bg-primary w-12 h-12 rounded-[10px] border border-1 border-[#D5D7DA] font-semibold text-[16px] leading-[24px] tracking-[0] text-white flex items-center justify-center",
						disabled && "text-gray-500 bg-white",
					)}
				>
					{stepNumber}
				</div>
			)}
			<p
				className={cn(
					"font-semibold text-[16px] leading-[24px] tracking-[0] text-start",
					disabled && "text-gray-500",
				)}
			>
				{title}
			</p>
		</button>
	);
};

const Connector = () => {
	return (
		<div className="w-12 h-6 flex items-center justify-center">
			<div className="w-[2px] h-6 bg-[#E9EAEB]" />
		</div>
	);
};

const MobileStep = ({
	isDone,
	stepNumber,
	title,
	disabled,
	onStepClick,
}: {
	isDone: boolean;
	stepNumber: number;
	title: string;
	disabled?: boolean;
	onStepClick?: () => void;
}) => {
	return (
		<button
			type="button"
			className="flex flex-col items-center gap-2 flex-1"
			onClick={onStepClick}
		>
			{isDone ? (
				<img src={DoneStep} alt="Done Step" className="w-8 h-8" />
			) : (
				<div
					className={cn(
						"bg-primary w-8 h-8 rounded-lg border border-[#D5D7DA] font-semibold text-[14px] text-white flex items-center justify-center",
						disabled && "text-gray-500 bg-white",
					)}
				>
					{stepNumber}
				</div>
			)}
			<p
				className={cn(
					"font-medium text-[12px] leading-[16px] text-center",
					disabled && "text-gray-500",
				)}
			>
				{title}
			</p>
		</button>
	);
};

const MobileConnector = () => {
	return (
		<div className="h-8 flex-1 flex items-center justify-center">
			<div className="w-full h-[2px] bg-[#E9EAEB]" />
		</div>
	);
};
