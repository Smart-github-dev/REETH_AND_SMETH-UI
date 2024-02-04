import {
  Address,
  ButtonIcon,
  Modal,
  ModalProps,
  Identicon,
  External,
  Copy,
} from '@lidofinance/lido-ui';
import { useEtherscanOpen } from '@lido-sdk/react';
import {
  useConnectorInfo,
  useDisconnect,
  useWeb3
} from '@reef-knot/web3-react';
import { Injected } from 'components/web3/connectors';
import { useCopyToClipboard, useModal } from 'hooks';
import { FC, useCallback } from 'react';
import {
  WalletModalContentStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
  WalletModalConnectStyle,
  WalletModalDisconnectStyle,
  WalletModalAccountStyle,
  WalletModalAddressStyle,
  WalletModalActionsStyle,
} from './walletModalStyles';
import { MODAL } from 'providers';
import dynamics from '../../config/dynamics';

const WalletModal: FC<ModalProps> = (props) => {
  const { shouldInvertWalletIcon, onClose: onAfterClose } = props;
  const { account, activate, chainId, active } = useWeb3();
  const supportedChains = dynamics.supportedChains;
  const isUnsupported = supportedChains.indexOf(chainId || dynamics.defaultChain) === -1;
  const { providerName } = useConnectorInfo();
  const { disconnect } = useDisconnect();
  const { openModal } = useModal(MODAL.whitelist);

  const switchNetwork = async () => {
    try {
      // @ts-ignore
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: '0x' + supportedChains[0].toString(16) }],
      });
    } catch (switchError: any) {
      console.log(switchError);
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        console.log('network does not exists at the extension');
        // try {
        //   await library.provider.request({
        //     method: "wallet_addEthereumChain",
        //     params: [
        //       {
        //         chainId: supportedChains[0].chainId,
        //         rpcUrls: ["https://api.harmony.one"],
        //         chainName: "Harmony Mainnet",
        //         nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
        //         blockExplorerUrls: ["https://explorer.harmony.one"],
        //         iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
        //       }
        //     ],
        //   });
        // } catch (error) {
        //    console.error(error)
        // }
      }
    }
  };

  const handleConnect = useCallback(() => {
    if (isUnsupported) {
      switchNetwork();
      return;
    }
    localStorage.setItem('web3-disconnected', 'false');
    activate(Injected);
  }, [activate, isUnsupported]);

  const onClose = () => {
    onAfterClose();
    if (!localStorage.getItem('whitelist')) {
      openModal();
    }
  };

  const handleDisconnect = useCallback(() => {
    localStorage.setItem('web3-disconnected', 'true');
    disconnect?.();
    // onAfterClose?.();
  }, [disconnect]);

  const handleCopy = useCopyToClipboard(account ?? '');
  const handleEtherscan = useEtherscanOpen(account ?? '', 'address');

  return (
    <Modal
      title="Account"
      shouldInvertWalletIcon={shouldInvertWalletIcon}
      onClose={onClose}
      open={props.open}
    >
      <WalletModalContentStyle>
        {account && !isUnsupported && (
          <WalletModalConnectedStyle>
            {providerName && (
              <WalletModalConnectorStyle>
                Connected with {providerName}
              </WalletModalConnectorStyle>
            )}

            {disconnect && (
              <WalletModalDisconnectStyle
                size="xs"
                variant="outlined"
                onClick={handleDisconnect}
              >
                Disconnect
              </WalletModalDisconnectStyle>
            )}
          </WalletModalConnectedStyle>
        )}

        {account && !isUnsupported && (
          <WalletModalAccountStyle>
            <Identicon address={account ?? ''} />
            <WalletModalAddressStyle>
              <Address address={account ?? ''} symbols={6} />
            </WalletModalAddressStyle>
          </WalletModalAccountStyle>
        )}

        {account && !isUnsupported && (
          <WalletModalActionsStyle>
            <ButtonIcon
              onClick={handleCopy}
              icon={<Copy />}
              size="xs"
              variant="ghost"
            >
              Copy address
            </ButtonIcon>
            <ButtonIcon
              onClick={handleEtherscan}
              icon={<External />}
              size="xs"
              variant="ghost"
            >
              View on Etherscan
            </ButtonIcon>
          </WalletModalActionsStyle>
        )}

        {(!account || isUnsupported) && (
          <WalletModalConnectStyle
            size="xs"
            variant="outlined"
            onClick={handleConnect}
          >
            {isUnsupported ? 'Switch' : 'Connect'}
          </WalletModalConnectStyle>
        )}
      </WalletModalContentStyle>
    </Modal>
  );
};

export default WalletModal;
