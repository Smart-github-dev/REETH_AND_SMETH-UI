import styled from 'styled-components';

export const WhitelistModalContentStyle = styled.div`
  background-color: var(--lido-color-background);
  border-radius: ${({ theme }) => theme.borderRadiusesMap.lg}px;
  padding: ${({ theme }) => theme.spaceMap.lg}px;
  font-family: 'Lato', sans-serif;
`;
