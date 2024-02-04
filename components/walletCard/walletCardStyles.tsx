import styled from 'styled-components';
import { Block } from '@lidofinance/lido-ui';

export const WalletCardStyle = styled(Block)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: ${({ theme }) =>
      theme.borderRadiusesMap.xl + theme.spaceMap.lg}px;
  }
  font-family: 'Lato', sans-serif;
  background: transparent;
  background-image: url(/noise_1noise.webp);
  border-color: #1d1d1d;
  border-style: solid;
  border-width: 2px;
  border-bottom: 0;
`;

export const WalletCardRowStyle = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.spaceMap.lg}px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
  font-family: 'Lato', sans-serif;
`;

export const WalletCardBalanceStyle = styled.div`
  margin-right: 18px;
  flex-basis: 50%;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  line-height: 1.6em;

  :last-child {
    margin-right: 0;
  }
  font-family: 'Lato', sans-serif;
`;

export const WalletCardTitleStyle = styled.div``;

export const WalletCardValueStyle = styled.div<{ $small: boolean }>`
  margin-top: 2px;
  font-size: ${({ theme, $small }) =>
    $small ? theme.fontSizesMap.sm : theme.fontSizesMap.md}px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  font-family: 'Lato', sans-serif;
`;

export const WalletCardExtraStyle = styled.div`
  margin-top: 2px;
  opacity: 0.5;
  font-family: 'Lato', sans-serif;
`;

export const WalletCardContentStyle = styled.div<{ $hidden: boolean }>`
  margin-top: 8px;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
  font-family: 'Lato', sans-serif;
`;

export const WalletCardAccountStyle = styled.div`
  align-self: stretch;
  display: flex;
  flex-basis: 50%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;

  & > * {
    cursor: pointer;
  }
  font-family: 'Lato', sans-serif;
`;
