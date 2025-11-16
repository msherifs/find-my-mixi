import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import StatsSection from "@/components/landing/stats-section";
import TestimonialSection from "@/components/landing/testimonial-section";
import WhyUsSection from "@/components/landing/why-us-section";

export const Route = createFileRoute("/$lang/_landing/")({
	component: App,
});

function App() {
	return (
		<div className="my-8 mb-0">
			<HeroSection />
			<HowItWorksSection />
			<StatsSection />
			<WhyUsSection />
			<TestimonialSection />
		</div>
	)
}
