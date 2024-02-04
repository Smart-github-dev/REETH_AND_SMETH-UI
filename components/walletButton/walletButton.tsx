import { FC } from 'react';
import { ButtonProps } from '@lidofinance/lido-ui';
import AddressBadge from 'components/addressBadge';

import {
  WalledButtonStyle,
  WalledButtonWrapperStyle,
  WalledButtonBalanceStyle,
  WalledButtonLoaderStyle,
} from './walletButtonStyles';
import { useModal } from 'hooks';
import FormatToken from 'components/formatToken';
import { MODAL } from 'providers';
import { useWeb3 } from '@reef-knot/web3-react';
import { useEthereumBalance } from '@lido-sdk/react';

const WalletButton: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.wallet);
  const { account } = useWeb3();

  const { data: ethVal, loading } = useEthereumBalance(account || '');
  return (
    <WalledButtonStyle size="sm" variant="text" onClick={openModal} {...rest}>
      <WalledButtonWrapperStyle>
        <WalledButtonBalanceStyle>
          {loading ? (
            <WalledButtonLoaderStyle />
          ) : (
            <FormatToken amount={ethVal} symbol="ETH" />
          )}
        </WalledButtonBalanceStyle>
        <AddressBadge address={account} />
      </WalledButtonWrapperStyle>
    </WalledButtonStyle>
  );
};

export default WalletButton;
