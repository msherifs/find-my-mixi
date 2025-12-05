import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { markAsPresumedOwnerFn } from "@/server/functions/cat-reporting";
import MixiInput from "../shared/mixi-input";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import type { CatRequest } from "./map-container";

const ownerFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "errors.name_min_length" })
		.max(100, { message: "errors.name_max_length" }),
	phone: z.e164({ message: "errors.phone_number" }),
	email: z.string().email({ message: "errors.email" }),
});

const IAmTheOwnerModal = ({
	isOpen,
	onClose,
	catData,
}: {
	isOpen: boolean;
	onClose: () => void;
	catData: CatRequest | null;
}) => {
	const { t } = useTranslation();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			phone: "",
			email: "",
		},
		onSubmit: async ({ value }) => {
			if (!catData) return;

			setError(null);

			try {
				// Validate form data
				const validatedData = ownerFormSchema.parse(value);

				// Submit to server
				await markAsPresumedOwnerFn({
					data: {
						catRequestId: catData._id,
						name: validatedData.name,
						phone: validatedData.phone,
						email: validatedData.email,
					},
				});

				setSuccess(true);

				// Close modal after short delay to show success
				setTimeout(() => {
					setSuccess(false);
					form.reset();
					onClose();
				}, 1500);
			} catch (err) {
				if (err instanceof z.ZodError) {
					const firstError = err.issues[0];
					if (firstError) {
						setError(t(firstError.message));
					} else {
						setError(t("map.validation_error_generic"));
					}
				} else if (err instanceof Error) {
					if (err.message.includes("already registered as presumed owner")) {
						setError(t("map.duplicate_contact_error"));
					} else if (err.message.includes("Cat request not found")) {
						setError(t("map.cat_not_found_error"));
					} else {
						setError(err.message);
					}
				} else {
					setError(t("map.unexpected_error"));
				}
			}
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <false>
	useEffect(() => {
		if (!isOpen) {
			form.reset();
			setError(null);
			setSuccess(false);
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white rounded-[28px] p-5 flex flex-col items-center w-[344px] shadow-[0px_7px_36px_0px_#0000000D] gap-[14px]">
				<div className="flex flex-col items-start gap-[6px] w-full">
					<h2 className="font-semibold text-[16px] leading-[24px] tracking-[0] text-[#0F0F0F]">
						{t("map.i_am_the_owner")}
					</h2>
					<p className="font-regular text-[14px] leading-[20px] tracking-[0] text-[#525252]">
						{t("map.leave_your_info")}
					</p>
				</div>
				<form.Field name="name">
					{(field) => (
						<MixiInput
							label={t("reportCat.name")}
							placeholder={t("reportCat.enter_your_name")}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							errorMessage={field.state.meta.errors[0]}
						/>
					)}
				</form.Field>
				<form.Field name="phone">
					{(field) => (
						<MixiInput
							label={t("map.phone_number")}
							placeholder={t("map.phone_number")}
							type="tel"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							errorMessage={field.state.meta.errors[0]}
						/>
					)}
				</form.Field>
				<form.Field name="email">
					{(field) => (
						<MixiInput
							label={t("map.email")}
							placeholder={t("map.email")}
							type="email"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							errorMessage={field.state.meta.errors[0]}
						/>
					)}
				</form.Field>
				{error && (
					<div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-700 text-sm">{error}</p>
					</div>
				)}

				{success && (
					<div className="w-full p-3 bg-green-50 border border-green-200 rounded-lg">
						<p className="text-green-700 text-sm">
							{t("map.owner_claim_success")}
						</p>
					</div>
				)}

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							className="w-full"
							onClick={form.handleSubmit}
							disabled={!canSubmit || isSubmitting || success}
						>
							{isSubmitting
								? t("map.submitting")
								: success
									? t("map.submitted")
									: t("map.submit")}
						</Button>
					)}
				</form.Subscribe>
			</DialogContent>
		</Dialog>
	);
};

export default IAmTheOwnerModal;
