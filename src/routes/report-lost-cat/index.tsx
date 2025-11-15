import { mergeForm, useForm } from "@tanstack/react-form";
import { useTransform } from "@tanstack/react-form-start";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CatImage from "@/assets/images/report-missing-cat.svg";
import ProgressBar from "@/components/report/progress-bar";
import MapLocationPicker from "@/components/shared/location-picker";
import MixiCalendar from "@/components/shared/mixi-calendar";
import MixiFileUpload from "@/components/shared/mixi-file-upload";
import MixiInput from "@/components/shared/mixi-input";
import MixiMultiselect from "@/components/shared/mixi-multiselect";
import MixiPhoneInput from "@/components/shared/mixi-phone-input";
import MixiSelect from "@/components/shared/mixi-select";
import MixiTextarea from "@/components/shared/mixi-textarea";
import { Button } from "@/components/ui/button";
import {
	CatCoatType,
	CatEyeColor,
	CatFurColor,
	CatFurPattern,
	CatSize,
} from "@/server/db/enums";
import {
	getReportLostCatFormFn,
	reportCatSchema,
} from "@/server/functions/cat-reporting";

export const Route = createFileRoute("/report-lost-cat/")({
	component: RouteComponent,
	loader: async () => {
		return {
			state: await getReportLostCatFormFn(),
		};
	},
});

function RouteComponent() {
	const [currentStep, setCurrentStep] = useState(2);
	const [uploadedCatPhoto, setUploadedCatPhoto] = useState<File | null>(null);
	const [uploadedOwnerPhoto, setUploadedOwnerPhoto] = useState<File | null>(
		null,
	);
	const { t } = useTranslation();

	const DUMMY_CAT_PHOTO_URL =
		"https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80";

	const firstStepNextHandler = async () => {
		await form.validateField("catDetails.name", "blur");
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
		await form.validateField("userDetails.dob", "blur");

		const formState = form.state;
		const hasErrors =
			formState.errors.length > 0 ||
			Object.values(formState.fieldMeta).some(
				(field) => field?.errors?.length && field?.errors?.length > 0,
			);

		if (!hasErrors) {
			setCurrentStep(2);
		}
	};

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
			);

		if (!hasErrors) {
			setCurrentStep(3);
		}
	};
	const { state } = useLoaderData({ from: "/report-lost-cat/" });
	const form = useForm({
		defaultValues: {
			type: "REPORT_CAT_FOUND",
			catDetails: {
				name: "",
				furColor: [] as CatFurColor[],
				furPattern: "",
				coatType: "",
				distinctiveMarks: "",
				eyeColor: "",
				size: "",
				date: "",
				additionalInfo: "",
				photo: "",
			},
			userDetails: {
				name: "",
				email: "",
				phone: "",
				dob: "",
				photo:
					"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			},
			location: {
				address: "",
				city: "",
				state: "",
				country: "",
				postalCode: "",
				geoPoint: {
					type: "Point",
					coordinates: [0, 0] as [number, number],
				},
			},
		},
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	});

	return (
		<div className="h-screen h-[100dvh] flex sm:flex-row flex-col w-full sm:p-6 p-3">
			<ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />
			<form
				method="post"
				encType="multipart/form-data"
				className="flex flex-col items-start sm:px-[72px] px-[24px] gap-[48px] flex-grow overflow-y-auto"
			>
				<div className="flex flex-col items-start w-full gap-3 sm:px-8 px-0">
					<img
						src={CatImage}
						alt="Report Lost Cat"
						className="w-[62px] h-auto"
					/>
					<p className="font-semibold text-2xl leading-8 tracking-normal text-gray-900">
						{t("reportCat.report_lost_cat")}
					</p>
				</div>
				{currentStep === 1 && (
					<div className="flex flex-col items-start w-full gap-4 sm:px-8 px-0 w-full">
						<p className="font-medium text-xl leading-[30px] tracking-normal text-gray-900">
							{t("reportCat.cat_information")}
						</p>
						<div className="flex items-start w-full gap-4 sm:flex-row flex-col w-full">
							<form.Field
								name="catDetails.name"
								validators={{
									onBlur: reportCatSchema.shape.catDetails.shape.name,
								}}
							>
								{(field) => (
									<MixiInput
										label={t("reportCat.cats_name")}
										placeholder={t("reportCat.enter_cats_name")}
										type="text"
										name="catDetails.name"
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
											};
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
											};
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
										name="catDetails.name"
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
											};
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
											};
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
											return t("errors.required");
										}

										const date = DateTime.fromISO(value);
										if (!date.isValid) {
											return t("errors.required");
										}
										return undefined;
									},
								}}
							>
								{(field) => (
									<MixiCalendar
										label={t("reportCat.lost_date")}
										placeholder={t("reportCat.select_date")}
										selectedDate={
											field.state.value
												? DateTime.fromISO(field.state.value).toJSDate()
												: undefined
										}
										onDateChange={(value) => {
											if (!value) {
												field.handleChange("");
												return;
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
										setUploadedCatPhoto(file);
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
							<form.Field
								name="catDetails.date"
								validators={{
									onBlur: ({ value }) => {
										if (!value) {
											return t("errors.required");
										}

										const date = DateTime.fromISO(value);
										if (!date.isValid) {
											return t("errors.required");
										}
										return undefined;
									},
								}}
							>
								{(field) => (
									<MixiCalendar
										label={t("reportCat.date_of_birth")}
										placeholder={t("reportCat.select_date")}
										selectedDate={
											field.state.value
												? DateTime.fromISO(field.state.value).toJSDate()
												: undefined
										}
										onDateChange={(value) => {
											if (!value) {
												field.handleChange("");
												return;
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
						<MixiFileUpload
							file={uploadedOwnerPhoto}
							setFile={setUploadedOwnerPhoto}
							label={t("reportCat.upload_your_photo_optional")}
						/>
						<Button className="w-full" onClick={firstStepNextHandler}>
							{t("reportCat.next")}
						</Button>
					</div>
				)}
				{currentStep === 2 && (
					<div className="flex flex-col items-start w-full gap-4 sm:px-8 px-0 w-full">
						<form.Field
							name="location.geoPoint.coordinates"
							validators={{
								onBlur: ({ value }) => {
									if (value[0] === 0 && value[1] === 0) {
										return "Please select a location on the map";
									}

									const [longitude, latitude] = value;
									if (longitude < -180 || longitude > 180) {
										return "Invalid longitude";
									}
									if (latitude < -90 || latitude > 90) {
										return "Invalid latitude";
									}

									return undefined;
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
			</form>
		</div>
	);
}
