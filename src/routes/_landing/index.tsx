/** biome-ignore-all lint/correctness/useUniqueElementIds: false */

import { createFileRoute, redirect } from "@tanstack/react-router";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import StatsSection from "@/components/landing/stats-section";
import TestimonialSection from "@/components/landing/testimonial-section";
import WhyUsSection from "@/components/landing/why-us-section";
import { getCurrentUserFn } from "@/server/functions/auth";

export const Route = createFileRoute("/_landing/")({
	component: App,
	beforeLoad: async () => {
		const { user } = await getCurrentUserFn();
		if (user) {
			throw redirect({ to: "/map" });
		}
	},
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
	);
}
