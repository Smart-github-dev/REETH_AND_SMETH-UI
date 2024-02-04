import { Button, Input, Block } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const SubmitButtonWrapper = styled(Button)`
  background: #1a1919;
  border: solid 1px #534f4f;
  &:hover {
    background-color: #ffffff !important;
    color: black;
  }
`;

export const DisabledButtonWrapper = styled(Button)`
  background: #1a1919;
  border: solid 1px #534f4f;
  font-size: 12px;
  padding: 7px;
`;

export const EthAmountSettingStyle = styled(Input)`
  @media (max-width: 375px) {
    padding: 0px;
    & > :first-child {
      padding: 0px;
    }
    & > :nth-child(3) {
      padding: 0px;
    }
  }
`;

export const DetailComponentStyle = styled.div`
  padding: 20px;
  padding-bottom: 0px;
  @media (max-width: 375px) {
    padding: 0px;
  }
`;

export const SupermetaHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  & p {
    font-weight: bold;
    font-size: 20;
  }
  @media (max-width: 375px) {
    padding: 20px 0px;
    & p {
      font-size: 18px;
    }
  }
`;

export const SupermetaComponentStyle = styled(Block)`
  @media (max-width: 375px) {
    padding: 0px;
  }
`;
