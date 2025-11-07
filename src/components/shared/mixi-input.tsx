import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Input } from "../ui/input";

type MixiInputProps = {
  label?: string;
  className?: string;
  inputClassName?: string;
} & Omit<ComponentProps<typeof Input>, "className">;

const MixiInput = ({
  label,
  className,
  inputClassName,
  type = "text",
  ...inputProps
}: MixiInputProps) => {
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
          "h-12 py-[10px] px-[14px] rounded-[10px] border border-[#E6E6E6] bg-white font-normal text-base leading-6 tracking-normal text-gray-900 placeholder:text-gray-500",
          "focus:ring-0 focus:outline-none focus-visible:ring-0",
          inputClassName,
        )}
        type={type}
        {...inputProps}
      />
    </div>
  );
};

export default MixiInput;
