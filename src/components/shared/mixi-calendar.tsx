import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type MixiCalendarProps = {
	label?: string;
	className?: string;
	errorMessage?: string;
	selectedDate?: Date;
	calendarClassName?: string;
	placeholder?: string;
	onDateChange?: (date: Date | undefined) => void;
	captionLayout?: "dropdown" | "label" | "dropdown-months" | "dropdown-years";
};

const MixiCalendar = ({
	label,
	className,
	calendarClassName,
	errorMessage,
	selectedDate,
	onDateChange,
	placeholder,
	captionLayout,
}: MixiCalendarProps) => {
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
			<Popover>
				<PopoverTrigger asChild>
					<button
						type="button"
						className={cn(
							"flex w-full items-center gap-2 h-12 py-[10px] px-[14px] rounded-[10px] border border-[#E6E6E6] bg-white font-normal text-[14px] leading-6 tracking-normal text-gray-900",
							"focus:ring-0 focus:outline-none focus-visible:ring-0",
						)}
					>
						<CalendarIcon color="#A4A7AE" size={18} />
						{selectedDate ? (
							DateTime.fromJSDate(selectedDate).toLocaleString(
								DateTime.DATE_FULL,
							)
						) : (
							<span className="text-gray-500">
								{placeholder ?? "Select a date"}
							</span>
						)}
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 border-0">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={onDateChange}
						className={calendarClassName}
						defaultMonth={selectedDate || new Date()}
						disabled={{ after: new Date() }}
						captionLayout={captionLayout}
					/>
				</PopoverContent>
			</Popover>
			{errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
		</div>
	);
};

export default MixiCalendar;
