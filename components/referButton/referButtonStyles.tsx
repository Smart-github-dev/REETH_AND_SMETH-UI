import styled from 'styled-components';
import { Button, InlineLoader } from '@lidofinance/lido-ui';

export const ReferButtonStyle = styled(Button)`
  flex-shrink: 1;
  min-width: unset;
  overflow: hidden;
  font-family: 'Lato', sans-serif;
  background: transparent;
`;

export const ReferButtonWrapperStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: -10px -18px;
  font-family: 'Lato', sans-serif;
`;

export const ReferButtonBalanceStyle = styled.span`
  margin-right: 12px;
  margin-left: 4px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  color: white;
  padding: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
  font-family: 'Lato', sans-serif;
`;

export const ReferButtonLoaderStyle = styled(InlineLoader)`
  width: 60px;
  font-family: 'Lato', sans-serif;
  opacity: 0.7;
`;
