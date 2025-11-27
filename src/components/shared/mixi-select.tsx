import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type MixiSelectOption = { value: string; label: string };

type MixiSelectProps = {
	label?: string;
	options: MixiSelectOption[];
	className?: string;
	onChange?: (value?: string) => void;
	selectClassName?: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	name?: string;
	errorMessage?: string;
	hideAllOption?: boolean;
};

const MixiSelect = ({
	label,
	options,
	className,
	onChange,
	selectClassName,
	placeholder,
	value,
	errorMessage,
	defaultValue,
	name,
	hideAllOption,
}: MixiSelectProps) => {
	const { t } = useTranslation();
	return (
		<div
			className={cn("flex flex-col items-start gap-[6px] w-full", className)}
		>
			{label && (
				<h3 className="font-medium text-sm leading-5 tracking-normal text-gray-700">
					{label}
				</h3>
			)}
			<Select
				onValueChange={(value) =>
					onChange?.(value === "all" ? undefined : value)
				}
				value={value === undefined || value === "all" ? "" : value}
				defaultValue={defaultValue}
			>
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
					{!hideAllOption && (
						<SelectItem
							value="all"
							className="cursor-pointer hover:bg-primary/5 data-[state=checked]:bg-primary/10 my-1"
						>
							{t("map.all")}
						</SelectItem>
					)}
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
			{name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
			{errorMessage && (
				<p className="text-sm leading-5 text-red-700">{errorMessage}</p>
			)}
		</div>
	);
};
export default MixiSelect;
