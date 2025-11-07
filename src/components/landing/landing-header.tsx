import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderIcon from "@/assets/images/header-icon.svg";
import { Button } from "../ui/button";

const LandingHeader = () => {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("home");
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		if (!isHomePage) {
			window.scrollTo(0, 0);
			return;
		}
		const handleScroll = () => {
			const sections = ["why-us", "testimonials"];
			const scrollPosition = window.scrollY + 150;

			if (window.scrollY < 100) {
				setActiveSection("home");
				return;
			}

			let currentSection = "home";

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetBottom = offsetTop + element.offsetHeight;

					if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
						currentSection = sectionId;
						break;
					}
				}
			}

			setActiveSection(currentSection);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isHomePage]);

	const getLinkClassName = (section: string) => {
		const baseClasses =
			"py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0";
		const activeClass =
			activeSection === section && isHomePage ? "text-primary" : "text-black";
		return `${baseClasses} ${activeClass}`;
	};

	return (
		<header className="w-full max-w-[1280px] mx-auto px-4 md:px-9 sticky top-0 z-50">
			<div className="w-full flex items-center gap-4 border border-[#00000014] rounded-[56px] py-3 px-4 md:px-9 h-[78px] bg-white mt-4 md:mt-8">
				<div className="flex items-center gap-5 flex-grow ">
					<Link to="/">
						<img src={HeaderIcon} alt="Header Icon" />
					</Link>
					<div className="hidden lg:flex items-center gap-5 flex-grow">
						<Link to="/" hash="home" className={getLinkClassName("home")}>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								{t("landing.header.home")}
							</p>
						</Link>
						<Link to="/" hash="why-us" className={getLinkClassName("why-us")}>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								{t("landing.header.whyUs")}
							</p>
						</Link>
						<Link
							to="/"
							hash="testimonials"
							className={getLinkClassName("testimonials")}
						>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								Testimonials
							</p>
						</Link>
						<Link
							to="/contact-us"
							className="py-1 px-[6px] rounded-[8px] bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0 text-black"
							activeProps={{ className: "text-primary" }}
						>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								{t("landing.header.contactUs")}
							</p>
						</Link>
					</div>
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
