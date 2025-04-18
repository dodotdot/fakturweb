// Import translations
import idTranslations from './locales/id.json';
import enTranslations from './locales/en.json';

// Bundle all translations
export const translations = {
  id: idTranslations,
  en: enTranslations
};

// Default language (fallback)
const DEFAULT_LANG = 'id';

/**
 * Get the translation for a key
 * @param {string} lang - The language code (e.g., 'id', 'en')
 * @param {string} namespace - The namespace (e.g., 'ui', 'invoice')
 * @param {string} key - The translation key
 * @returns {string} - The translated text or the key itself if not found
 */
export function getTranslation(lang, namespace, key) {
  // Default to Indonesian if language not supported
  const safeLang = ['id', 'en'].includes(lang) ? lang : DEFAULT_LANG;
  
  try {
    return translations[safeLang][namespace][key] || key;
  } catch (e) {
    console.warn(`Translation missing for ${safeLang}.${namespace}.${key}`);
    return key;
  }
}

/**
 * Get browser language if available
 * @returns {string} - The detected browser language code or default
 */
export function detectBrowserLanguage() {
  try {
    const browserLang = navigator.language.split('-')[0];
    return ['id', 'en'].includes(browserLang) ? browserLang : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

/**
 * Get full translation object for a specific language
 * @param {string} lang - The language code
 * @returns {object} - The full translation object or default language translations
 */
export function getTranslationsByLang(lang) {
  const safeLang = ['id', 'en'].includes(lang) ? lang : DEFAULT_LANG;
  return translations[safeLang] || translations[DEFAULT_LANG];
}

/**
 * Get preferred language from various sources with fallbacks
 * @returns {string} - The preferred language code
 */
export function getPreferredLanguage() {
  try {
    // Try localStorage first
    const storedLang = localStorage.getItem('preferred_language');
    if (storedLang && ['id', 'en'].includes(storedLang)) {
      return storedLang;
    }
  } catch (e) {
    console.warn('Failed to access localStorage for language preference');
  }
  
  // Fall back to browser language
  return detectBrowserLanguage();
} 