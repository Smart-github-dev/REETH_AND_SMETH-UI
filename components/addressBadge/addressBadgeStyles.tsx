import { IdenticonBadge } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const AddressBadgeStyle = styled(IdenticonBadge)`
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'Lato', sans-serif;

  & > * {
    flex-shrink: 0;
  }

  & > :first-child {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 375px) {
    & > :first-child {
      display: none;
    }
  }
`;
