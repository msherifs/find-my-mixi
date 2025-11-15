import { cn } from "@/lib/utils";
import { MultiSelect, type MultiSelectProps } from "../ui/multi-select";

type MixiMultiselectProps = {
	label?: string;
	className?: string;
	multiSelectClassName?: string;
	errorMessage?: string;
} & Omit<MultiSelectProps, "className">;

const MixiMultiselect = ({
	label,
	className,
	multiSelectClassName,
	errorMessage,
	...inputProps
}: MixiMultiselectProps) => {
	return (
		<div
			className={cn(
				"flex flex-col items-start gap-[6px] w-full flex-shrink-0 flex-1 min-w-0",
				className,
			)}
		>
			{label && (
				<h3 className="font-medium text-sm leading-5 tracking-normal text-gray-700">
					{label}
				</h3>
			)}
			<MultiSelect
				singleLine
				className={multiSelectClassName}
				{...inputProps}
			/>
			{errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
		</div>
	);
};

export default MixiMultiselect;
