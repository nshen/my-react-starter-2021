import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { defaultLocale, localeMap } from "./config";

const I18nContext = React.createContext({
  t: localeMap[defaultLocale as keyof typeof localeMap],
  locale: defaultLocale,
  setLocale: {} as React.Dispatch<React.SetStateAction<string | undefined>>,
});

interface Props {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: Props) => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);
  if (locale && localeMap[locale as keyof typeof localeMap]) {
    return (
      <I18nContext.Provider
        value={{
          t: localeMap[locale as keyof typeof localeMap],
          locale,
          setLocale,
        }}
      >
        {children}
      </I18nContext.Provider>
    );
  }
  return <>{children}</>;
};

/**
 * 返回 {t , locale, setLocale}
 * 其中：
 * t: { language:'语言' }
 * locale: 'zh-CN'
 * setLocale: (local:string) => void
 */
export const useI18n = () => {
  return useContext(I18nContext);
};
