import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { I18nProvider } from '../i18n/Context';
import Layout from '../layout/layout';
import theme from '../styles/theme';

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
