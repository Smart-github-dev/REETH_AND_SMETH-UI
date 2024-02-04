import { FC } from 'react';
import { ButtonProps } from '@lidofinance/lido-ui';

import {
  ReferButtonStyle,
  ReferButtonWrapperStyle,
  ReferButtonBalanceStyle,
} from './referButtonStyles';
import { useModal } from 'hooks';
import { MODAL } from 'providers';

const ReferButton: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.refer);

  return (
    <ReferButtonStyle size="sm" variant="text" onClick={openModal} {...rest}>
      <ReferButtonWrapperStyle>
        <ReferButtonBalanceStyle>
          Refer
        </ReferButtonBalanceStyle>
      </ReferButtonWrapperStyle>
    </ReferButtonStyle>
  );
};

export default ReferButton;
