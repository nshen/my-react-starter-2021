import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { themeHelp } from "../styles/theme";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  // themeHelp();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ChakraProvider>
  );
}
export default MyApp;
