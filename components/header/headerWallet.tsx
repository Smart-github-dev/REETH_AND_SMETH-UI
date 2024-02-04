import { FC, useEffect, useState } from 'react';
import { CHAINS, getChainColor } from '@lido-sdk/constants';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from '@reef-knot/web3-react';

import WalletButton from 'components/walletButton';
import WalletConnect from 'components/walletConnect';

import { HeaderWalletChainStyle } from './headerWalletStyles';
import { Injected } from 'components/web3/connectors';
import ReferButton from 'components/referButton/referButton';

const HeaderWallet: FC = () => {
  const { active, activate, account } = useWeb3();
  const { chainId } = useSDK();

  const chainName = CHAINS[chainId];
  const testNet = chainId !== CHAINS.Mainnet;
  const showNet = testNet && active;

  useEffect(() => {
    Injected.isAuthorized()
      .then((isAuthorized) => {
        if (
          isAuthorized &&
          !active &&
          localStorage.getItem('web3-disconnected') !== 'true'
        ) {
          activate(Injected);
        }
      })
      .catch(() => {
        console.log('error');
      });
  }, [active]);

  return (
    <>
      {active ? <ReferButton /> : null}
      {showNet && (
        <HeaderWalletChainStyle $color={getChainColor(chainId)}>
          {chainName}
        </HeaderWalletChainStyle>
      )}
      {active ? <WalletButton /> : <WalletConnect size="sm" />}
    </>
  );
};

export default HeaderWallet;
