import { useWeb3 } from '@reef-knot/web3-react';
import { CHAINS } from '@lido-sdk/constants';
import { FallbackWalletComponent } from './types';
import { FallbackWalletStyle } from './fallbackWalletStyles';
import dynamics from '../../config/dynamics';

const FallbackWallet: FallbackWalletComponent = (props) => {
  const { chainId } = useWeb3();
  const supportedChains = dynamics.supportedChains;
  const isUnsupported = supportedChains.indexOf(chainId || 0) === -1;
  const chains = supportedChains.map(
    (chainId) => CHAINS[chainId] || chainId,
  );
  const lastChain = chains.pop();
  const chainsString = [chains.join(', '), lastChain].filter((chain) => chain).join(' or ');

  if (isUnsupported) {
    const error = `Unsupported chain. Please switch to ${chainsString} in your wallet`;
    return <FallbackWalletStyle {...props}>{error}</FallbackWalletStyle>;
  }

  return null;
};

export default FallbackWallet;
