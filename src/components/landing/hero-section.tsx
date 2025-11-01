/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <false> */
import { useTranslation } from "react-i18next";
import GroupOfCats from "@/assets/images/hero-cat-group.svg";
import NameContainer from "@/assets/images/hero-cat-mixi.svg";
import HeartIcon from "@/assets/images/hero-heart-icon.svg";
import UFO from "@/assets/images/ufo.svg";
import UFOLight from "@/assets/images/ufo-light.svg";
import { Button } from "../ui/button";

const HeroSection = () => {
	const { t } = useTranslation("");
	return (
		<section className="max-w-[1280px] mx-auto w-full px-9">
			<div className="bg-[#FEDAFFB2] rounded-[40px] px-[72px] pt-15">
				<svg className="absolute w-0 h-0">
					<defs>
						{/** biome-ignore lint/correctness/useUniqueElementIds: false*/}
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
				<div className="flex items-end">
					<h1 className="font-epilogue font-bold text-[50.68px] tracking-[-0.02em] text-black z-10">
						{t("landing.heroSection.lost_your")}
						<span className="font-[900] text-white uppercase pl-[24px]">
							{t("landing.heroSection.mixi")}
						</span>
					</h1>
					<img
						src={NameContainer}
						alt=""
						className="z-1 right-38 bottom-1 relative"
					/>
				</div>
				<div className="flex items-center">
					<p className="font-epilogue font-bold text-[50.68px] tracking-[-0.02em]">
						{t("landing.heroSection.we_will_help_bring_them_home")}
					</p>
					<img
						src={HeartIcon}
						alt=""
						className="relative bottom-8 right-3 w-[60px]"
					/>
				</div>
				<p className="font-normal text-[20.68px] leading-[31px] tracking-normal w-[511px]">
					{t("landing.heroSection.we_quickly_reunite_text")}
				</p>
				<div className="flex items-center gap-4 mt-7">
					<Button size={"lg"}>{t("landing.heroSection.lost_a_cat")}</Button>
					<Button
						variant={"secondary"}
						size={"lg"}
						className="shadow-none border-none"
					>
						{t("landing.heroSection.found_a_cat")}
					</Button>
				</div>
				<div className="h-[450px] relative">
					<div className="absolute left-0 bottom-[40px] flex flex-col items-center">
						<img src={UFO} alt="" className="relative left-5 mb-[10px]" />
						<img src={UFOLight} alt="" />
						<div className="backdrop-blur-[28px] bg-gradient-to-b from-[#DD198E38] to-transparent h-[35px] w-[100px] blur-[8px] relative" />
						<p className="text-primary font-semibold text-[55.04px] leading-[39.98px] tracking-[-0.03em] mb-2 relative bottom-5 [filter:url(#roughen)]">
							1,024
						</p>
						<p className="font-medium text-[21.5px] leading-[34.08px] tracking-[-0.04em] relative bottom-5">
							Cats Found
						</p>
					</div>
					<img
						src={GroupOfCats}
						alt=""
						className="absolute bottom-0 right-[-40px]"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
