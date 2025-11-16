import { useNavigate, useParams } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation("");
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const currentLanguage = i18n.language;
	const params = useParams({ strict: false });
	const changeLanguage = (newLang: "es" | "en") => {
		navigate({
			to: window.location.pathname.replace(`/${params.lang}`, `/${newLang}`),
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button
					variant={"secondary"}
					className={cn(
						"text-[#414651] font-[500] text-[14px] leading-[20px] tracking-[0%]",
						isMobile && "h-10 w-10",
					)}
				>
					<Globe className="!h-[18px] !w-[18px]" />
					{!isMobile &&
						(currentLanguage === "en"
							? t("languages.english")
							: t("languages.spanish"))}
					{!isMobile && <img src={ChevronDown} alt="dropdown" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="border-1 border-[#00000014] rounded-[12px] w-[260px] p-0">
				<DropdownMenuItem
					className="border-b border-[#E9EAEB] py-[6px]"
					onClick={() => changeLanguage("en")}
				>
					<div className="px-[6px]">
						<div className="p-2 flex items-center gap-2 w-full">
							<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
								{t("languages.english")}
							</p>
						</div>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="border-b border-[#E9EAEB] py-[6px]"
					onClick={() => changeLanguage("es")}
				>
					<div className="px-[6px]">
						<div className="p-2 flex items-center gap-2 w-full">
							<p className="text-gray-700 font-semibold text-[14px] leading-[20px] tracking-[0%]">
								{t("languages.spanish")}
							</p>
						</div>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSwitcher;
