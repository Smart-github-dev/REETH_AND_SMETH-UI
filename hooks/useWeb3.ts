import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the ethereum provider change
 */
const useWeb3 = () => {
  const { library, active } = useWeb3React();
  const [web3, setweb3] = useState(new Web3(library?.provider));

  useEffect(() => {
    if (library && active) {
      setweb3(new Web3(library?.provider));
    }
  }, [library, active]);

  return web3;
};

export default useWeb3;
