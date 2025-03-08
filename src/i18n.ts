import { init, t } from 'i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import jp from './locales/jp.json';
import kr from './locales/kr.json';

function initI18n(lang?: string): void {
document.documentElement.lang = lang || navigator.language;

init({
  lng: lang || navigator.language,
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
    jp: {
      translation: jp,
    },
    kr: {
      translation: kr,
    }
  },
});

document.querySelectorAll('[data-i18n]').forEach((el) => {
  const key = el.getAttribute('data-i18n')!;
  el.textContent = t(key).replace(/%(\w+)%/g, (match: string, key: string) => window[key]?? undefined);
});
}

export default initI18n;
