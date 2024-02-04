import styled from 'styled-components';
import { Button, InlineLoader } from '@lidofinance/lido-ui';

export const WalledButtonStyle = styled(Button)`
  flex-shrink: 1;
  min-width: unset;
  overflow: hidden;
  font-family: 'Lato', sans-serif;
  background: transparent;
`;

export const WalledButtonWrapperStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: -10px -18px;
  font-family: 'Lato', sans-serif;
`;

export const WalledButtonBalanceStyle = styled.span`
  margin-right: 12px;
  margin-left: 4px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  max-width: 80px;
  min-width: 80px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
  font-family: 'Lato', sans-serif;
`;

export const WalledButtonLoaderStyle = styled(InlineLoader)`
  width: 60px;
  font-family: 'Lato', sans-serif;
  opacity: 0.7;
`;
