import { FC, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Input,
  Table,
  Pagination,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@lidofinance/lido-ui';
import Layout from 'components/layout';
import Link from 'next/link';
import { RewardsSubTitle, RewardsTitle } from 'styles';
import {
  RewardsHistoryGridWrapper,
  RewardsHistoryPagination,
  RewardsHistoryToolbar,
  RewardsWalletBalanceInfoTitle,
  RewardsWalletBalanceWrapper,
  RewardsWalletCryptoBalance,
  RewardsWalletInfo,
  RewardsWalletInputWarning,
  RewardsWalletInputWraper,
  RewardsWalletUsdBalance,
  RewardTableStyle,
} from 'styles/rewords';
import useweb3 from 'hooks/useWeb3';
import { useWeb3 } from '@reef-knot/web3-react';
import { APR_SERVER_URI } from 'config';
import { isAddress } from '@ethersproject/address';
import { formatBalance } from 'utils';
import { BigNumber } from 'ethers';
import useCurveEthereumPools from 'hooks/useCurveEthereumPools';
import { useReethContractRPC } from 'hooks';
import { useContractSWR } from '@lido-sdk/react';

interface IHistory {
  rebase_date: string;
  rebase_block_number: number;
  balance_before_rebase: number;
  balance_after_rebase: number;
  balance_change_reeth: number;
  balance_change_usd: number;
  apr: number;
  wallet_address: string;
}

const getRewardsHistories = async (account: string) => {
  const res = await fetch(
    `${APR_SERVER_URI}/reward/histories/${account}`,
  ).catch((e) => e.response);
  if (!res || !res.ok) {
    console.log('Server failed!');
    return [];
  }

  return res.json();
};

const getTotalRewards = async (account: string) => {
  const res = await fetch(`${APR_SERVER_URI}/reward/total/${account}`).catch(
    (e) => e.response,
  );
  if (!res || !res.ok) {
    console.log('Server failed!');
    return [0, 0, 0];
  }
  const result = await res.json();
  return [Number(result.rewards).toFixed(6), result.apr.toFixed(2), result.balance];
};

const Rewards: FC<any> = () => {
  const { account } = useWeb3();
  const { eth, utils } = useweb3();
  const curvePools = useCurveEthereumPools();
  const contractRPC = useReethContractRPC();

  const totalSupply = useContractSWR({
    contract: contractRPC,
    method: 'totalSupply',
  });

  const [filterAccount, setFilterAccount] = useState<string>(account || '');
  const [reVal, setReVal] = useState('0.0');
  const [usdPrice, setUsdPrice] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [totalRewards, setTotalRewards] = useState(0);
  const [avgApr, setAvgApr] = useState(0);
  const [histories, setHistories] = useState<IHistory[]>([]);

  const getReEthBalance = async (account: string) => {
    const histories = await getRewardsHistories(account);
    // console.log("histories ----->", histories)
    setHistories(histories);
    const totalInfo = await getTotalRewards(account);
    setTotalRewards(totalInfo[0]);
    setAvgApr(totalInfo[1]);
    setReVal(formatBalance(BigNumber.from(totalInfo[2])));
  };

  useEffect(() => {
    if (filterAccount === '' && account && eth.currentProvider) {
      setFilterAccount(account);
    }
  }, [account, eth]);

  useEffect(() => {
    if (isAddress(filterAccount.toLowerCase())) {
      getReEthBalance(filterAccount.toLowerCase());
    }
  }, [filterAccount]);

  useEffect(() => {
    const ethPool: any = curvePools.find(
      (pool: any) =>
        pool.coins[0].symbol === 'stETH' || pool.coins[1].symbol === 'stETH',
    );

    if (ethPool) {
      const stETH = ethPool.coins.find((coin: any) => coin.symbol === 'stETH');
      const price = stETH.usdPrice;
      setUsdPrice(price);
    }
  }, [curvePools]);

  return (
    <Layout>
      <Container size="content">
        <RewardsTitle>Reward History</RewardsTitle>
        <RewardsSubTitle>
          Track your staking & restaking rewards with Supermeta
        </RewardsSubTitle>
        <RewardsWalletInfo>
          <RewardsWalletInputWraper>
            <Input
              style={{ backgroundColor: 'black' }}
              placeholder="Ethereum address"
              fullwidth
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
            />
            <RewardsWalletInputWarning>
              Current balance may differ from last balance in the table due to
              rounding.
            </RewardsWalletInputWarning>
          </RewardsWalletInputWraper>
          <RewardsWalletBalanceWrapper>
            <Box>
              <RewardsWalletBalanceInfoTitle>
                smETH Balance
              </RewardsWalletBalanceInfoTitle>
              {/* <RewardsWalletCryptoBalance>Ξ {reVal}</RewardsWalletCryptoBalance> */}
              <RewardsWalletCryptoBalance> {reVal} ETH </RewardsWalletCryptoBalance>

              <RewardsWalletUsdBalance>
                $ {(parseFloat(reVal) * usdPrice).toFixed(4)}
              </RewardsWalletUsdBalance>
            </Box>
            <Box>
              <RewardsWalletBalanceInfoTitle>
                smETH Rewarded
              </RewardsWalletBalanceInfoTitle>
              <RewardsWalletCryptoBalance>
                 {totalRewards} ETH
              </RewardsWalletCryptoBalance>
              <RewardsWalletUsdBalance>
                $ {(totalRewards * usdPrice).toFixed(2)}
              </RewardsWalletUsdBalance>
            </Box>
            <Box>
              <RewardsWalletBalanceInfoTitle>
                Average APR
              </RewardsWalletBalanceInfoTitle>
              <RewardsWalletCryptoBalance>
                {avgApr * 1} %
              </RewardsWalletCryptoBalance>
              {/* <RewardsWalletUsdBalance>
                <Link href={'/faq'}>More info</Link>
              </RewardsWalletUsdBalance> */}
            </Box>
            <Box>
              <RewardsWalletBalanceInfoTitle>
                smETH price
              </RewardsWalletBalanceInfoTitle>
              <RewardsWalletCryptoBalance>
                $ {usdPrice.toFixed(2)}
              </RewardsWalletCryptoBalance>
              <RewardsWalletUsdBalance>Ξ 1.000 ETH</RewardsWalletUsdBalance>
            </Box>
            <Box>
              <RewardsWalletBalanceInfoTitle>
                Total Value Locked
              </RewardsWalletBalanceInfoTitle>
              <RewardsWalletCryptoBalance>
                {' '}
                {parseFloat(
                  utils.fromWei(totalSupply.data?.toString() || '0x0', 'ether'),
                ).toFixed(4)}{' '} ETH
              </RewardsWalletCryptoBalance>
              <RewardsWalletUsdBalance>
                ${' '}
                {(
                  usdPrice *
                  parseFloat(
                    utils.fromWei(
                      totalSupply.data?.toString() || '0x0',
                      'ether',
                    ),
                  )
                ).toFixed(2)}
              </RewardsWalletUsdBalance>
            </Box>
          </RewardsWalletBalanceWrapper>
        </RewardsWalletInfo>
        <RewardsHistoryGridWrapper>
          <RewardsHistoryToolbar>
            <Box className="title">Track your reETH rewards with Supermeta</Box>
          </RewardsHistoryToolbar>
          <RewardTableStyle>
            <Table style={{ width: '100%' }}>
              <Thead
                sticky
                style={{
                  background: 'url(/noise_1noise.webp)',
                  backgroundRepeat: 'repeat',
                }}
              >
                <Tr>
                  <Th>Date</Th>
                  <Th>Type</Th>
                  <Th>Ξ Change</Th>
                  <Th>$ Change</Th>
                  <Th>API</Th>
                  <Th>Ξ Balance Before</Th>
                  <Th>Ξ Balance After</Th>
                </Tr>
              </Thead>
              <Tbody>
                {histories
                  .slice((activePage - 1) * 5, (activePage - 1) * 5 + 5)
                  .map((history, ind) => (
                    <Tr key={ind}>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        {history.rebase_date}
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        Reward
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        Ξ {Number(history.balance_change_reeth).toFixed(8)}
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        $ {Number(history.balance_change_usd).toFixed(2)}
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        {history.apr.toFixed(1)} %
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        Ξ {Number(history.balance_before_rebase).toFixed(8)}
                      </Td>
                      <Td
                        style={{
                          color: 'white',
                          borderBottom: '#484855',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: 1,
                        }}
                      >
                        Ξ {Number(history.balance_after_rebase).toFixed(8)}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </RewardTableStyle>
          <RewardsHistoryPagination>
            <Pagination
              pagesCount={Math.floor(histories.length / 5) + 1}
              activePage={activePage}
              onItemClick={(ind: number) => setActivePage(ind)}
            />
          </RewardsHistoryPagination>
        </RewardsHistoryGridWrapper>
      </Container>
    </Layout>
  );
};

export default Rewards;
