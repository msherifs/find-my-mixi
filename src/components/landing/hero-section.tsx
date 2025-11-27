/** biome-ignore-all lint/a11y/noSvgWithoutTitle: we love svgs without title */
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import GroupOfCats from "@/assets/images/hero-cat-group.svg";
import NameContainer from "@/assets/images/hero-cat-mixi.svg";
import HeartIcon from "@/assets/images/hero-heart-icon.svg";
import UFO from "@/assets/images/ufo.svg";
import UFOLight from "@/assets/images/ufo-light.svg";
import { Button } from "../ui/button";

const HeroSection = () => {
	const { t } = useTranslation("");
	const navigate = useNavigate();
	return (
		<section className="max-w-[1280px] mx-auto w-full px-4 md:px-9">
			<div className="bg-[#FEDAFFB2] rounded-[40px] px-6 pt-10 lg:px-[72px] lg:pt-14">
				<svg className="absolute w-0 h-0">
					<defs>
						<filter id="roughen">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.05"
								numOctaves="2"
								result="noise"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="noise"
								scale="6"
								xChannelSelector="R"
								yChannelSelector="G"
							/>
						</filter>
					</defs>
				</svg>

				<div className="flex items-end gap-[10px] flex-wrap">
					<h1 className="font-epilogue font-bold text-[36px] lg:text-[50.68px] tracking-[-0.02em] text-black">
						{t("landing.heroSection.lost_your")}
					</h1>
					<div className="flex items-end w-[120px] lg:w-auto ">
						<img
							src={NameContainer}
							alt=""
							className="w-full z-0 relative bottom-[2px] lg:bottom-1"
						/>
						<span className="relative right-[110px] lg:right-[150px] font-[900] text-white uppercase relative z-10 font-epilogue text-[36px] lg:text-[50.68px] tracking-[-0.02em]">
							{t("landing.heroSection.mixi")}
						</span>
					</div>
				</div>

				<p className="font-epilogue font-bold text-[36px] lg:text-[50.68px] tracking-[-0.02em]">
					{t("landing.heroSection.we_will_help_bring_them_home")}
					<img
						src={HeartIcon}
						alt=""
						className="inline-block align-baseline relative bottom-2 lg:bottom-6 right-1 lg-right-6 w-[40px] lg:w-[60px]"
					/>
				</p>

				<p className="font-normal text-base lg:text-[20.68px] leading-[31px] tracking-normal max-w-full lg:w-[511px]">
					{t("landing.heroSection.we_quickly_reunite_text")}
				</p>

				<div className="flex flex-col sm:flex-row items-start lg:items-center gap-3 lg:gap-4 mt-7">
					<Button
						size={"lg"}
						className="w-full sm:w-auto"
						onClick={() => navigate({ to: "/report-lost-cat" })}
					>
						{t("landing.heroSection.lost_a_cat")}
					</Button>
					<Button
						variant={"secondary"}
						size={"lg"}
						className="shadow-none border-none w-full sm:w-auto"
						onClick={() => navigate({ to: "/report-found-cat" })}
					>
						{t("landing.heroSection.found_a_cat")}
					</Button>
				</div>

				<div className="h-[300px] lg:h-[450px] relative">
					<div className="absolute left-0 bottom-0 lg:bottom-[40px] flex flex-col items-center">
						<img
							src={UFO}
							alt=""
							className="relative w-[70px] left-5 lg:w-auto mb-[10px]"
						/>
						<img src={UFOLight} alt="" className="w-[100px] lg:w-auto" />
						<div className="backdrop-blur-[28px] bg-gradient-to-b from-[#DD198E38] to-transparent h-[30px] w-[80px] lg:h-[35px] lg:w-[100px] blur-[8px] relative" />
						<p className="text-primary font-semibold text-4xl lg:text-[55.04px] leading-tight lg:leading-[39.98px] tracking-[-0.03em] mb-1 lg:mb-2 relative bottom-4 lg:bottom-5 [filter:url(#roughen)]">
							1,024
						</p>
						<p className="font-medium text-sm lg:text-[21.5px] leading-snug lg:leading-[34.08px] tracking-[-0.04em] relative bottom-4 lg:bottom-5">
							{t("landing.heroSection.cats_found")}
						</p>
					</div>

					<img
						src={GroupOfCats}
						alt=""
						className="absolute bottom-0 right-0 w-[60%] h-auto max-w-[400px] lg:right-[-40px] lg:w-auto lg:max-w-none"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
