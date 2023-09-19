import { useWebContext } from '@webb-tools/api-provider-environment/webb-context';
import { ChainConfig } from '@webb-tools/dapp-config/chains/chain-config.interface';
import { CurrencyConfig } from '@webb-tools/dapp-config/currencies/currency-config.interface';
import {
  BalancesFromNotesType,
  useBalancesFromNotes,
} from '@webb-tools/react-hooks/currency/useBalancesFromNotes';
import { TokenListCard } from '@webb-tools/webb-ui-components';
import { AssetType } from '@webb-tools/webb-ui-components/components/ListCard/types';
import { FC, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatEther } from 'viem';
import SlideAnimation from '../../../components/SlideAnimation';
import { BRIDGE_TABS, POOL_KEY } from '../../../constants';
import useChainsFromRoute from '../../../hooks/useChainsFromRoute';
import useCurrenciesFromRoute from '../../../hooks/useCurrenciesFromRoute';

const SelectPool: FC = () => {
  const [searhParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentTxType = useMemo(() => {
    return BRIDGE_TABS.find((tab) => pathname.includes(tab));
  }, [pathname]);

  const { apiConfig } = useWebContext();

  const { srcChainCfg, srcTypedChainId } = useChainsFromRoute();

  const blockExplorer = useMemo(() => {
    return srcChainCfg?.blockExplorers?.default.url;
  }, [srcChainCfg]);

  const { fungibleCurrencies } = useCurrenciesFromRoute(
    srcTypedChainId ?? undefined
  );

  const { balances: balancesFromNotes } = useBalancesFromNotes();

  const pools = useMemo<Array<AssetType>>(
    () => {
      return fungibleCurrencies.map((currencyCfg) => {
        const assetBalanceProps = getBalanceProps(
          currencyCfg,
          balancesFromNotes,
          currentTxType,
          srcTypedChainId
        );

        const chainName = getChainName(
          apiConfig.chains,
          currentTxType,
          srcTypedChainId
        );

        const addr = getAddress(currencyCfg, currentTxType, srcTypedChainId);

        const explorerUrl = getExplorerUrl(blockExplorer, addr);

        return {
          name: currencyCfg.name,
          symbol: currencyCfg.symbol,
          tokenType: 'shielded',
          explorerUrl,
          assetBalanceProps,
          chainName,
        } satisfies AssetType;
      });
    },
    // prettier-ignore
    [apiConfig.chains, balancesFromNotes, blockExplorer, currentTxType, fungibleCurrencies, srcTypedChainId]
  );

  const unavailableTokens = useMemo<Array<AssetType>>(
    () => {
      if (currentTxType === 'deposit') {
        return [];
      }

      return Object.keys(balancesFromNotes).reduce((acc, id) => {
        const balanceRec = balancesFromNotes[+id];
        const currency = apiConfig.currencies[+id];

        Object.entries(balanceRec).forEach(([typedId, balance]) => {
          if (currentTxType && typedId === srcTypedChainId?.toString()) {
            return;
          }

          const chainCfg = apiConfig.chains[+typedId];
          if (typeof balance === 'bigint') {
            acc.push({
              name: currency.name,
              symbol: currency.symbol,
              tokenType: 'shielded',
              assetBalanceProps: {
                balance: +formatEther(balance),
              },
              chainName: chainCfg.name,
            } satisfies AssetType);
          }
        });

        return acc;
      }, [] as Array<AssetType>);
    },
    // prettier-ignore
    [apiConfig.chains, apiConfig.currencies, balancesFromNotes, currentTxType, srcTypedChainId]
  );

  const handleClose = useCallback(
    (selectedCfg?: CurrencyConfig) => {
      const params = new URLSearchParams(searhParams);
      if (selectedCfg) {
        params.set(POOL_KEY, `${selectedCfg.id}`);
      }

      const path = pathname.split('/').slice(0, -1).join('/');
      navigate({
        pathname: path,
        search: params.toString(),
      });
    },
    [navigate, pathname, searhParams]
  );

  const handleTokenChange = useCallback(
    ({ name, symbol }: AssetType) => {
      const currencyCfg = Object.values(apiConfig.currencies).find(
        (cfg) => cfg.name === name && cfg.symbol === symbol
      );

      handleClose(currencyCfg);
    },
    [apiConfig.currencies, handleClose]
  );

  return (
    <SlideAnimation>
      <TokenListCard
        className="h-[var(--card-height)]"
        title={`Select pool to ${currentTxType}`}
        popularTokens={[]}
        selectTokens={pools}
        unavailableTokens={unavailableTokens}
        onChange={handleTokenChange}
        onClose={() => handleClose()}
        txnType={currentTxType}
      />
    </SlideAnimation>
  );
};

export default SelectPool;

const getAddress = (
  currencyCfg: CurrencyConfig,
  txType?: string,
  srcTypedChainId?: number | null
) =>
  txType && typeof srcTypedChainId === 'number'
    ? currencyCfg.addresses.get(srcTypedChainId)
    : undefined;

const getExplorerUrl = (blockExplorer?: string, address?: string) =>
  blockExplorer && address
    ? new URL(`/address/${address}`, blockExplorer).toString()
    : undefined;

const getBalanceProps = (
  currency: CurrencyConfig,
  balances: BalancesFromNotesType,
  txType?: string,
  srcTypedChainId?: number | null
) => {
  if (txType && typeof srcTypedChainId === 'number') {
    const balance = balances[currency.id]?.[srcTypedChainId];
    if (typeof balance === 'bigint') {
      return {
        balance: +formatEther(balance),
      };
    }
  }

  return undefined;
};

const getChainName = (
  chainsConfig: Record<number, ChainConfig>,
  txType?: string,
  srcTypedChainId?: number | null
) => {
  if (txType && typeof srcTypedChainId === 'number') {
    return chainsConfig[srcTypedChainId]?.name;
  }

  return undefined;
};
