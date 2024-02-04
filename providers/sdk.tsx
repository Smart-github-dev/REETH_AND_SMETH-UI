import { FC, PropsWithChildren } from 'react';
import { ProviderSDK } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import { useWeb3 } from '@reef-knot/web3-react';

const supportedChainIds = [CHAINS.Mainnet, CHAINS.Goerli];
const defaultChainId = CHAINS.Mainnet;

const SDKProviders: FC<PropsWithChildren> = ({ children }) => {
  const { chainId, library } = useWeb3();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ProviderSDK
      chainId={chainId || defaultChainId}
      supportedChainIds={supportedChainIds}
      providerWeb3={library}
    >
      {children}
    </ProviderSDK>
  );
};

export default SDKProviders;
