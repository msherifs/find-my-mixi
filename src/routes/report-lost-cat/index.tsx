import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ProgressBar from "@/components/report/progress-bar";

export const Route = createFileRoute("/report-lost-cat/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [currentStep, setCurrentStep] = useState(1);
	return (
		<div className="min-h-screen min-h-[100dvh] flex sm:flex-row flex-col w-full sm:p-6 p-3 h-full">
			<ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />
		</div>
	);
}
