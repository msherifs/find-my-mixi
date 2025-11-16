// routes/$lang.tsx
import {
	createFileRoute,
	Outlet,
	redirect,
	useParams,
} from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGUAGES = ["en", "es"] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

function isValidLanguage(lang: string): lang is Language {
	return SUPPORTED_LANGUAGES.includes(lang as Language);
}

export const Route = createFileRoute("/$lang")({
	beforeLoad: ({ params }) => {
		if (!isValidLanguage(params.lang)) {
			const savedLanguage = Cookies.get("language") || "en";
			throw redirect({
				to: "/$lang",
				params: { lang: savedLanguage },
			});
		}
	},
	component: LanguageLayout,
});

function LanguageLayout() {
	const { lang } = useParams({ from: "/$lang" });
	const { i18n } = useTranslation();

	useEffect(() => {
		if (lang && lang !== i18n.language) {
			i18n.changeLanguage(lang);
			Cookies.set("language", lang);
		}
	}, [lang, i18n]);

	return <Outlet />;
}
