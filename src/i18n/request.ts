import { getCookie } from "cookies-next";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // supported languages
  const supportedLanguages = ["en", "ar"];

  // get language from cookies
  let selectedLang: any = getCookie("language");

  // if language is not supported, set default language en
  if (!supportedLanguages.includes(selectedLang)) {
    selectedLang = "en";
  }

  return {
    locale: selectedLang,
    messages: (await import(`../../messages/${selectedLang}.json`)).default,
  };
});
