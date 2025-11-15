import { formOptions } from "@tanstack/react-form";
import { CatFormType, type CatFurColor } from "@/server/db/enums";

export const reportCatOptions = formOptions({
	defaultValues: {
		type: CatFormType.REPORT_CAT_FOUND,
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
});
