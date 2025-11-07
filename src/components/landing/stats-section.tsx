import { useTranslation } from "react-i18next";

const metrics = [
	{ title: "cats_found", value: "1,024" },
	{ title: "cats_reported", value: "1,385" },
	{ title: "cats_delivered", value: "832" },
	{ title: "community_members", value: "2,500+" },
];

const StatsSection = () => {
	const { t } = useTranslation("");
	return (
		<section className="md:px-9 w-full max-w-[1280px] mt-5 mx-auto px-4">
			<div className="flex items-center w-full gap-2 py-[64px] mx-auto lg:flex-row flex-col">
				{metrics.map((metric) => (
					<MetricCard
						key={metric.title}
						title={t(`landing.statsSection.${metric.title}`)}
						value={metric.value}
					/>
				))}
			</div>
		</section>
	);
};

export default StatsSection;

const MetricCard = ({ title, value }: { title: string; value: string }) => {
	return (
		<div className="flex flex-col items-center gap-3 flex-1">
			<p className="font-semibold text-[58px] leading-[72px] tracking-[-0.03em] text-center text-primary">
				{value}
			</p>
			<p className="font-semibold text-[18px] leading-[28px] tracking-normal text-center text-gray-900">
				{title}
			</p>
		</div>
	);
};
