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
		<footer className="w-full h-[432px] rounded-t-[80px] bg-[#090009] overflow-hidden">
			<div className="pt-[64px] pb-[124px] w-full">
				<div className="max-w-[1280px] w-full px-8 mx-auto">
					<div className="flex items-start gap-[64px] w-full">
						<img src={FooterIcon} alt="Footer Icon" />
						<div className="flex-grow flex items-start justify-end gap-[96px]">
							<div className="flex flex-col items-start gap-3 min-w-[96px]">
								<Link
									to="/"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.home")}
								</Link>
								<Link
									to="/"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.whyUs")}
								</Link>
								<Link
									to="/"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.testimonials")}
								</Link>
								<Link
									to="/contact-us"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.contactUs")}
								</Link>
							</div>
							<div className="flex flex-col items-start gap-3 min-w-[96px]">
								<Link
									to="/privacy-policy"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.privacyPolicy")}
								</Link>
								<Link
									to="/faq"
									className="bg-transparent font-medium text-base leading-6 text-justify text-white"
								>
									{t("landing.footer.faq")}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-white/10 py-[48px] w-full">
				<div className="max-w-[1280px] px-8 mx-auto">
					<div className="flex items-center justify-between">
						<p className="font-normal text-base leading-6 text-justify text-white">
							{t("landing.footer.copyright")}
						</p>
						<div className="flex items-center gap-6">
							<a href="https://x.com" target="_blank" rel="noopener noreferrer">
								<img src={TwitterIcon} alt="Twitter Icon" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={LinkedInIcon} alt="LinkedIn Icon" />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={FacebookIcon} alt="Facebook Icon" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={InstagramIcon} alt="Instagram Icon" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default LandingFooter;
