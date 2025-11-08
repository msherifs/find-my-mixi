import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MixiSelect from "../shared/mixi-select";

const FiltersDrawer = () => {
	const { t } = useTranslation("");
	return (
		<Drawer>
			<DrawerTrigger>
				<Button className="w-10 h-10 text-black" variant={"secondary"}>
					<Filter />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="z-1000 border-none p-5 pt-0! flex flex-col gap-3 bg-white shadow-[0px_7px_36px_0px_#0000000D]">
				<p className="text-gray-700 font-[500] text-[14px] leading-[20px] tracking-[0]">
					{t("map.filter")}
				</p>
				<div className="bg-[#FCFBFB] border border-1 border-[#00000008] flex items-start flex-col gap-2 p-4 rounded-2xl w-full">
					<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
						{t("map.fur")}
					</p>
					<MixiSelect
						placeholder={t("map.color")}
						options={[
							{ value: "black", label: "Black" },
							{ value: "white", label: "White" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={[
							{ value: "solid", label: "Solid" },
							{ value: "tabby", label: "Tabby" },
							{ value: "calico", label: "Calico" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.length")}
						options={[
							{ value: "short", label: "Short" },
							{ value: "medium", label: "Medium" },
							{ value: "long", label: "Long" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
				<div className="bg-[#FCFBFB] border border-1 border-[#00000008] flex items-start flex-col gap-2 p-4 rounded-2xl w-full">
					<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
						{t("map.collar")}
					</p>
					<MixiSelect
						placeholder={t("map.color")}
						options={[
							{ value: "black", label: "Black" },
							{ value: "white", label: "White" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={[
							{ value: "full", label: "Full" },
							{ value: "half", label: "Half" },
							{ value: "bib", label: "Bib" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.embellishments")}
						options={[
							{ value: "mask", label: "Mask" },
							{ value: "eye-liner", label: "Eye Liner" },
							{ value: "boots", label: "Boots" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
				<div className="w-full flex items-center gap-2">
					<MixiSelect
						placeholder={t("map.eye_color")}
						options={[
							{ value: "brown", label: "Brown" },
							{ value: "green", label: "Green" },
							{ value: "orange", label: "Orange" },
						]}
						selectClassName="rounded-full"
					/>
					<MixiSelect
						placeholder={t("map.size")}
						options={[
							{ value: "small", label: "Small" },
							{ value: "medium", label: "Medium" },
							{ value: "large", label: "Large" },
						]}
						selectClassName="rounded-full"
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
export default FiltersDrawer;
