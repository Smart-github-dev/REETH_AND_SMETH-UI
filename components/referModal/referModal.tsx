import { Modal, ModalProps, Input, Button } from '@lidofinance/lido-ui';
import { FC, useEffect, useState } from 'react';
import { ReferModalContentStyle, ReferModalHeaderStyle } from './referModalStyles';
import { APR_SERVER_URI } from 'config';
import { useWeb3 } from '@reef-knot/web3-react';
import { useCopyToClipboard } from 'hooks';
import { Box, ButtonIcon, Copy } from '@lidofinance/lido-ui';

const ReferModal: FC<ModalProps> = (props) => {
  const { account } = useWeb3();
  const { shouldInvertWalletIcon, onClose } = props;
  const [userReferralCode, setUserReferralCode] = useState('');
  const [tvl, setTvl] = useState(0);
  const [totalReferred, setTotalReferred] = useState(0);
  const handleCopy = useCopyToClipboard(userReferralCode ?? '');

  useEffect(() => {
    if (account) {
      (async () => {
        const res = await fetch(`${APR_SERVER_URI}/apr/tvl/${account}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((e) => e.response);
        if (!res || !res.ok) {
          return;
        }
    
        const jsonData = await res.json();
        setTvl(jsonData.tvl);
        setTotalReferred(jsonData.totalReferred);
      })();
    }
  }, [account])

  useEffect(() => {
    const interval = setInterval(() => {
      const code = localStorage.getItem('user_referral_code') || '';
      setUserReferralCode(code);
    }, 500);
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <Modal
      title="Refer & Earn!"
      shouldInvertWalletIcon={shouldInvertWalletIcon}
      onClose={onClose}
      open={props.open}
    >
    <Box style={{display: 'flex', marginBottom: 10}}>
      <Box style={{flex: 1}}>
        <Box style={{fontSize: 13}}>Total Referrals</Box>
        <Box style={{fontSize: 20}}>{totalReferred}</Box>
      </Box>
      <Box style={{flex: 1}}>
        <Box style={{fontSize: 13}}>Total Value Staked</Box>
        <Box style={{fontSize: 20}}> {tvl.toFixed(5)} ETH</Box>
      </Box>
    </Box>
      <ReferModalContentStyle style={{marginTop: "20px"}}>
        <Box>
          <Box style={{textAlign: 'center'}}>
            <Button onClick={handleCopy} style={{background: 'transparent', border: 'dashed 1px white', marginTop: "5px", fontSize: "1.2rem"}}>{userReferralCode}</Button>
          </Box>
          <Box style={{textAlign: 'center', fontSize: "0.7rem", color: "grey", marginTop: "7px"}}>Tap to copy the code and share!</Box>
        </Box>
      </ReferModalContentStyle>
    </Modal>
  );
};

export default ReferModal;
