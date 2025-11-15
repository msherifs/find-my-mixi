import { Image, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const MixiFileUpload = ({
	file,
	setFile,
	label,
	errorMessage,
}: {
	file: File | null;
	setFile: (file: File | null) => void;
	label?: string;
	errorMessage?: string;
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [dragActive, setDragActive] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const { t } = useTranslation();

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
	const ACCEPTED_IMAGE_TYPES = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/webp",
	];

	// Create and cleanup image preview URL
	useEffect(() => {
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setImagePreview(objectUrl);

			// Cleanup function to revoke the object URL
			return () => URL.revokeObjectURL(objectUrl);
		} else {
			setImagePreview(null);
		}
	}, [file]);

	const validateFile = (selectedFile: File) => {
		setError(null);

		if (!ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
			setError(t("reportCat.invalid_file_type"));
			return false;
		}

		if (selectedFile.size > MAX_FILE_SIZE) {
			setError(t("reportCat.file_too_large"));
			return false;
		}

		return true;
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleRemoveImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFile(null);
		setError(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile && validateFile(selectedFile)) {
			setFile(selectedFile);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile && validateFile(droppedFile)) {
			setFile(droppedFile);
		}
	};
	return (
		<div className="flex flex-col items-start gap-[6px] w-full flex-shrink-0 flex-1 min-w-0">
			{label && (
				<h3 className="font-medium text-sm leading-5 tracking-normal text-gray-700">
					{label}
				</h3>
			)}
			<button
				className={cn(
					"w-full flex flex-col items-center gap-3 py-4 px-6 rounded-[12px] border-1 border-[#E9EAEB]",
					dragActive && "bg-primary/10 border-dashed border-primary",
				)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				type="button"
			>
				<input
					ref={inputRef}
					type="file"
					hidden
					accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
					onChange={handleFileChange}
				/>

				{file && imagePreview ? (
					<div className="relative w-full flex flex-col items-center gap-3">
						<div className="relative w-fit">
							<img
								src={imagePreview}
								alt="Uploaded cat"
								className="w-20 h-auto object-cover rounded-lg"
							/>
							<button
								type="button"
								onClick={handleRemoveImage}
								className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
							>
								<X size={12} />
							</button>
						</div>

						<p className="font-medium text-sm text-green-600">{file.name}</p>
					</div>
				) : (
					<>
						<div className="flex items-center justify-center w-10 h-10 border-1 border-[#D5D7DA] rounded-[8px]">
							<Image color="#535862" size={22} />
						</div>
						<div className="flex flex-col items-center w-full gap-1">
							<p className="font-semibold text-[14px] leading-[20px] tracking-[0] text-primary">
								{t("reportCat.click_to_upload")}
								<span className="font-normal text-[14px] leading-[20px] tracking-[0] text-gray-600">
									{t("reportCat.or_drag_and_drop")}
								</span>
							</p>
							<p className="text-gray-600 font-normal text-xs leading-[18px] text-center">
								{t("reportCat.accepted_formats")}
							</p>
							{error && <p className="text-sm text-red-700">{error}</p>}
						</div>
					</>
				)}
			</button>
			{errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
		</div>
	);
};

export default MixiFileUpload;
