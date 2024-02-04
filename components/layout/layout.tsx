import { FC, PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/header';
import Main from 'components/main';
import Footer from 'components/footer';
import { LayoutTitleStyle, LayoutSubTitleStyle } from './layoutStyles';
import { LayoutProps } from './types';
import { useModal } from 'hooks';
import { MODAL } from 'providers';
import { useWeb3 } from '@reef-knot/web3-react';
import { APR_SERVER_URI } from 'config';
import dynamics from '../../config/dynamics';

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const { title, subtitle } = props;
  const { children } = props;

  const { active, account, chainId } = useWeb3();

  const isSupported = dynamics.supportedChains.indexOf(chainId || 0) > -1;
  const { openModal, closeModal } = useModal(MODAL.wallet);
  const { openModal: openWhitelistModal } = useModal(MODAL.whitelist);

  useEffect(() => {
    if (!active || !account || !isSupported) {
      openModal();
    } else {
      closeModal();
      fetch(`${APR_SERVER_URI}/whitelist/${account}`)
        .then(async (response) => {
          const jsonData = await response.json();
          if (jsonData.data === null) {
            openWhitelistModal();
            localStorage.setItem('user_referral_code', '');
          } else {
            localStorage.setItem('user_referral_code', jsonData.data.user_referral_code);
            localStorage.setItem('whitelist', JSON.stringify(jsonData.data));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [active, account]);

  return (
    <>
      <Head>
        <meta name="description" content="Supermeta" />
      </Head>
      <Header />
      <Main>
        <LayoutTitleStyle>{title}</LayoutTitleStyle>
        <LayoutSubTitleStyle>{subtitle}</LayoutSubTitleStyle>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
