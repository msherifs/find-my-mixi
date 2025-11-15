import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { PhoneInput } from "../ui/phone-input";

type MixiPhoneInputProps = {
	label?: string;
	className?: string;
	inputClassName?: string;
	errorMessage?: string;
} & Omit<ComponentProps<typeof PhoneInput>, "className">;

const MixiPhoneInput = ({
	label,
	className,
	inputClassName,
	type = "text",
	errorMessage,
	...inputProps
}: MixiPhoneInputProps) => {
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
			<PhoneInput
				{...inputProps}
				defaultCountry="MX"
				className={cn(inputClassName)}
				focusInputOnCountrySelection
			/>
			{errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
		</div>
	);
};

export default MixiPhoneInput;
