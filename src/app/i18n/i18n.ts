import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

// This is the configuration for our server-side translation helper
const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) =>
      import(`../../../public/locales/${language}/${namespace}.json`)
    ))
    .init({
      supportedLngs: ['en', 'ar'], // Add the languages you support
      fallbackLng: 'ar',           // Default language if one is not found
      lng: "en",
      ns,
      defaultNS: 'translation',
    });
  return i18nInstance;
};

// This is the main function we'll use in our Server Components
export async function getTranslation(lng: string, ns: string | string[] = 'translation') {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}