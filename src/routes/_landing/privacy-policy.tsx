import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_landing/privacy-policy")({
	component: RouteComponent,
});

const PRIVACY_POLICIES = [
	{
		number: 1,
		title: "acceptance_of_terms_title",
		description: "acceptance_of_terms_description",
	},
	{
		number: 2,
		title: "services_provided_title",
		description: "services_provided_description",
	},
	{
		number: 3,
		title: "user_responsibilities_title",
		description: [
			"user_responsibilities_description_1",
			"user_responsibilities_description_2",
			"user_responsibilities_description_3",
		],
	},
	{
		number: 4,
		title: "account_creation_title",
		description: "account_creation_description",
	},
	{
		number: 5,
		title: "donations_payments_title",
		description: "donations_payments_description",
	},
	{
		number: 6,
		title: "intellectual_property_title",
		description: "intellectual_property_description",
	},
	{
		number: 7,
		title: "limitation_of_liability_title",
		description: "limitation_of_liability_description",
	},
	{
		number: 8,
		title: "termination_of_accounts_title",
		description: "termination_of_accounts_description",
	},
	{
		number: 9,
		title: "governing_law_title",
		description: "governing_law_description",
	},
];

function RouteComponent() {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center justify-center h-full gap-16 my-20 mx-auto">
			<h2 className="font-epilogue font-bold text-[96.96px] leading-[1] tracking-[-0.02em]">
				{t("privacyPolicy.privacy_policy")}
			</h2>
			<div className="w-[600px]">
				<p className="font-normal text-base leading-6 tracking-normal">
					{t("privacyPolicy.welcome_to_findmymixi")}
				</p>
				<ol className="flex flex-col items-start gap-8">
					{PRIVACY_POLICIES.map((policy) => (
						<PrivacyPolicy
							key={policy.number}
							number={policy.number}
							title={`privacyPolicy.${policy.title}`}
							description={policy.description}
						/>
					))}
					<li className="flex flex-col items-start gap-1">
						<p className="font-normal text-base leading-6 tracking-normal">
							10. {t("privacyPolicy.contact_title")}
						</p>

						<p className="font-normal text-base leading-6 tracking-normal">
							{t(`privacyPolicy.contact_description`)}{" "}
							<a
								href="mailto:support@findmymixi.com"
								className="underline hover:text-primary transition-colors"
							>
								support@findmymixi.com
							</a>
						</p>
					</li>
				</ol>
			</div>
		</div>
	);
}

const PrivacyPolicy = ({
	number,
	title,
	description,
}: {
	number: number;
	title: string;
	description: string | string[];
}) => {
	const { t } = useTranslation();
	return (
		<li className="flex flex-col items-start gap-1">
			<p className="font-normal text-base leading-6 tracking-normal">
				{number}. {t(title)}
			</p>
			{Array.isArray(description) ? (
				<ul className="list-disc list-inside space-y-1 ml-4">
					{description.map((item) => (
						<li
							key={item}
							className="font-normal text-base leading-6 tracking-normal"
						>
							{t(`privacyPolicy.${item}`)}
						</li>
					))}
				</ul>
			) : (
				<p className="font-normal text-base leading-6 tracking-normal">
					{t(`privacyPolicy.${description}`)}
				</p>
			)}
		</li>
	);
};
