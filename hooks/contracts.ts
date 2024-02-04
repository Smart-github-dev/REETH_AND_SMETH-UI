import { contractHooksFactory } from '@lido-sdk/react';
import { getSMETHAddress, getStethAddress } from 'config';
import { Abi__factory, StethABI__factory } from 'generated';

const reeth = contractHooksFactory(Abi__factory, (chainId) =>
  getSMETHAddress(chainId),
);
export const useReethContractRPC = reeth.useContractRPC;
export const useReethContractWeb3 = reeth.useContractWeb3;
const steth = contractHooksFactory(StethABI__factory, (chainId) =>
  getStethAddress(chainId),
);

export const useStethContractRPC = steth.useContractRPC;
export const useStethContractWeb3 = steth.useContractWeb3;
