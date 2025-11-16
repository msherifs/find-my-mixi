import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import CatImage from "@/assets/images/report-missing-cat.svg";
import ProgressBar from "@/components/report/progress-bar";
import LostCatReported from "@/components/report-cat/lost-cat-reported";
import MapLocationPicker from "@/components/shared/location-picker";
import MixiCalendar from "@/components/shared/mixi-calendar";
import MixiFileUpload from "@/components/shared/mixi-file-upload";
import MixiInput from "@/components/shared/mixi-input";
import MixiMultiselect from "@/components/shared/mixi-multiselect";
import MixiPhoneInput from "@/components/shared/mixi-phone-input";
import MixiSelect from "@/components/shared/mixi-select";
import MixiTextarea from "@/components/shared/mixi-textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { reportCatOptions } from "@/forms/report-cat";
import {
	CatCoatType,
	CatEyeColor,
	CatFormType,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
} from "@/server/db/enums";
import {
	type ReportCatForm,
	reportCatFn,
	reportCatSchema,
} from "@/server/functions/cat-reporting";

export const Route = createFileRoute("/$lang/report-found-cat/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [currentStep, setCurrentStep] = useState(1);
	const [uploadedCatPhoto, setUploadedCatPhoto] = useState<File | null>(null);
	const [isCatWearingCollar, setIsCatWearingCollar] = useState<
		boolean | undefined
	>(false);
	const { t } = useTranslation();

	const DUMMY_CAT_PHOTO_URL =
		"https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80";

	const firstStepNextHandler = async () => {
		await form.validateField("catDetails.date", "blur");
		await form.validateField("catDetails.furColor", "blur");
		await form.validateField("catDetails.furPattern", "blur");
		await form.validateField("catDetails.coatType", "blur");
		await form.validateField("catDetails.eyeColor", "blur");
		await form.validateField("catDetails.size", "blur");
		await form.validateField("catDetails.photo", "blur");
		await form.validateField("userDetails.name", "blur");
		await form.validateField("userDetails.phone", "blur");
		await form.validateField("userDetails.email", "blur");

		if (isCatWearingCollar) {
			await form.validateField("catDetails.collar.color", "blur");
			await form.validateField("catDetails.collar.pattern", "blur");
			await form.validateField("catDetails.collar.embellishment", "blur");
		}

		const formState = form.state;
		const hasErrors =
			formState.errors.length > 0 ||
			Object.values(formState.fieldMeta).some(
				(field) => field?.errors?.length && field?.errors?.length > 0,
			)

		if (!hasErrors) {
			setCurrentStep(2);
		}
	}

	const secondStepNextHandler = async () => {
		await form.validateField("location.address", "blur");
		await form.validateField("location.city", "blur");
		await form.validateField("location.state", "blur");
		await form.validateField("location.country", "blur");
		await form.validateField("location.postalCode", "blur");
		await form.validateField("location.geoPoint.coordinates", "blur");

		const formState = form.state;
		const hasErrors =
			formState.errors.length > 0 ||
			Object.values(formState.fieldMeta).some(
				(field) => field?.errors?.length && field?.errors?.length > 0,
			)

		if (!hasErrors) {
			setCurrentStep(3);
		}
	}
	const form = useForm({
		defaultValues: {
			...reportCatOptions.defaultValues,
			type: CatFormType.REPORT_CAT_FOUND,
			name: undefined,
		},
		onSubmit: async ({ value }) => {
			const dataToSubmit = {
				...value,
				catDetails: {
					...value.catDetails,
					date: DateTime.fromISO(value.catDetails.date).toJSDate(),
				},
				userDetails: {
					...value.userDetails,
					dob: value.userDetails.dob
						? DateTime.fromISO(value.userDetails.dob).toJSDate()
						: undefined,
				},
			} as ReportCatForm;
			const result = await reportCatFn({ data: dataToSubmit });
			if (result.success) {
				setCurrentStep(4);
			} else {
				toast.error(t("errors.something_went_wrong"));
			}
		},
	})

	if (currentStep === 4)
		return (
			<LostCatReported
				title={t("reportCat.thank_you_for_your_help")}
				description={t("reportCat.your_info_is_vital")}
			/>
		)

	return (
		<div className="h-screen h-[100dvh] flex sm:flex-row flex-col w-full sm:p-6 p-3">
			<ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="flex flex-col items-start sm:px-[72px] px-[24px] gap-[48px] flex-grow overflow-y-auto pt-6 w-full sm:pt-0"
			>
				<div className="flex flex-col items-start w-full gap-3 sm:px-8 px-0">
					<img
						src={CatImage}
						alt="Report Found Cat"
						className="w-[62px] h-auto"
					/>
					<p className="font-semibold text-2xl leading-8 tracking-normal text-gray-900">
						{t("reportCat.report_found_cat")}
					</p>
				</div>
				{currentStep === 1 && (
					<div className="flex flex-col items-start w-full gap-4 sm:px-8 px-0 w-full">
						<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
							{t("reportCat.cat_information")}
						</p>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="catDetails.furColor"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.furColor,
								}}
							>
								{(field) => (
									<MixiMultiselect
										options={Object.values(CatFurColor).map((color) => ({
											label: t(`catFurColor.${color.toLowerCase()}`),
											value: color,
										}))}
										value={field.state.value}
										onValueChange={(value) =>
											field.handleChange(value as CatFurColor[])
										}
										placeholder={t("reportCat.select_fur_color")}
										searchable={false}
										hideSelectAll
										label={t("reportCat.fur_color")}
										name="catDetails.furColor"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="catDetails.furPattern"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.furPattern,
								}}
							>
								{(field) => (
									<MixiSelect
										label={t("reportCat.fur_pattern")}
										placeholder={t("reportCat.select_fur_pattern")}
										value={field.state.value}
										onChange={(value) =>
											field.handleChange(value as CatFurPattern)
										}
										options={Object.values(CatFurPattern).map((pattern) => {
											return {
												label: t(`catFurPattern.${pattern.toLowerCase()}`),
												value: pattern,
											}
										})}
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
							<form.Field
								name="catDetails.coatType"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.coatType,
								}}
							>
								{(field) => (
									<MixiSelect
										label={t("reportCat.coat_type")}
										placeholder={t("reportCat.select_coat_type")}
										value={field.state.value}
										onChange={(value) =>
											field.handleChange(value as CatCoatType)
										}
										options={Object.values(CatCoatType).map((type) => {
											return {
												label: t(`catCoatType.${type.toLowerCase()}`),
												value: type,
											}
										})}
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field name="catDetails.distinctiveMarks">
								{(field) => (
									<MixiInput
										label={t("reportCat.distinctive_marks")}
										placeholder={t("reportCat.distinctive_marks_description")}
										type="text"
										name="catDetails.distinctiveMarks"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
									/>
								)}
							</form.Field>
							<form.Field
								name="catDetails.eyeColor"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.eyeColor,
								}}
							>
								{(field) => (
									<MixiSelect
										label={t("reportCat.eye_color")}
										placeholder={t("reportCat.select_eye_color")}
										value={field.state.value}
										onChange={(value) =>
											field.handleChange(value as CatEyeColor)
										}
										options={Object.values(CatEyeColor).map((color) => {
											return {
												label: t(`catEyeColor.${color.toLowerCase()}`),
												value: color,
											}
										})}
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="catDetails.size"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.size,
								}}
							>
								{(field) => (
									<MixiSelect
										label={t("reportCat.size")}
										placeholder={t("reportCat.select_size")}
										value={field.state.value}
										onChange={(value) => field.handleChange(value as CatSize)}
										options={Object.values(CatSize).map((size) => {
											return {
												label: t(`catSize.${size.toLowerCase()}`),
												value: size,
											}
										})}
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
							<form.Field
								name="catDetails.date"
								validators={{
									onBlur: ({ value }) => {
										if (!value) {
											return t("errors.required")
										}

										const date = DateTime.fromISO(value);
										if (!date.isValid) {
											return t("errors.required")
										}
										return undefined
									},
								}}
							>
								{(field) => (
									<MixiCalendar
										label={t("reportCat.date_found")}
										placeholder={t("reportCat.select_date")}
										selectedDate={
											field.state.value
												? DateTime.fromISO(field.state.value).toJSDate()
												: undefined
										}
										onDateChange={(value) => {
											if (!value) {
												field.handleChange("")
												return
											}

											const isoString = DateTime.fromJSDate(value).toISO();
											field.handleChange(isoString ?? "");
										}}
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0])
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex flex-col items-start gap-2">
							<p className="font-medium text-sm leading-5 tracking-normal text-gray-700">
								{t("reportCat.was_cat_wearing_collar")}
							</p>
							<div className="flex w-full items-center gap-5">
								<div className="flex items-center gap-3">
									<Checkbox
										checked={isCatWearingCollar}
										onCheckedChange={() => setIsCatWearingCollar(true)}
									/>
									<p>{t("reportCat.yes")}</p>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox
										checked={!isCatWearingCollar}
										onCheckedChange={() => {
											setIsCatWearingCollar(false)
											form.setFieldValue("catDetails.collar", {
												color: "",
												pattern: "",
												embellishment: "",
											})
										}}
									/>
									<p>{t("reportCat.no")}</p>
								</div>
							</div>
						</div>
						{isCatWearingCollar && (
							<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
								<form.Field
									name="catDetails.collar.color"
									validators={{
										onBlur: ({ value }) => {
											if (!value || value.length === 0) {
												return t("errors.required")
											}
											return undefined
										},
									}}
								>
									{(field) => (
										<MixiSelect
											label={t("reportCat.collar_color")}
											placeholder={t("reportCat.select_collar_color")}
											value={field.state.value}
											onChange={(value) =>
												field.handleChange(value as CollarSolidColor)
											}
											options={Object.values(CollarSolidColor).map((collor) => {
												return {
													label: t(`collarColor.${collor.toLowerCase()}`),
													value: collor,
												}
											})}
											errorMessage={
												field.state.meta.errors[0]
													? t(field.state.meta.errors[0])
													: undefined
											}
										/>
									)}
								</form.Field>
								<form.Field
									name="catDetails.collar.pattern"
									validators={{
										onBlur: ({ value }) => {
											if (!value || value.length === 0) {
												return t("errors.required")
											}
											return undefined
										},
									}}
								>
									{(field) => (
										<MixiSelect
											label={t("reportCat.collar_pattern")}
											placeholder={t("reportCat.select_collar_pattern")}
											value={field.state.value}
											onChange={(value) =>
												field.handleChange(value as CollarPattern)
											}
											options={Object.values(CollarPattern).map((pattern) => {
												return {
													label: t(`collarPattern.${pattern.toLowerCase()}`),
													value: pattern,
												}
											})}
											errorMessage={
												field.state.meta.errors[0]
													? t(field.state.meta.errors[0])
													: undefined
											}
										/>
									)}
								</form.Field>
								<form.Field
									name="catDetails.collar.embellishment"
									validators={{
										onBlur: ({ value }) => {
											if (!value || value.length === 0) {
												return t("errors.required")
											}
											return undefined
										},
									}}
								>
									{(field) => (
										<MixiSelect
											label={t("reportCat.collar_embellishment")}
											placeholder={t("reportCat.select_collar_embellishment")}
											value={field.state.value}
											onChange={(value) =>
												field.handleChange(value as CollarEmbellishment)
											}
											options={Object.values(CollarEmbellishment).map(
												(embellishment) => {
													return {
														label: t(
															`collarEmbellishment.${embellishment.toLowerCase()}`,
														),
														value: embellishment,
													}
												},
											)}
											errorMessage={
												field.state.meta.errors[0]
													? t(field.state.meta.errors[0])
													: undefined
											}
										/>
									)}
								</form.Field>
							</div>
						)}
						<form.Field
							name="catDetails.photo"
							validators={{
								onBlur: reportCatSchema.shape.catDetails.shape.photo,
							}}
						>
							{(field) => (
								<MixiFileUpload
									file={uploadedCatPhoto}
									setFile={(file) => {
										setUploadedCatPhoto(file)
										field.handleChange(file ? DUMMY_CAT_PHOTO_URL : "");
									}}
									errorMessage={
										field.state.meta.errors[0]
											? t(field.state.meta.errors[0].message)
											: undefined
									}
								/>
							)}
						</form.Field>
						<form.Field name="catDetails.additionalInfo">
							{(field) => (
								<MixiTextarea
									label={t("reportCat.additional_information")}
									placeholder={t(
										"reportCat.additional_information_placeholder",
									)}
									name="catDetails.additionalInfo"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
							)}
						</form.Field>
						<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
							{t("reportCat.owner_information")}
						</p>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="userDetails.name"
								validators={{
									onBlur: reportCatSchema.shape.userDetails.shape.name,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.name")}
										placeholder={t("reportCat.enter_your_name")}
										type="text"
										name="userDetails.name"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
							<form.Field
								name="userDetails.phone"
								validators={{
									onBlur: reportCatSchema.shape.userDetails.shape.phone,
								}}
							>
								{(field) => (
									<MixiPhoneInput
										label={t("reportCat.phone_number")}
										placeholder={t("reportCat.enter_your_phone_number")}
										type="text"
										name="userDetails.phone"
										value={field.state.value}
										onChange={(value) => field.handleChange(value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="userDetails.email"
								validators={{
									onBlur: reportCatSchema.shape.userDetails.shape.email,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.email")}
										placeholder={t("reportCat.enter_your_email")}
										type="text"
										name="userDetails.email"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<Button className="w-full" onClick={firstStepNextHandler}>
							{t("reportCat.next")}
						</Button>
					</div>
				)}
				{currentStep === 2 && (
					<div className="flex flex-col items-start w-full gap-4 sm:px-8 px-0 w-full">
						<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
							{t("reportCat.cat_address")}
						</p>
						<form.Field
							name="location.geoPoint.coordinates"
							validators={{
								onBlur: ({ value }) => {
									if (value[0] === 0 && value[1] === 0) {
										return "Please select a location on the map";
									}

									const [longitude, latitude] = value;
									if (longitude < -180 || longitude > 180) {
										return "Invalid longitude"
									}
									if (latitude < -90 || latitude > 90) {
										return "Invalid latitude"
									}

									return undefined
								},
							}}
						>
							{(field) => (
								<MapLocationPicker
									position={field.state.value}
									setPosition={(position) =>
										field.handleChange(position as [number, number])
									}
									errorMessage={
										field.state.meta.errors[0]
											? t(field.state.meta.errors[0])
											: undefined
									}
								/>
							)}
						</form.Field>
						<form.Field
							name="location.address"
							validators={{
								onBlur: reportCatSchema.shape.location.shape.address,
							}}
						>
							{(field) => (
								<MixiInput
									label={t("reportCat.address")}
									placeholder={t("reportCat.enter_address")}
									type="text"
									name="location.address"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={field.handleBlur}
									autoComplete="off"
									errorMessage={
										field.state.meta.errors[0]
											? t(field.state.meta.errors[0].message)
											: undefined
									}
								/>
							)}
						</form.Field>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="location.city"
								validators={{
									onBlur: reportCatSchema.shape.location.shape.city,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.city")}
										placeholder={t("reportCat.enter_city")}
										type="text"
										name="location.city"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
							<form.Field
								name="location.state"
								validators={{
									onBlur: reportCatSchema.shape.location.shape.state,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.state")}
										placeholder={t("reportCat.enter_state")}
										type="text"
										name="location.state"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="location.postalCode"
								validators={{
									onBlur: reportCatSchema.shape.location.shape.postalCode,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.postal_code")}
										placeholder={t("reportCat.enter_postal_code")}
										type="text"
										name="location.postal_code"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
							<form.Field
								name="location.country"
								validators={{
									onBlur: reportCatSchema.shape.location.shape.country,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.country")}
										placeholder={t("reportCat.enter_country")}
										type="text"
										name="location.country"
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										onBlur={field.handleBlur}
										autoComplete="off"
										errorMessage={
											field.state.meta.errors[0]
												? t(field.state.meta.errors[0].message)
												: undefined
										}
									/>
								)}
							</form.Field>
						</div>
						<Button className="w-full" onClick={secondStepNextHandler}>
							{t("reportCat.next")}
						</Button>
					</div>
				)}
				{currentStep === 3 && (
					<div className="flex flex-col items-start w-full gap-6 sm:px-8 px-0 w-full">
						<ReviewSection
							values={
								{
									...form.state.values,
									catDetails: {
										...form.state.values.catDetails,
										date: DateTime.fromISO(
											form.state.values.catDetails.date,
										).toJSDate(),
									},
									userDetails: {
										...form.state.values.userDetails,
										dob: form.state.values.userDetails.dob
											? DateTime.fromISO(
													form.state.values.userDetails.dob,
												).toJSDate()
											: undefined,
									},
								} as ReportCatForm
							}
							uploadedCatPhoto={uploadedCatPhoto}
						/>
						<form.Subscribe
							selector={(formState) => [
								formState.canSubmit,
								formState.isSubmitting,
							]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button className="w-full" type="submit" disabled={!canSubmit}>
									{isSubmitting ? (
										<Loader2 className="animate-spin" />
									) : (
										t("reportCat.confirm")
									)}
								</Button>
							)}
						</form.Subscribe>
					</div>
				)}
			</form>
		</div>
	)
}

const ReviewSection = ({
	values,
	uploadedCatPhoto,
}: {
	values: ReportCatForm;
	uploadedCatPhoto: File | null;
}) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-start w-full gap-4 w-full">
			{uploadedCatPhoto && (
				<div className="bg-[#F2F2F2] rounded-[24px] p-4 flex items-center justify-center h-[150px] w-full">
					<img
						src={URL.createObjectURL(uploadedCatPhoto)}
						alt="Uploaded Cat"
						className="w-auto h-full object-cover rounded-[16px]"
					/>
				</div>
			)}
			<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
				{t("reportCat.cat_information")}
			</p>
			<ValueCard
				label={t("reportCat.cats_name")}
				value={values.catDetails.name ?? "-"}
			/>
			<div className="w-full flex items-start gap-4">
				<ValueCard
					label={t("reportCat.fur_color")}
					value={values.catDetails.furColor
						.map((color) => t(`catFurColor.${color.toLowerCase()}`))
						.join(" - ")}
				/>
				<ValueCard
					label={t("reportCat.fur_pattern")}
					value={t(
						`catFurPattern.${values.catDetails.furPattern.toLowerCase()}`,
					)}
				/>
				<ValueCard
					label={t("reportCat.coat_type")}
					value={t(`catCoatType.${values.catDetails.coatType.toLowerCase()}`)}
				/>
			</div>
			<div className="w-full flex items-start gap-4">
				<ValueCard
					label={t("reportCat.eye_color")}
					value={t(`catEyeColor.${values.catDetails.eyeColor.toLowerCase()}`)}
				/>
				<ValueCard
					label={t("reportCat.size")}
					value={t(`catSize.${values.catDetails.size.toLowerCase()}`)}
				/>
				<ValueCard
					label={t("reportCat.date_found")}
					value={DateTime.fromJSDate(values.catDetails.date).toFormat(
						"dd/MM/yyyy",
					)}
				/>
			</div>
			<ValueCard
				label={t("reportCat.additional_information")}
				value={values.catDetails.additionalInfo || "-"}
			/>
			<hr className="h-[2px] bg-gray-100 w-full border-none" />
			<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
				{t("reportCat.owner_information")}
			</p>
			<div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
				<ValueCard
					label={t("reportCat.owner_name")}
					value={values.userDetails.name}
				/>
				<ValueCard
					label={t("reportCat.phone_number")}
					value={values.userDetails.phone}
				/>
				<ValueCard
					label={t("reportCat.email")}
					value={values.userDetails.email}
				/>
				<ValueCard
					label={t("reportCat.date_of_birth")}
					value={
						values.userDetails.dob
							? DateTime.fromJSDate(values.userDetails.dob).toFormat(
									"dd/MM/yyyy",
								)
							: "-"
					}
				/>
			</div>
			<hr className="h-[2px] bg-gray-100 w-full border-none" />
			<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
				{t("reportCat.cats_address")}
			</p>
			<ValueCard
				label={t("reportCat.cats_address")}
				value={values.location.address}
			/>
			<div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
				<ValueCard label={t("reportCat.city")} value={values.location.city} />
				<ValueCard label={t("reportCat.state")} value={values.location.state} />
				<ValueCard
					label={t("reportCat.postal_code")}
					value={values.location.postalCode}
				/>
				<ValueCard
					label={t("reportCat.country_region")}
					value={values.location.country}
				/>
			</div>
		</div>
	)
};

const ValueCard = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex flex-col items-start w-full flex-1">
			<p className="font-semibold text-[14px] leading-[20px] tracking-[0] white-space-nowrap">
				{label}
			</p>
			<p className="font-normal text-[14px] leading-[24px] tracking-[0] text-[#6C6C6C] truncate w-[180px] sm:w-full">
				{value.length === 0 ? "-" : value}
			</p>
		</div>
	)
};
