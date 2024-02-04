/** @type string */
export const matomoHost = process.env.MATOMO_HOST;
/** @type number */
export const defaultChain = parseInt(process.env.DEFAULT_CHAIN, 10) || 1;
/** @type String */
export const contracAddress = process.env.CONTRACT_ADRESS;
/** @type number[] */
export const supportedChains = process.env?.SUPPORTED_CHAINS?.split(',').map(
  (chainId) => parseInt(chainId, 10),
) ?? [1, 4, 5];
