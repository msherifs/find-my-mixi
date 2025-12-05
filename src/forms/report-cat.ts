import { formOptions } from "@tanstack/react-form";
import { CatFormType, type CatFurColor } from "@/server/db/enums";

export const reportCatOptions = formOptions({
	defaultValues: {
		type: CatFormType.FIND_MY_CAT,
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
			collar: {
				color: "",
				pattern: "",
				embellishment: "",
			},
		},
		userDetails: {
			name: "",
			email: "",
			phone: "",
			dob: "",
			photo: "",
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
});
