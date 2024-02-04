import styled from 'styled-components';

export const HeaderWalletChainStyle = styled.span<{ $color: string }>`
  margin-right: ${({ theme }) => theme.spaceMap.xl}px;
  display: none;
  color: ${({ $color }) => $color};
  line-height: 1.2em;
  font-family: 'Lato', sans-serif;
`;
