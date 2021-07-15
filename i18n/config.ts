import nextConfig from "../next.config";
import en from "./locales/en-US";
import zh from "./locales/zh-CN";

export const defaultLocale = nextConfig.i18n.defaultLocale;

/****************************************************
 * 配置语言映射
 * key 与 next.config.js 配置文件中的 i18n.locales 对应
 * value 为对应的语言配置
 ****************************************************/
export const localeMap = {
  "en-US": en,
  "zh-CN": zh,
};
