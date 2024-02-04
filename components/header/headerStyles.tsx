import { Container } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const HeaderStyle = styled(Container)`
  padding-top: 18px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
  justify-content: space-between;
`;

export const HeaderLogoStyle = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spaceMap.xxl}px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 14px;
  }
  font-family: 'Lato', sans-serif;
`;

export const HeaderActionsStyle = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  overflow: hidden;
  font-family: 'Lato', sans-serif;
`;

export const HeaderManusStyle = styled.div`
  display: flex;
  background-image: url(/noise_1noise.webp);
  background-repeat: repeat;
  border: 2px solid #1d1d1d;
  border-radius: 0.5rem;
  backdrop-filter: blur(6px);
  padding: 0.2rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  & a {
    color: #e3e3e3;
    display: flex;
    padding: 0.8rem 1.5rem 0.75rem;
    font-size: 1rem;
    &:hover,
    &.active {
      color: #ffffff;
      background-color: #1d1d1d;
      svg {
        fill: #ffffff;
      }
    }
    svg {
      fill: #e3e3e3;
    }
    span {
      margin-left: 5px;
    }
  }
`;
