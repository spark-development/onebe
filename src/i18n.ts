import type { i18n as I18n, TFunction } from "i18next";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import type { I18NextRequest } from "i18next-http-middleware";
import { LanguageDetector } from "i18next-http-middleware";
import path from "path";
import Config from "@/System/Config";

export type { I18n, TFunction, I18NextRequest };
export { i18next };

/**
 * Translation function to be used in the application.
 *
 * @param key The key used for translation
 * @param [options] A list of options to be used for translation.
 */
export const translate = i18next.t.bind(i18next);

/**
 * Function used to clone the translation object.
 *
 * @param lang The language used for the new clone.
 */
export const clone = (lang: string): Promise<TFunction> =>
  new Promise((resolve, reject) =>
    i18next.cloneInstance({ lng: lang }, (err, t) => {
      if (err) {
        return reject(err);
      }

      resolve(t);
    })
  );

/**
 * Internationalisation init function.
 *
 * @param currentDir The current folder of the application.
 */
export default function i18n(currentDir: string = __dirname): Promise<TFunction> {
  return i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      lng: Config.string("i18n.defaultLang", "en"),
      fallbackLng: Config.string("i18n.fallbackLang", "en"),
      supportedLngs: Config.array("i18n.supportedLanguages", [ "en", "ro" ]),
      preload: Config.array("i18n.preload", [ "en", "ro" ]),
      debug: Config.boolean("i18n.debug"),
      backend: {
        loadPath: path.resolve(currentDir, "./locales/{{lng}}.json"),
        addPath: path.resolve(currentDir, "./locales/{{lng}}.json"),
      },
      detection: {
        // order and from where user language should be detected
        order: [/*"path", "session", */ "querystring", "cookie", "header" ],

        // keys or params to lookup language from
        lookupQuerystring: "lang",
        lookupCookie: Config.string("i18n.cookie", "onebe:lang"),
        lookupHeader: "accept-language",
        lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
        lookupFromPathIndex: 0,

        // cache user language
        caches: [ "cookie" ],
        ignoreCase: true, // ignore case of detected language

        // optional expire and domain for set cookie
        cookieExpirationDate: new Date(),
        cookieDomain: Config.string("http.cookie.domain", "localhost"),
        cookiePath: "/",
        cookieSecure: Config.boolean("http.cookie.secure"),
        cookieSameSite: "strict", // "strict", "lax" or "none"
      },
    });
}
