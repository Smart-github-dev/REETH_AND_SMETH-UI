import { CHAINS } from '@lido-sdk/constants';
import buildDynamics from './scripts/build-dynamics.mjs';

buildDynamics();

const basePath = process.env.BASE_PATH || '';
const infuraApiKey = process.env.INFURA_API_KEY;
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const apiProviderUrls = {
  [CHAINS.Mainnet]: process.env[`API_PROVIDER_URL_${CHAINS.Mainnet}`],
  [CHAINS.Ropsten]: process.env[`API_PROVIDER_URL_${CHAINS.Ropsten}`],
  [CHAINS.Rinkeby]: process.env[`API_PROVIDER_URL_${CHAINS.Rinkeby}`],
  [CHAINS.Goerli]: process.env[`API_PROVIDER_URL_${CHAINS.Goerli}`],
  [CHAINS.Kovan]: process.env[`API_PROVIDER_URL_${CHAINS.Kovan}`],
};

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;
const cspReportUri = process.env.CSP_REPORT_URI;
const defaultChain = process.env.DEFAULT_CHAIN;
const supportedChains = process.env.SUPPORTED_CHAINS;

export default {
  basePath,
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  // WARNING: Vulnerability fix, don't remove until default Next.js image loader is patched
  // images: {
  //   loader: 'custom',
  // },
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^electron$/,
      }),
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  async headers() {
    return [
      {
        // required for gnosis save apps
        source: '/manifest.json',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/redeem',
        destination: '/',
      },
      {
        source: '/deposit',
        destination: '/',
      },
    ];
  },
  serverRuntimeConfig: {
    basePath,
    infuraApiKey,
    alchemyApiKey,
    apiProviderUrls,
    cspTrustedHosts,
    cspReportOnly,
    cspReportUri,
  },
  publicRuntimeConfig: {
    defaultChain,
    supportedChains,
  },
};
