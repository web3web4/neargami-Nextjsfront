import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // supported languages
  const supportedLanguages = ["en", "ar"];

  // get language from cookies
  const cookieStore = await cookies();
  let selectedLang: any = cookieStore.get("language")?.value;
  
  // if language is not supported, set default language en
  if (!supportedLanguages.includes(selectedLang)) {
    selectedLang = "en";
  }

  return {
    locale: selectedLang,
    messages: (await import(`../../messages/${selectedLang}.json`)).default,
  };
});
