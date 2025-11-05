import { useTranslation } from "react-i18next";
import GreenLines from "@/assets/images/green-lines.svg";
import OrangeLines from "@/assets/images/orange-lines.svg";
import Avatar from "@/assets/images/testimonial-profile-pic.svg";

const TestimonialSection = () => {
	const { t } = useTranslation();
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <false>
		<section
			className="w-full flex items-center justify-center lg:py-[96px] py-[64px] relative lg:mb-15 scroll-mt-10 px-4 lg:px-0"
			id="testimonials"
		>
			<div className="max-w-[1280px] mx-auto w-full px-9 rounded-[56px] py-[56px] px-[32px] bg-[#F5F4F4] flex items-center justify-center">
				<div className=" flex flex-col items-center gap-8 max-w-[1024px]">
					<p className="text-gray-900 font-medium lg:text-[36px] text-[24px] leading-[44px] tracking-[-2%] text-center">
						{t("landing.testimonialSection.testimonial")}
					</p>
					<div className="flex flex-col items-center gap-4">
						<img src={Avatar} alt="Testimonial Profile Pic" />
						<div className="flex flex-col items-center gap-1">
							<p className="font-semibold text-[18px] leading-[28px] tracking-[0%] text-center text-gray-900">
								Elizabeth Peñaloza
							</p>
							<p className="font-normal text-[16px] leading-[24px] tracking-[0%] text-center text-gray-600">
								{t("landing.testimonialSection.user_description", {
									name: "Mango",
								})}
							</p>
						</div>
					</div>
				</div>
			</div>
			<img
				src={GreenLines}
				alt="Green Decorative Lines"
				className="absolute top-0 right-0 lg:w-auto w-24"
			/>
			<img
				src={OrangeLines}
				alt="Orange Decorative Lines"
				className="absolute lg:bottom-0 left-0 lg:w-auto w-36 bottom-10"
			/>
		</section>
	);
};

export default TestimonialSection;
