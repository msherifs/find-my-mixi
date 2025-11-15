import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@/assets/images/facebook-icon.svg";
import FooterIcon from "@/assets/images/footer-icon.svg";
import InstagramIcon from "@/assets/images/instagram-icon.svg";
import LinkedInIcon from "@/assets/images/linkedin-icon.svg";
import TwitterIcon from "@/assets/images/twitter-icon.svg";

const LandingFooter = () => {
	const { t } = useTranslation("");
	return (
		<footer className="w-full h-auto rounded-t-[40px] lg:rounded-t-[80px] bg-[#090009] overflow-hidden">
			{/* Top Section: Logo and Navigation Links */}
			<div className="pt-12 pb-12 lg:pt-[64px] lg:pb-[124px] w-full">
				<div className="max-w-[1280px] w-full px-4 sm:px-8 mx-auto">
					<div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[64px] w-full">
						{/* Logo/Icon (Always visible) */}
						<img
							src={FooterIcon}
							alt="Footer Icon"
							className="w-[120px] lg:w-auto"
						/>

						{/* Navigation Links Container */}
						<div className="flex-grow flex flex-col sm:flex-row items-start justify-start lg:justify-end gap-10 sm:gap-20 lg:gap-[96px] w-full">
							{/* Navigation Group 1: Main Links */}
							<div className="flex flex-col items-start gap-3 min-w-[96px]">
								<Link
									to="/"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.home")}
								</Link>
								<Link
									to="/"
									hash="why-us"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.whyUs")}
								</Link>
								<Link
									to="/"
									hash="testimonials"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.testimonials")}
								</Link>
								<Link
									to="/contact-us"
									preload={false}
									hash=""
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.contactUs")}
								</Link>
							</div>

							{/* Navigation Group 2: Policy Links */}
							<div className="flex flex-col items-start gap-3 min-w-[96px]">
								<Link
									to="/privacy-policy"
									hash=""
									preload={false}
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.privacyPolicy")}
								</Link>
								<Link
									to="/faq"
									hash=""
									preload={false}
									className="bg-transparent font-medium text-base leading-6 text-justify text-white hover:text-gray-300 transition-colors"
								>
									{t("landing.footer.faq")}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section: Copyright and Social Icons */}
			<div className="border-t border-white/10 py-8 lg:py-[48px] w-full">
				<div className="max-w-[1280px] px-4 sm:px-8 mx-auto">
					{/* Stack on mobile, side-by-side on larger screens */}
					<div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
						<p className="font-normal text-sm sm:text-base leading-6 text-center sm:text-justify text-white">
							{t("landing.footer.copyright")}
						</p>

						{/* Social Icons */}
						<div className="flex items-center gap-4 sm:gap-6">
							<a
								href="https://x.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Twitter"
							>
								<img
									src={TwitterIcon}
									alt="Twitter Icon"
									className="w-6 h-6 hover:opacity-75 transition-opacity"
								/>
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
							>
								<img
									src={LinkedInIcon}
									alt="LinkedIn Icon"
									className="w-6 h-6 hover:opacity-75 transition-opacity"
								/>
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
							>
								<img
									src={FacebookIcon}
									alt="Facebook Icon"
									className="w-6 h-6 hover:opacity-75 transition-opacity"
								/>
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
							>
								<img
									src={InstagramIcon}
									alt="Instagram Icon"
									className="w-6 h-6 hover:opacity-75 transition-opacity"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default LandingFooter;
