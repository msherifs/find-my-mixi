import { useSearch } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	CatCoatType,
	CatEyeColor,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
} from "@/server/db/enums";
import MixiMultiselect from "../shared/mixi-multiselect";
import MixiSelect from "../shared/mixi-select";

const FiltersDrawer = ({
	setFilters,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <false>
	setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}) => {
	const { t } = useTranslation("");
	const search = useSearch({ from: "/$lang/map/" });
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
					<MixiMultiselect
						placeholder={t("map.color")}
						options={Object.values(CatFurColor).map((color) => ({
							label: t(`catFurColor.${color.toLowerCase()}`),
							value: color,
						}))}
						multiSelectClassName="rounded-full h-[42px]!"
						onValueChange={(value) => {
							setFilters((prev) => ({ ...prev, color: value }));
						}}
						hideSelectAll
						searchable={false}
						value={search.color}
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={Object.values(CatFurPattern).map((pattern) => ({
							label: t(`catFurPattern.${pattern.toLowerCase()}`),
							value: pattern,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, pattern: value }));
						}}
						value={search.pattern}
					/>
					<MixiSelect
						placeholder={t("map.length")}
						options={Object.values(CatCoatType).map((type) => ({
							label: t(`catCoatType.${type.toLowerCase()}`),
							value: type,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, coatType: value }));
						}}
						value={search.coatType}
					/>
				</div>
				<div className="bg-[#FCFBFB] border border-1 border-[#00000008] flex items-start flex-col gap-2 p-4 rounded-2xl w-full">
					<p className="font-medium text-sm leading-5 tracking-normal text-[#0F0F0F]">
						{t("map.collar")}
					</p>
					<MixiSelect
						placeholder={t("map.color")}
						options={Object.values(CollarSolidColor).map((color) => ({
							label: t(`collarColor.${color.toLowerCase()}`),
							value: color,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, collarColor: value }));
						}}
						value={search.collarColor}
					/>
					<MixiSelect
						placeholder={t("map.pattern")}
						options={Object.values(CollarPattern).map((pattern) => ({
							label: t(`collarPattern.${pattern.toLowerCase()}`),
							value: pattern,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, collarPattern: value }));
						}}
						value={search.collarPattern}
					/>
					<MixiSelect
						placeholder={t("map.embellishments")}
						options={Object.values(CollarEmbellishment).map(
							(embellishment) => ({
								label: t(`collarEmbellishment.${embellishment.toLowerCase()}`),
								value: embellishment,
							}),
						)}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({
								...prev,
								collarEmbellishments: value,
							}));
						}}
						value={search.collarEmbellishments}
					/>
				</div>
				<div className="w-full flex items-center gap-2">
					<MixiSelect
						placeholder={t("map.eye_color")}
						options={Object.values(CatEyeColor).map((color) => ({
							label: t(`catEyeColor.${color.toLowerCase()}`),
							value: color,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, eyeColor: value }));
						}}
						value={search.eyeColor}
					/>
					<MixiSelect
						placeholder={t("map.size")}
						options={Object.values(CatSize).map((size) => ({
							label: t(`catSize.${size.toLowerCase()}`),
							value: size,
						}))}
						selectClassName="rounded-full h-[42px]!"
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, size: value }));
						}}
						value={search.size}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
export default FiltersDrawer;
