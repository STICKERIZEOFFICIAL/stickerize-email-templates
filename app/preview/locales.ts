/**
 * Language variants.
 *
 * Only English exists today. The plumbing is here so adding a variant later is
 * a data change rather than a refactor: the selected locale travels through the
 * preview URL (`?locale=fr`) into the Liquid render as a `locale` variable, and
 * `subjectFor` / `previewTextFor` in registry.ts prefer a translated string
 * when one is present.
 *
 * To add one:
 *   1. Add an entry below.
 *   2. Add `translations: { fr: { subject, previewText } }` to the templates
 *      that have been translated. Anything untranslated falls back to English,
 *      and the switcher marks it as such.
 */

export type LocaleCode = 'en';

export type Locale = {
  code: LocaleCode;
  /** Shown in the switcher. */
  label: string;
  /** Spelled out for the title attribute. */
  name: string;
};

export const LOCALES: Locale[] = [{ code: 'en', label: 'EN', name: 'English' }];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export function isLocaleCode(value: unknown): value is LocaleCode {
  return typeof value === 'string' && LOCALES.some((locale) => locale.code === value);
}

export function toLocale(value: unknown): LocaleCode {
  return isLocaleCode(value) ? value : DEFAULT_LOCALE;
}
