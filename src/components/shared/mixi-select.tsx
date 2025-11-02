import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const MixiSelect = ({
	label,
	options,
	className,
	onChange,
	selectClassName,
	placeholder,
}: {
	label?: string;
	options: { value: string; label: string }[];
	className?: string;
	onChange?: (value: string) => void;
	selectClassName?: string;
	placeholder?: string;
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
			<Select onValueChange={onChange}>
				<SelectTrigger
					className={cn(
						"h-12! w-full py-[10px] px-[14px] rounded-[10px] border border-[#E6E6E6] bg-white",
						"focus:ring-0 focus:outline-none focus-visible:ring-0",
						selectClassName,
					)}
				>
					<SelectValue
						placeholder={placeholder}
						className="font-normal text-base leading-6 tracking-normal text-gray-900"
					/>
				</SelectTrigger>
				<SelectContent className="border border-[#E6E6E6] bg-white space-y-1">
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="cursor-pointer hover:bg-primary/5 data-[state=checked]:bg-primary/10 my-1"
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
export default MixiSelect;
