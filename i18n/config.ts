import en from './locales/en-US';
import zh from './locales/zh-CN';

// 类似 next.config.js 的配置
export const i18n = {
  // localeDetection: false,
  locales: ['zh-CN', 'en-US'],
  defaultLocale: 'en-US',
};

export const defaultLocale = i18n.defaultLocale;

/****************************************************
 * 配置语言映射
 * key 与 i18n.locales 对应
 * value 为对应的语言配置
 ****************************************************/
export const localeMap = {
  'en-US': en,
  'zh-CN': zh,
};
