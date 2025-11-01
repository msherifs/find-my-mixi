import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const MixiInput = ({
	label,
	className,
	inputClassName,
	placeholder,
	type = "text",
}: {
	label?: string;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
	type?: string;
}) => {
	return (
		<div
			className={cn("flex flex-col items-start gap-[6px] w-full", className)}
		>
			{label && (
				<h3 className="font-medium text-sm leading-5 tracking-normal text-gray-700">
					{label}
				</h3>
			)}
			<Input
				className={cn(
					"h-12 py-[10px] px-[14px] rounded-[10px] border border-[#E6E6E6] bg-white font-normal text-base leading-6 tracking-normal text-gray-500",
					"focus:ring-0 focus:outline-none focus-visible:ring-0",
					inputClassName,
				)}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
};

export default MixiInput;
