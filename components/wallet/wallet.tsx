import {
  WalletCard,
  WalletCardBalance,
  WalletCardRow,
  WalletCardAccount,
} from 'components/walletCard';
import { Divider } from '@lidofinance/lido-ui';

import { useWeb3 } from '@reef-knot/web3-react';

import FormatToken from 'components/formatToken';
import FallbackWallet from 'components/fallbackWallet';
import TokenToWallet from 'components/tokenToWallet';
import { WalletComponent } from './types';
import abiInterface from './../../abi/abi.json';
import stETHAbiInterface from './../../abi/stethABI.json';
import {
  getSMETHAddress, getStethAddress,
} from 'config';
import dynamics from '../../config/dynamics';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useweb3 from 'hooks/useWeb3';


const Wallet: WalletComponent = (props) => {
  const { update } = props;

  const { account, chainId, active } = useWeb3();
  const stethAddress = getStethAddress(chainId || 1);
  const reethAddress = getSMETHAddress(chainId || 1);
  const { utils, eth } = useweb3();
  const contracts = new eth.Contract(
    // @ts-expect-error need to patch eth.Contract
    abiInterface,
    reethAddress,
  ) as any;

  const stETHContract = new eth.Contract(
    // @ts-expect-error need to patch eth.Contract
    stETHAbiInterface,
    stethAddress,
  ) as any;

  const getETHStETH = async () => {
    let reEth = await contracts.methods.balanceOf(account || '0x0').call();
    let stEth = await stETHContract.methods.balanceOf(account || '0x0').call();

    let weth = BigInt(0);
    if (stEth) stEth = BigInt(stEth);
    if (reEth) reEth = BigInt(reEth);
    if (eth) {
      weth = BigInt(await eth.getBalance(account || '0x0'));
    }
    setBalances({
      ethBalance: weth,
      stETHBalance: stEth,
      reETHBalance: reEth
    })

    setBLoading(false)

  };

  const [bLoading, setBLoading] = useState(true);


  const [balances, setBalances] = useState<{
    ethBalance: any | undefined,
    stETHBalance: BigNumber | undefined,
    reETHBalance: BigNumber | undefined
  }>()


  useEffect(() => {
    getETHStETH();
    console.log("get balance",account);
  }, [update]);

  useEffect(() => {
    setBLoading(true);
    setBalances({
      ethBalance: undefined,
      stETHBalance: undefined,
      reETHBalance: undefined
    });
  }, [account])

  return (
    <WalletCard {...props}>
      <WalletCardRow>
        <WalletCardBalance
          title="ETH balance"
          loading={bLoading}
          value={<FormatToken amount={balances?.ethBalance} symbol="ETH" />}
        />
        <WalletCardAccount account={account} />
      </WalletCardRow>
      <Divider />
      <WalletCardRow>
        <WalletCardBalance
          small
          title="LSD Balance"
          loading={bLoading}
          value={
            <>
              <FormatToken amount={balances?.stETHBalance} symbol="stETH" />
              <TokenToWallet address={stethAddress} />
            </>
          }
        />
        <WalletCardBalance
          small
          title="smETH Balance"
          loading={bLoading}
          value={
            <>
              <FormatToken amount={balances?.reETHBalance} symbol="smETH" />
              <TokenToWallet address={reethAddress} />
            </>
          }
        />
      </WalletCardRow>
    </WalletCard>
  );
};

const WalletWrapper: WalletComponent = (props) => {
  const { active, chainId } = useWeb3();
  if (chainId) {
    const isSupported = dynamics.supportedChains.indexOf(chainId) > -1;
    return (active && isSupported) ? <Wallet {...props} /> : <FallbackWallet {...props} />;
  } else {
    return active ? <Wallet {...props} /> : <FallbackWallet {...props} />;
  }
};

export default WalletWrapper;
