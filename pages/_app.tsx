import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Blank from '../builtin/layouts/Blank';
import { I18nProvider } from '../i18n/Context';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  // themeHelp();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <I18nProvider>
          <Blank>
            {/* <HolyGrail> */}
            {/* <SideBar> */}
            <Component {...pageProps} />
            {/* </SideBar> */}
            {/* </HolyGrail> */}
          </Blank>
        </I18nProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
}
export default MyApp;
