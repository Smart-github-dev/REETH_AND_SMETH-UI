import { CHAINS } from '@lido-sdk/constants';

export const SMETH_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Ropsten]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Rinkeby]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0xCB8B70Bae0D7599837075Eb691E9c86befa7C2b6',
  // [CHAINS.Goerli]: '0xd2b491add85A5D55056DDa8B9808dAd650494c78',
  // [CHAINS.Goerli]: '0x9b47f716EDc780C62ebeF6e9c2F0219dc4f890E7',
  [CHAINS.Kovan]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kintsugi]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kiln]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbeam]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonriver]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbase]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Arbitrum]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Optimism]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Fuji]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Avalanche]: '0x0000000000000000000000000000000000000000',
};

export const getSMETHAddress = (chainId: CHAINS): string => {
  return SMETH_BY_NETWORK[chainId];
};

export const STETH_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Ropsten]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Rinkeby]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F',
  [CHAINS.Kovan]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kintsugi]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kiln]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbeam]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonriver]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbase]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Arbitrum]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Optimism]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Fuji]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Avalanche]: '0x0000000000000000000000000000000000000000',
};

export const getStethAddress = (chainId: CHAINS): string => {
  return STETH_BY_NETWORK[chainId];
};

export const WITHDRAW_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Mainnet]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Ropsten]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Rinkeby]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Goerli]: '0x30CD609875C5d7686329931C38f3FDf8C1c1D1f3',
  [CHAINS.Kovan]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kintsugi]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Kiln]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbeam]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonriver]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Moonbase]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Arbitrum]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Optimism]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Fuji]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Avalanche]: '0x0000000000000000000000000000000000000000',
};

export const getWithdreawAddress = (chainId: CHAINS): string => {
  return WITHDRAW_BY_NETWORK[chainId];
};
