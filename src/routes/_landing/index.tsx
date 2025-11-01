/** biome-ignore-all lint/correctness/useUniqueElementIds: false */

import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/hero-section";

export const Route = createFileRoute("/_landing/")({ component: App });

function App() {
	return (
		<div className="max-w-[1280px] mx-auto px-9 my-10">
			<HeroSection />
		</div>
	);
}
