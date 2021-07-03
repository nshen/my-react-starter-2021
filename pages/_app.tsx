import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { help } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  //   help();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
