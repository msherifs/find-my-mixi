import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./en.json";
import esTranslations from "./es.json";

const resources = {
	en: {
		translation: enTranslations,
	},
	es: {
		translation: esTranslations,
	},
};

i18n.use(initReactI18next).init({
	resources,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;
