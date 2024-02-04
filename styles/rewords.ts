import { Box } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const RewardsTitle = styled(Box)`
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2em;
  text-align: center;
  margin-bottom: 0.2em;
`;

export const RewardsSubTitle = styled(Box)`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5em;
  text-align: center;
  margin-bottom: 16px;
  color: #e3e3e3;
`;

export const RewardsWalletInfo = styled(Box)`
  border-radius: 20px;
  border-color: #1d1d1d;
  border-style: solid;
  border-width: 2px;
  background: transparent;
`;

export const RewardsWalletInputWraper = styled(Box)`
  padding: 32px;
  padding-bottom: 24px;
  background-image: url(/noise_1noise.webp);
  background-repeat: 'repeat';
`;

export const RewardsWalletInputWarning = styled(Box)`
  padding: 5px;
  border-radius: 8px;
  color: rgb(255, 172, 47);
  background-color: rgba(255, 172, 47, 0.1);
  text-align: center;
  margin-top: 16px;
  font-size: 10px;
`;

export const RewardsWalletBalanceWrapper = styled(Box)`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  background-image: url(/noise_1noise.webp);
  background-repeat: 'repeat';
  color: white;
  justify-content: space-around;
  @media (max-width: 375px) {
    gap: 10px;
    display: grid;
  }
`;

export const RewardsWalletBalanceInfoTitle = styled(Box)`
  color: rgb(202 204 207);
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  height: 20px;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const RewardsWalletCryptoBalance = styled(Box)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
`;

export const RewardsWalletUsdBalance = styled(Box)`
  font-size: 14px;
`;

export const RewardsHistoryGridWrapper = styled(Box)`
  border-radius: 20px;
  border-color: #1d1d1d;
  border-style: solid;
  border-width: 2px;
  background: transparent;
  overflow: hidden;
  margin-top: 30px;
`;

export const RewardsHistoryToolbar = styled(Box)`
  padding: 32px;
  color: white;
  display: flex;
  & .title {
    font-size: 14px;
    font-weight: bold;
  }
  & > div {
    margin-right: 10px;
  }
  & p {
    color: white;
  }
  @media (max-width: 375px) {
    padding: 30px 0px;
    text-align: center;
    display: flow;
  }
`;

export const RewardsHistoryPagination = styled(Box)`
  width: fit-content;
  padding-bottom: 20px;
  padding-top: 10px;
  margin: auto;
  button {
    background: url(/noise_1noise.webp);
    background-repeat: repeat;
  }
`;

export const RewardTableStyle = styled.div`
  width: 100%;
  @media (max-width: 375px) {
    overflow-x: auto;
    & th {
      padding: 3px 10px;
    }
    & th > div {
      width: 80px;
    }
    & td {
      padding: 5px 10px;
    }
  }
`;
