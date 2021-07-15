import { useRouter } from "next/router";
import React from "react";

interface Props {}
// https://www.youtube.com/watch?v=DM3S-PXXQLQ

const I18n = (props: Props) => {
  const { locale, locales } = useRouter();
  return (
    <div>
      <h1>current: {locale}</h1>
      <h1>avaliable:</h1>
      <nav>
        <ul>
          {locales && locales.map((locale) => <li key={locale}>{locale}</li>)}
        </ul>
      </nav>
    </div>
  );
};

export default I18n;
