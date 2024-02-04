import {
  createContext,
  useMemo,
  useCallback,
  memo,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import { useThemeToggle } from '@lidofinance/lido-ui';
import { WalletsModalForEth } from '@reef-knot/connect-wallet-modal';
import WalletModal from 'components/walletModal';
import WhitelistModal from 'components/whitelistModal';
import ReferModal from 'components/referModal';
import { walletsMetrics } from 'config/matomoWalletsEvents';

export type ModalContextValue = {
  openModal: (modal: MODAL) => void;
  closeModal: () => void;
};

export enum MODAL {
  connect,
  wallet,
  whitelist,
  refer
}

export const ModalContext = createContext({} as ModalContextValue);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [active, setActive] = useState<MODAL | null>(null);
  const { themeName } = useThemeToggle();

  const openModal = useCallback((modal: MODAL) => {
    setActive(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActive(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  const common = {
    onClose: closeModal,
    shouldInvertWalletIcon: themeName === 'dark',
  };


  return (
    <ModalContext.Provider value={value}>
      {children}
      <WalletModal open={active === MODAL.wallet} {...common} />
      <WalletsModalForEth
        open={active === MODAL.connect}
        metrics={walletsMetrics}
        hiddenWallets={['Opera Wallet']}
        {...common}
      />
      <WhitelistModal open={active === MODAL.whitelist} {...common} />
      <ReferModal open={active === MODAL.refer} {...common} />
    </ModalContext.Provider>
  );
};

export default memo<FC<PropsWithChildren>>(ModalProvider);
