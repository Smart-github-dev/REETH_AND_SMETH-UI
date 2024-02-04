import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider, ThemeName } from '@lidofinance/lido-ui';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { GlobalStyle } from 'styles';

import ModalProvider from './modals';
import Web3Providers from './web3';
import SDKProviders from './sdk';
export { MODAL, ModalContext } from './modals';

export * from './web3';

const getLibrary = (provider: any) => {
  return new Web3Provider(provider);
};

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CookieThemeProvider initialThemeName={ThemeName.dark}>
    <GlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Providers>
        <SDKProviders>
          <ModalProvider>{children}</ModalProvider>
        </SDKProviders>
      </Web3Providers>
    </Web3ReactProvider>
  </CookieThemeProvider>
);

export default Providers;
