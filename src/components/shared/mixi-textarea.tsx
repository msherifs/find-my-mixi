import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MixiTextareaProps = {
	label?: string;
	className?: string;
	inputClassName?: string;
	errorMessage?: string;
} & ComponentPropsWithoutRef<"textarea">;

const MixiTextarea = ({
	label,
	className,
	inputClassName,
	errorMessage,
	...textareaProps
}: MixiTextareaProps) => {
	return (
		<div
			className={cn("flex flex-col items-start gap-[6px] w-full", className)}
		>
			{label && (
				<h3 className="font-medium text-sm leading-5 tracking-normal text-gray-700">
					{label}
				</h3>
			)}
			<textarea
				className={cn(
					"h-[154px] w-full py-[10px] px-[14px] rounded-[10px] border border-[#E6E6E6] bg-white font-normal text-base leading-6 tracking-normal text-gray-900 placeholder:text-gray-500",
					"focus:ring-0 focus:outline-none focus-visible:ring-0 resize-none",
					inputClassName,
				)}
				{...textareaProps}
			/>
			{errorMessage && (
				<p className="text-sm leading-5 text-red-700">{errorMessage}</p>
			)}
		</div>
	);
};

export default MixiTextarea;
