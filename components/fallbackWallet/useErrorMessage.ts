import { useWeb3 } from '@reef-knot/web3-react';
import { CHAINS } from '@lido-sdk/constants';
import dynamics from '../../config/dynamics';

export const useErrorMessage = (): string | undefined => {
  const { error, chainId } = useWeb3();
  const supportedChains = dynamics.supportedChains;
  const isUnsupported = supportedChains.indexOf(chainId || 0) === -1;
  const chains = supportedChains.map(
    (chainId) => CHAINS[chainId] || chainId,
  );
  const lastChain = chains.pop();
  const chainsString = [chains.join(', '), lastChain].filter((chain) => chain).join(' or ');

  if (isUnsupported) {
    return `Unsupported chain. Please switch to ${chainsString} in your wallet`;
  }

  return error?.message;
};
