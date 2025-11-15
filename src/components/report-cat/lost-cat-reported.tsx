import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SearchCat from "@/assets/images/search-cat.svg";
import { Button } from "../ui/button";

function LostCatReported() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className="relative min-h-screen min-h-[100dvh] flex flex-col">
			<div className="flex-grow flex justify-center items-center">
				<div className="flex flex-col items-center gap-5 max-w-[80%]">
					<img
						src={SearchCat}
						alt="Search Started Cat"
						className="sm:w-auto w-40"
					/>
					<h2 className="font-epilogue font-bold text-[40px] sm:text-[63.96px] sm:leading-[92px] leading-[58px] tracking-[-0.02em] text-center">
						{t("reportCat.search_process_starts")}
					</h2>
					<p className="font-normal text-[20.68px] leading-[31px] tracking-[0] text-center">
						{t("reportCat.sit_back_relax")}
					</p>
					<Button onClick={() => navigate({ to: "/" })}>
						{t("reportCat.go_to_home")}
					</Button>
				</div>
			</div>
			<footer className="h-[96px] w-full border-t border-[#F1F1F1] p-8 flex items-center justify-end font-normal text-sm leading-5 tracking-normal text-gray-600">
				© FindMyMixi 2024
			</footer>
		</div>
	);
}

export default LostCatReported;
