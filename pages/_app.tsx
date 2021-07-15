import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { themeHelp } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { I18nProvider } from "../i18n/Context";

function MyApp({ Component, pageProps }: AppProps) {
  // themeHelp();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <I18nProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </I18nProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
}
export default MyApp;
