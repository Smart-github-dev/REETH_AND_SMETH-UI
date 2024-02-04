import { FC } from 'react';
import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { useModal } from 'hooks';
import { MODAL } from 'providers';

const WalletConnect: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.connect);

  return (
    <Button
      onClick={() => {
        openModal();
        localStorage.setItem('web3-disconnected', 'false');
      }}
      {...rest}
      style={{
        backgroundColor: 'transparent',
        borderColor: '#1d1d1d',
        borderStyle: 'solid',
        borderWidth: 2,
      }}
    >
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            width: '0.6rem',
            height: '0.6rem',
            backgroundColor: '#61d180',
            borderRadius: '50%',
            marginTop: '2px',
          }}
        ></div>
        <div style={{ textDecoration: 'underline' }}>Connect Wallet</div>
      </div>
    </Button>
  );
};

export default WalletConnect;
