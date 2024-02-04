import { Modal, ModalProps, Input, Button } from '@lidofinance/lido-ui';
import { FC, useEffect, useState } from 'react';
import { WhitelistModalContentStyle } from './whitelistModalStyles';
import { APR_SERVER_URI } from 'config';
import { useModal } from 'hooks';
import { MODAL } from 'providers';
import { useWeb3 } from '@reef-knot/web3-react';

const WhitelistModal: FC<ModalProps> = (props) => {
  const { account } = useWeb3();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const { shouldInvertWalletIcon, onClose: onAfterClose } = props;
  const { openModal } = useModal(MODAL.whitelist);

  const onSubmit = async () => {
    if (code === '') {
      setMessage('Code must have some value.');
      return;
    }
    const res = await fetch(`${APR_SERVER_URI}/whitelist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        account,
      }),
    }).catch((e) => e.response);
    if (!res || !res.ok) {
      const responseJson = await res.json();
      setMessage(responseJson.message);
      return;
    }

    const jsonData = await res.json();
    localStorage.setItem('user_referral_code', jsonData.data.user_referral_code);
    localStorage.setItem('whitelist', JSON.stringify(jsonData));
    onClose();
    return;
  };

  const onClose = () => {
    onAfterClose();
    if (!localStorage.getItem('whitelist')) {
      openModal();
    }
  };

  useEffect(() => {
    localStorage.removeItem('whitelist');
  }, []);

  return (
    <Modal
      title="Enter invite code"
      shouldInvertWalletIcon={shouldInvertWalletIcon}
      onClose={onClose}
      open={props.open}
    >
      <WhitelistModalContentStyle>
        <Input
          label="Code"
          type="text"
          value={code}
          fullwidth
          onChange={(e) => setCode(e.target.value)}
        />
        <div style={{ color: 'red' }}>{message}</div>
        <Button onClick={onSubmit} fullwidth style={{ marginTop: 10 }}>
          Submit
        </Button>
      </WhitelistModalContentStyle>
    </Modal>
  );
};

export default WhitelistModal;
