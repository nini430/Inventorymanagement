import jsCookie from 'js-cookie';
import languages from '../utils/langs';

const useLocales = () => {
  const currentLanguageCode = jsCookie.get('i18next') || 'en';
  const currentLanguage = languages.find(
    (lang) => lang.code === currentLanguageCode
  );
  return {
    currentLanguageCode,
    currentLanguageCountryCode: currentLanguage?.country_code,
    nativeName: currentLanguage?.name,
  };
};

export default useLocales;
