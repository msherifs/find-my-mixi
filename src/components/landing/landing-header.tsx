import {
	Link,
	useLoaderData,
	useLocation,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderIcon from "@/assets/images/header-icon.svg";
import LanguageSwitcher from "../shared/language-switcher";
import { Button } from "../ui/button";

const LandingHeader = () => {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("home");
	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const user = useLoaderData({ from: "/$lang/_landing" });
	const { lang } = useParams({ from: "/$lang" });

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
					<Link to="/$lang" params={{ lang }}>
						<img src={HeaderIcon} alt="Header Icon" />
					</Link>
					<div className="hidden lg:flex items-center gap-5 flex-grow">
						<Link
							to="/$lang"
							hash="home"
							params={{ lang }}
							className={getLinkClassName("home")}
						>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								{t("landing.header.home")}
							</p>
						</Link>
						<Link
							to="/$lang"
							hash="why-us"
							params={{ lang }}
							className={getLinkClassName("why-us")}
						>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								{t("landing.header.whyUs")}
							</p>
						</Link>
						<Link
							to="/$lang"
							hash="testimonials"
							params={{ lang }}
							className={getLinkClassName("testimonials")}
						>
							<p className="px-[2px] font-semibold text-[14px] leading-[24px] tracking-[0]">
								Testimonials
							</p>
						</Link>
						<Link
							to="/$lang/contact-us"
							preload={false}
							params={{ lang }}
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
					{user && (
						<Button
							variant={"secondary"}
							onClick={() => navigate({ to: "/$lang/map", params: { lang } })}
						>
							{t("landing.header.goToApp")}
						</Button>
					)}
					{!user && (
						<>
							<Button
								variant={"secondary"}
								onClick={() =>
									navigate({ to: "/$lang/login", params: { lang } })
								}
							>
								{t("landing.header.login")}
							</Button>
							<Button
								onClick={() =>
									navigate({ to: "/$lang/register", params: { lang } })
								}
							>
								{t("landing.header.signUp")}
							</Button>
						</>
					)}
				</div>
				<LanguageSwitcher />
			</div>
		</header>
	);
};

export default LandingHeader;
