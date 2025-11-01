import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import HeaderIcon from "@/assets/images/header-icon.svg";
import { Button } from "../ui/button";

const LandingHeader = () => {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	return (
		<header className="w-full max-w-[1280px] mx-auto mt-8 px-9">
			<div className="w-full flex items-center gap-4 border border-[#00000014] rounded-[56px] py-3 px-9 h-[78px]">
				<div className="flex items-center gap-5 flex-grow ">
					<img src={HeaderIcon} alt="Header Icon" />
					<div className="flex items-center gap-[2px]"></div>
					<Link
						to="/"
						className="py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0"
						activeProps={{ className: "text-primary" }}
						inactiveProps={{ className: "text-black" }}
					>
						<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
							{t("landing.header.home")}
						</p>
					</Link>
					<a
						href="#why-us"
						className="py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0 text-black"
					>
						<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
							{t("landing.header.whyUs")}
						</p>
					</a>
					<a
						href="#testimonials"
						className="py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0 text-black"
					>
						<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
							Testimonials
						</p>
					</a>
					<Link
						to="/contact-us"
						className="py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0"
						activeProps={{ className: "text-primary" }}
						inactiveProps={{ className: "text-black" }}
					>
						<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
							{t("landing.header.contactUs")}
						</p>
					</Link>
				</div>
				<div className="flex items-center gap-3">
					<Button
						variant={"secondary"}
						onClick={() => navigate({ to: "/login" })}
					>
						{t("landing.header.login")}
					</Button>
					<Button onClick={() => navigate({ to: "/register" })}>
						{t("landing.header.signUp")}
					</Button>
				</div>
			</div>
		</header>
	);
};

export default LandingHeader;
