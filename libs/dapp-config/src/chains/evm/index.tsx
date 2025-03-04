import { CurrencyId, EVMChainId } from '@webb-tools/dapp-types';
import ArbitrumLogo from '@webb-tools/logos/chains/ArbitrumLogo';
import GanacheLogo from '@webb-tools/logos/chains/GanacheLogo';
import { MoonbeamLogo } from '@webb-tools/logos/chains/MoonbeamLogo';
import OptimismLogo from '@webb-tools/logos/chains/OptimismLogo';
import PolygonLogo from '@webb-tools/logos/chains/PolygonLogo';
import EtherLogo from '@webb-tools/logos/Eth';
import { calculateTypedChainId, ChainType } from '@webb-tools/sdk-core';

import { ChainConfig } from '../chain-config.interface';

export const chainsConfig: Record<number, ChainConfig> = {
  [calculateTypedChainId(ChainType.EVM, EVMChainId.Goerli)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.Goerli,
    name: 'Goerli',
    url: 'https://goerli.infura.io/v3/e54b7176271840f9ba62e842ff5d6db4',
    evmRpcUrls: [
      'https://goerli.infura.io/v3/e54b7176271840f9ba62e842ff5d6db4',
    ],
    blockExplorerStub: 'https://goerli.etherscan.io',
    logo: EtherLogo,
    tag: 'test',
    currencies: [CurrencyId.ETH, CurrencyId.WETH, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.OptimismTestnet)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.OptimismTestnet,
    name: 'Optimism',
    url: 'https://goerli.optimism.io',
    evmRpcUrls: ['https://goerli.optimism.io'],
    blockExplorerStub: 'https://blockscout.com/optimism/goerli',
    logo: OptimismLogo,
    tag: 'test',
    currencies: [CurrencyId.ETH, CurrencyId.WETH, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.ArbitrumTestnet)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.ArbitrumTestnet,
    name: 'Arbitrum',
    url: 'https://goerli-rollup.arbitrum.io/rpc',
    evmRpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    blockExplorerStub: 'https://goerli-rollup-explorer.arbitrum.io/',
    logo: ArbitrumLogo,
    tag: 'test',
    currencies: [CurrencyId.ETH, CurrencyId.WETH, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.PolygonTestnet)]: {
    chainType: ChainType.EVM,
    group: 'matic',
    chainId: EVMChainId.PolygonTestnet,
    name: 'Mumbai',
    tag: 'test',
    url: 'https://rpc-mumbai.maticvigil.com/',
    evmRpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerStub: 'https://mumbai.polygonscan.com/',
    logo: PolygonLogo,
    currencies: [CurrencyId.MATIC, CurrencyId.WETH, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.MATIC,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.HermesLocalnet)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.HermesLocalnet,
    name: 'Hermes',
    tag: 'dev',
    url: 'http://127.0.0.1:5001',
    evmRpcUrls: ['http://127.0.0.1:5001'],
    logo: GanacheLogo,
    currencies: [CurrencyId.webbDEV, CurrencyId.DEV, CurrencyId.ETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.AthenaLocalnet)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.AthenaLocalnet,
    name: 'Athena',
    tag: 'dev',
    url: 'http://127.0.0.1:5002',
    evmRpcUrls: ['http://127.0.0.1:5002'],
    logo: GanacheLogo,
    currencies: [CurrencyId.webbDEV, CurrencyId.DEV, CurrencyId.ETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.DemeterLocalnet)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.DemeterLocalnet,
    name: 'Demeter',
    tag: 'dev',
    url: 'http://127.0.0.1:5003',
    evmRpcUrls: ['http://127.0.0.1:5003'],
    logo: GanacheLogo,
    currencies: [CurrencyId.webbDEV, CurrencyId.DEV, CurrencyId.ETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.MoonbaseAlpha)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    tag: 'test',
    url: 'https://moonbeam-alpha.api.onfinality.io/public',
    evmRpcUrls: ['https://moonbeam-alpha.api.onfinality.io/public'],
    blockExplorerStub: 'https://moonbase.moonscan.io/',
    logo: MoonbeamLogo,
    currencies: [CurrencyId.WETH, CurrencyId.moonDEV, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.moonDEV,
  },
  [calculateTypedChainId(ChainType.EVM, EVMChainId.Sepolia)]: {
    chainType: ChainType.EVM,
    group: 'eth',
    chainId: EVMChainId.Sepolia,
    name: 'Sepolia',
    tag: 'test',
    url: 'https://rpc.sepolia.org',
    blockExplorerStub: 'https://sepolia.etherscan.io/',
    evmRpcUrls: ['https://rpc.sepolia.org'],
    logo: EtherLogo,
    currencies: [CurrencyId.ETH, CurrencyId.WETH, CurrencyId.webbETH],
    nativeCurrencyId: CurrencyId.ETH,
  },
};
