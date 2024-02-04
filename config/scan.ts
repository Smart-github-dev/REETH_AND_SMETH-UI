import { CHAINS } from '@lido-sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { basePath } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
};

type ScanUrls = {
  [key: number]: string;
};

export const scanUrls: ScanUrls = {
  [CHAINS.Mainnet]: 'https://etherscan.io',
  [CHAINS.Goerli]: 'https://goerli.etherscan.io',
  [CHAINS.Kovan]: 'https://kovan.ethplorer.io/',
  [CHAINS.Rinkeby]: 'https://rinkeby.etherscan.io',
  [CHAINS.Ropsten]: 'https://ropsten.etherscan.io',
};
