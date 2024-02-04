import { CHAINS } from '@lido-sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { basePath } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: "https://eth-mainnet.g.alchemy.com/v2/39zbsn04QZEBiyRzQVHHJQWIDg2cZO5Z", //getBackendRPCPath(CHAINS.Mainnet),
  [CHAINS.Goerli]: "https://eth-goerli.g.alchemy.com/v2/WTGVtdCQc3VOIMo0RGAeLLfIda39kTR7",//getBackendRPCPath(CHAINS.Goerli),
  [CHAINS.Kovan]: getBackendRPCPath(CHAINS.Kovan),
  [CHAINS.Rinkeby]: getBackendRPCPath(CHAINS.Rinkeby),
  [CHAINS.Ropsten]: getBackendRPCPath(CHAINS.Ropsten),
};
