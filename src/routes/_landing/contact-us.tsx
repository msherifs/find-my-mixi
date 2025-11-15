import {
	mergeForm,
	useForm,
	useStore,
	useTransform,
} from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import MixiInput from "@/components/shared/mixi-input";
import MixiSelect from "@/components/shared/mixi-select";
import MixiTextarea from "@/components/shared/mixi-textarea";
import { Button } from "@/components/ui/button";
import { contactUsFormOptions, zContactUsForm } from "@/forms/contact-us";
import { ContactUsTopic } from "@/server/db/enums";
import {
	getContactUsFormFn,
	submitContactUsFn,
} from "@/server/functions/contact-us";

export const Route = createFileRoute("/_landing/contact-us")({
	component: RouteComponent,
	loader: async () => {
		return {
			state: await getContactUsFormFn(),
		};
	},
});

function RouteComponent() {
	const { t } = useTranslation();
	const { state } = Route.useLoaderData();

	const form = useForm({
		...contactUsFormOptions,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);

	const topicOptions = [
		{ value: ContactUsTopic.ENQUIRY, label: t("contactUs.topics.ENQUIRY") },
		{
			value: ContactUsTopic.SUGGESTION,
			label: t("contactUs.topics.SUGGESTION"),
		},
		{ value: ContactUsTopic.COMPLAINT, label: t("contactUs.topics.COMPLAINT") },
	];

	return (
		<div className="flex flex-col items-center justify-center h-full gap-4 my-20 mx-auto">
			<h2 className="font-epilogue font-bold lg:text-[96.96px] text-[36px] leading-[1] tracking-[-0.02em]">
				{t("contactUs.contact_us")}
			</h2>
			<p className="font-normal text-[20.68px] leading-[31px] tracking-normal text-center lg:w-[668px] max-w-[80%]">
				{t("contactUs.already_part_of_community")}
			</p>
			<form
				action={submitContactUsFn.url}
				method="post"
				encType="multipart/form-data"
				className="lg:w-[480px] w-[80%] flex flex-col items-center gap-5"
			>
				<form.Field
					name="email"
					validators={{ onChange: zContactUsForm.shape.email }}
				>
					{(field) => (
						<MixiInput
							label={t("contactUs.email")}
							placeholder="you@email.com"
							type="email"
							name="email"
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
							onBlur={field.handleBlur}
							autoComplete="email"
							errorMessage={
								field.state.meta.errors[0]
									? t(field.state.meta.errors[0].message)
									: undefined
							}
						/>
					)}
				</form.Field>

				<form.Field
					name="topic"
					validators={{ onChange: zContactUsForm.shape.topic }}
				>
					{(field) => (
						<MixiSelect
							label={t("contactUs.select_a_topic")}
							placeholder={t("contactUs.select_a_topic")}
							options={topicOptions}
							name="topic"
							value={field.state.value}
							onChange={(newValue) => {
								field.handleChange(newValue);
								field.handleBlur();
							}}
							errorMessage={
								field.state.meta.errors[0]
									? t(field.state.meta.errors[0].message)
									: undefined
							}
						/>
					)}
				</form.Field>

				<form.Field
					name="message"
					validators={{ onChange: zContactUsForm.shape.message }}
				>
					{(field) => (
						<MixiTextarea
							label={t("contactUs.or_tell_us_what_you_need")}
							placeholder={t("contactUs.or_tell_us_what_you_need")}
							name="message"
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
							onBlur={field.handleBlur}
							errorMessage={
								field.state.meta.errors[0]
									? t(field.state.meta.errors[0].message)
									: undefined
							}
						/>
					)}
				</form.Field>

				{formErrors.map((error) => (
					<p
						key={error}
						className="w-full rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
					>
						{t(error)}
					</p>
				))}

				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
					]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							className="lg:w-[480px] max-w-[80%] w-full"
							type="submit"
							disabled={!canSubmit}
						>
							{isSubmitting
								? t("contactUs.submitting")
								: t("contactUs.get_assistance")}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
