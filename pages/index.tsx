/* eslint-disable prettier/prettier */
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BigNumber } from '@ethersproject/bignumber';

import {
  Block,
  Steth,
  Eth,
  Select,
  Option,
  Box,
  Text,
  toast,
  Container,
} from '@lidofinance/lido-ui';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';

import useweb3 from 'hooks/useWeb3';

import Wallet from 'components/wallet';
import Layout from 'components/layout';
import { FAQItem } from 'utils/faqList';
import abiInterface from './../abi/abi.json';
import stETHAbiInterface from './../abi/stethABI.json';
import withdrawInterface from './../abi/withdraw.json';
import { useWeb3 } from '@reef-knot/web3-react';
import {
  APR_SERVER_URI,
  getSMETHAddress,
  getStethAddress,
  getWithdreawAddress,
} from 'config';
import { formatBalance, getDate } from 'utils';
import { useContractSWR, useEthPrice } from '@lido-sdk/react';
import { useReethContractRPC } from 'hooks';
import useCurveEthereumPools from 'hooks/useCurveEthereumPools';
import MaxButton from 'components/maxButton/maxButton';
import { SubmitButtonWrapper, DisabledButtonWrapper, EthAmountSettingStyle, DetailComponentStyle, SupermetaHeaderStyle, SupermetaComponentStyle } from 'styles/main';
import { WalledButtonLoaderStyle } from 'components/walletButton/walletButtonStyles';
import { scanUrls } from 'config/scan';

interface HomeProps {
  faqList: FAQItem[];
}

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;


const getApr = async () => {
  let res;
  try {
    res = await fetch(`${APR_SERVER_URI}/apr`);
    if (!res?.ok) {
      console.log('Server failed!');
      return { apr: 0, holders: 0 };
    }
    return res.json();
  } catch (error) {
    console.log('Error in fetch api', error);
    return { apr: 0, holders: 0 };
  }
};

const TxPriceComponent = ({ gasLimit }: any) => {
  const { data: loading } = useEthPrice();
  // const txPrice = ((ethPrice || 0) * gasLimit) / 10 ** 9;
  const txPrice = gasLimit * 2 / 10 ** 9;
  // console.log(gasLimit, "gasLimit")
  return (
    <Text size="sm">
      {loading ? <WalledButtonLoaderStyle /> : txPrice.toFixed(6) + ' GWEI'}
    </Text>
  );
};


const HoverableDiv = styled.div`
  transition: background-color 0.3s;
  list-style-type: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: white !important;
    color: black;
  }
`;

const HoverDropdown = ({ items, onChange }: { items: any[], onChange: (id: any) => any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setValue] = useState<number>(0);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleSelect = (id: any, i: number) => {
    handleMouseLeave();
    onChange(id);
    setValue(i);
  }

  const UpTriangleIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 16 16"
      >
        <path d="M8 1.5L0.5 9H15.5L8 1.5Z" fill="currentColor" />
      </svg>
    );
  };
  const DownTriangleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 14.5L0.5 7H15.5L8 14.5Z" fill="currentColor" />
    </svg>
  );


  return (
    <div onMouseLeave={handleMouseLeave} style={{ flex: 1, position: "relative", width: "100px" }}>
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleMouseEnter}
        style={{
          color: "white",
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          transition: ".3s",
          border: `.5px solid ${isOpen ? "rgb(97 93 93)" : "rgb(32 31 31)"}`,
          borderRadius: "8px",
          padding: "15px",
        }}>
        <span style={{ float: "left" }}>{items[selected].name}</span>
        <span style={{ float: "right" }}>{isOpen ? <DownTriangleIcon /> : <UpTriangleIcon />}</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            transition: ".5s",
            width: "100%",
            borderRadius: "5px",
            backgroundColor: "#666666",
            overflow: "hidden",
            fontWeight: "bold"
          }}>
          <ul >

            {items.map((item, i) => {
              return <HoverableDiv
                onClick={() => handleSelect(item.id, i)}
                key={i}
                style={{
                  background: selected == i ? "#999999" : "transparent",
                }}
              >
                {item.name}
              </HoverableDiv>
            })}
          </ul>
        </div>
      )}
    </div >
  );
};


const Home: FC<HomeProps> = () => {
  const router = useRouter();

  const { account, chainId } = useWeb3();
  const { utils, eth } = useweb3();
  const contracts = new eth.Contract(
    // @ts-expect-error need to patch eth.Contract
    abiInterface,
    getSMETHAddress(chainId || 1),
  ) as any;

  const stETHContract = new eth.Contract(
    // @ts-expect-error need to patch eth.Contract
    stETHAbiInterface,
    getStethAddress(chainId || 1),
  ) as any;

  const withdrawContract = new eth.Contract(
    // @ts-expect-error need to patch eth.Contract
    withdrawInterface,
    getWithdreawAddress(chainId || 1),
  ) as any;

  const [ethView, setEthView] = useState(true);
  const [tokenVal, setTokenVal] = useState<number | 0>(0);
  const [apr, setApr] = useState<number | 0>(0);
  const [holders, setHolders] = useState<number | 0>(0);
  const [usdPrice, setUsdPrice] = useState(0);
  const [estimateTxCost, setEstimateTxCost] = useState<number | 0>(0);
  const [selectedTab, setSelectedTab] = useState(1);
  const [submitBtn, setSubmitBtn] = useState('Deposit');
  const [lockDuringValue, setLockDuringValue] = useState<number | 0>(0);
  const [rateByETHValue, setRateByETHValue] = useState(1);
  const [withdrawals, setWithdrawals] = useState([]);
  const [tokenAmountInvaliedErrorMessage, setTokenAmountInvaliedErrorMessage] =
    useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [redeemButton, setRedeemButton] = useState("");
  const [walletUpdate, setWalletUpdate] = useState(0);

  const contractRPC = useReethContractRPC();
  const curvePools = useCurveEthereumPools();

  const totalSupply = useContractSWR({
    contract: contractRPC,
    method: 'totalSupply',
  });

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

  useEffect(() => {
    if (selectedTab === 1) {
      setSubmitBtn('Deposit');
      setEthView(true);
    } else {
      setSubmitBtn('Create Withdraw Request');
    }
  }, [selectedTab]);

  useEffect(() => {
    if (router.asPath === '/deposit' || router.asPath === '/') {
      setSelectedTab(1);
    } else {
      setSelectedTab(2);
    }
  }, [router.asPath]);

  useEffect(() => {
    const updateEstimateTransactionCost = async () => {
      const gasPirce = await eth.getGasPrice();
      if (ethView) {
        const estimateGas = await eth.estimateGas({
          value: '1000000000',
          data: contracts.methods.depositETH().encodeABI(),
          from: account || '0x0',
          to: getSMETHAddress(chainId || 1),
        });
        setEstimateTxCost(estimateGas * Number(gasPirce));

      } else {
        const estimateGas1 = await eth.estimateGas({
          value: '0x0',
          data: stETHContract.methods
            .approve(getSMETHAddress(chainId || 1), '1000000000')
            .encodeABI(),
          from: account || '0x0',
          to: getStethAddress(chainId || 1),
        });

        // const estimateGas2 = await eth.estimateGas({
        //   value: '0x0',
        //   data: contracts.methods.depositStETH('1000000000').encodeABI(),
        //   from: account || '0x0',
        //   to: getSMETHAddress(chainId || 1),
        // });
        setEstimateTxCost(estimateGas1 * Number(gasPirce));
      }
    };

    if (account && eth.currentProvider) {
      updateEstimateTransactionCost();
      getDuring();
      getExchangeRateByETH();
      getAllWithdraws();
    }
  }, [account, ethView, eth.currentProvider]);

  useEffect(() => {
    const matomoSomeEvent: MatomoEventType = [
      'Lido_Frontend_Template',
      'Mount index component',
      'mount_index_component',
    ];

    trackEvent(...matomoSomeEvent);
    getApr().then((data) => {
      // console.log("jinjin ---", data);
      setApr(data.apr);
      setHolders(data.holders);
    });
  }, []);

  const getDuring = async () => {
    try {
      const during = await withdrawContract.methods.lockDuring().call();
      setLockDuringValue(during);
    } catch (error) {
      console.log(error);
    }
  };

  const getExchangeRateByETH = async () => {
    try {
      const exchangeRateByETH: number = await withdrawContract.methods.exchangeRateByETH().call();
      setRateByETHValue(exchangeRateByETH);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllWithdraws = async () => {
    try {
      const withdraws = await withdrawContract.methods.getWithdrawsByOwner(account).call();
      setWithdrawals(withdraws);
    } catch (error) {
      console.log(error);
    }
  }

  const claimETH = async (tokenId: string, isStETH: boolean) => {
    try {
      setRedeemButton(tokenId);
      const approved = await withdrawContract.methods.isApprovedForAll(account, getWithdreawAddress(chainId || 1)).call();
      if (!approved) {
        await withdrawContract.methods.setApprovalForAll(getWithdreawAddress(chainId || 1), true).send({ from: account })
      }
      const gas = await eth.estimateGas({
        value: '0x0',
        data: withdrawContract.methods
          .claimWithdraw(Number(tokenId), isStETH)
          .encodeABI(),
        from: account || '0x0',
        to: getWithdreawAddress(chainId || 1),
      });
      await withdrawContract.methods.claimWithdraw(Number(tokenId), isStETH).send({ from: account, gas });
      setRedeemButton("");
      getAllWithdraws();
    } catch (e: any) {
      console.log(e)
      toast.error(e.message || "Transaction failed", {
        closeButton: false,
      });
      setRedeemButton("");
    }
  }

  const updateTokenAmount = (e: any) => {
    const val = parseFloat(e?.target?.value);
    if (e?.target?.value === '') {
      setTokenAmountInvaliedErrorMessage('');
    } else if (isNaN(val)) {
      setTokenAmountInvaliedErrorMessage('Please enter a valid number.');
    } else if (val <= 0) {
      setTokenAmountInvaliedErrorMessage('The value must be greater than 0.');
    } else {
      setTokenAmountInvaliedErrorMessage('');
    }
    setTokenVal(e?.target?.value);
  };

  const handleSubmit = async () => {
    try {
      if (tokenVal > 0) {
        const sendTokenVal = utils.toWei(tokenVal.toString(), 'ether');
        const tokenVals = await getETHStETH();
        setButtonDisabled(true);
        if (selectedTab == 1) {
          if (ethView) {
            if (
              BigNumber.from(sendTokenVal).gt(BigNumber.from(tokenVals.weth))
            ) {
              toast.error('Please enter the correct deposit amount', {
                closeButton: false,
              });
              setButtonDisabled(false);
              return;
            }

            setSubmitBtn('Sending Transaction...');
            await contracts.methods
              .depositETH()
              .send({ from: account || '0x0', value: sendTokenVal });

            setSubmitBtn('Deposit');
            setTokenVal(0);
            toast.success('Deposit has been successfully processed', {
              closeButton: false,
            });
          } else {
            if (
              BigNumber.from(sendTokenVal).gt(BigNumber.from(tokenVals.stEth))
            ) {
              toast.error('Please enter the correct deposit amount', {
                closeButton: false,
              });
              setButtonDisabled(false);
              return;
            }

            const allowance = await stETHContract.methods
              .allowance(account || '0x0', getSMETHAddress(chainId || 1))
              .call();

            if (BigNumber.from(sendTokenVal).gt(BigNumber.from(allowance))) {
              const gas = await eth.estimateGas({
                value: '0x0',
                data: stETHContract.methods
                  .approve(getSMETHAddress(chainId || 1), sendTokenVal)
                  .encodeABI(),
                from: account || '0x0',
                to: getStethAddress(chainId || 1),
              });

              setSubmitBtn('Approving...');
              await stETHContract.methods
                .approve(getSMETHAddress(chainId || 1), sendTokenVal)
                .send({
                  from: account || '0x0',
                  gas,
                });
            }

            const gas = await eth.estimateGas({
              value: '0x0',
              data: contracts.methods.depositStETH(sendTokenVal).encodeABI(),
              from: account || '0x0',
              to: getSMETHAddress(chainId || 1),
            });

            setSubmitBtn('Sending Transaction...');
            await contracts.methods
              .depositStETH(sendTokenVal)
              .send({ from: account || '0x0', gas });

            setTokenVal(0);
            setSubmitBtn('Deposit');
            toast.success('Deposit has been successfully processed', {
              closeButton: false,
            });
            setButtonDisabled(false);
            getAllWithdraws();
          }
        } else {
          setSubmitBtn('Approving...')
          if (
            !sendTokenVal
            // BigNumber.from(sendTokenVal).gt(BigNumber.from(tokenVals.reEth))
          ) {
            toast.error('Please enter the correct withdrawal amount', {
              closeButton: false,
            });
            setButtonDisabled(false);
            return;
          }

          const allowance = await contracts.methods.allowance(account, getWithdreawAddress(chainId || 1)).call();
          if (allowance < sendTokenVal) {
            await contracts.methods.approve(getWithdreawAddress(chainId || 1), sendTokenVal).send({ from: account })
          }

          setSubmitBtn('Sending Transaction...');

          await withdrawContract.methods.requestWithdraw(sendTokenVal).send({ from: account || '0x0' });

          setSubmitBtn('Create Withdraw Request');

          toast.success(
            `Your withdrawal request is successful and you’ve received a NFT that can be redeemed for ${formatBalance(BigNumber.from(sendTokenVal), 6)} stETH in ${getDuringText(lockDuringValue)}`,
            {
              closeButton: false,
            },
          );
          setButtonDisabled(false);
          getAllWithdraws();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Transaction failed", {
        closeButton: false,
      });
      setSubmitBtn('Try again');
    }
    setButtonDisabled(false);
    setWalletUpdate(new Date().getTime());
  };

  const Max = async () => {
    const tokenVals = await getETHStETH();
    if (selectedTab == 1)
      if (ethView) {
        setTokenVal(parseFloat(formatBalance(BigNumber.from(tokenVals.weth))));
      } else {
        setTokenVal(parseFloat(formatBalance(BigNumber.from(tokenVals.stEth))));
      }
    else {
      setTokenVal(parseFloat(formatBalance(BigNumber.from(tokenVals.reEth))));
    }
  };

  const getETHStETH = async () => {
    let reEth = await contracts.methods.balanceOf(account || '0x0').call();
    let stEth = await stETHContract.methods.balanceOf(account || '0x0').call();

    let weth = BigInt(0);
    if (stEth) stEth = BigInt(stEth);
    if (reEth) reEth = BigInt(reEth);
    if (eth) weth = BigInt(await eth.getBalance(account || '0x0'));
    return { stEth: stEth, reEth: reEth, weth: weth };
  };

  const getDuringText = (during: number) => {
    if (during > 3600 * 24) {
      return Math.floor(during / (3600 * 24)) + ' days';
    } else if (during > 3600) {
      return Math.floor(during / 3600) + ' hours';
    } else {
      return Math.floor(during / 60) + ' minutes';
    }
  }

  return (
    <Layout
      title="Restake with Supermeta"
      subtitle="Earn Staking + Restaking Rewards"
    >
      <Head>
        <title>Supermeta.fi</title>
      </Head>
      <Container size="tight">
        <Wallet update={walletUpdate} />
        <Block
          style={{
            padding: 10,
            paddingBottom: 32,
            backgroundColor: 'transparent',
            backgroundImage: 'url(/noise_1noise.webp)',
            backgroundRepeat: 'repeat',
            borderColor: '#1d1d1d',
            borderStyle: 'solid',
            borderWidth: 2,
            borderTopWidth: account ? 0 : 2,
            borderTopLeftRadius: account ? 0 : 20,
            borderTopRightRadius: account ? 0 : 20,
          }}
        >
          <InputWrapper
            style={{
              display: 'flex',
              gap: '10px',
              textAlign: 'center',
              borderBottomWidth: 2,
              borderBottomColor: 'black',
            }}
          >
            <Text
              style={{
                width: '50%',
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
                backgroundColor: selectedTab == 1 ? '#1d1d1d' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedTab(1)}
            >
              Deposit
            </Text>
            <Text
              style={{
                width: '50%',
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
                backgroundColor: selectedTab == 2 ? '#1d1d1d' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedTab(2)}
            >
              Withdraw
            </Text>
          </InputWrapper>
          <InputWrapper style={{ display: 'flex', gap: '5px' }}>
            <Box style={{ flex: 1 }}>
              <EthAmountSettingStyle
                style={{ backgroundColor: "black", zIndex: 100 }}
                type="text"
                value={tokenVal}
                onChange={updateTokenAmount}
                fullwidth
                error={tokenAmountInvaliedErrorMessage}
                min={0}
                step={0.05}
                placeholder="0"
                // eslint-disable-next-line prettier/prettier
                leftDecorator={(ethView || selectedTab === 2) ? <Eth /> : <Steth />}
                label={
                  ethView
                    ? 'ETH Amount'
                    : selectedTab === 2
                      ? 'reETH Amount'
                      : 'stETH Amount'
                }
                rightDecorator={<MaxButton onClick={Max} />}
              />
            </Box>
            {selectedTab == 1 && (
              <Box style={{ display: 'flex', gap: '10px', width: 100 }}>
                <HoverDropdown
                  items={[
                    { id: 1, name: "ETH" },
                    { id: 2, name: "stETH" }]
                  }
                  onChange={(e: any) => {
                    if (e == 2) setEthView(false);
                    else setEthView(true);
                  }} />
              </Box>
            )}
          </InputWrapper>
          <SubmitButtonWrapper fullwidth type="submit" disabled={buttonDisabled} onClick={handleSubmit}>
            {submitBtn}
          </SubmitButtonWrapper>

          <Detail
            tokenVal={tokenVal}
            selectedTab={selectedTab}
            estimateTxCost={estimateTxCost}
            lockDuring={lockDuringValue}
            exchangeRateByETH={rateByETHValue}
          />
        </Block>

        {selectedTab === 1 ? (
          <Supermeta
            apr={apr}
            chainId={chainId}
            utils={utils}
            totalSupply={totalSupply}
            holders={holders}
            usdPrice={usdPrice}
          />
        ) : (
          <Withdrawals
            chainId={chainId}
            withdrawals={withdrawals}
            claimETH={claimETH}
            redeemButton={redeemButton}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Home;

const Detail = (props: any) => {
  const { tokenVal, selectedTab, estimateTxCost, lockDuring, exchangeRateByETH } = props;
  const redeemableDate: number =
    new Date().valueOf() + (lockDuring ? lockDuring : 0) * 1000;

  return (
    <DetailComponentStyle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Text size="sm">You will receive</Text>
        <Text size="sm">
          {(selectedTab === 1 ? tokenVal : 1) + ' ' + (selectedTab === 1 ? 'smETH' : 'smNFT')}
        </Text>
      </div>
      {selectedTab === 1 && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text size="sm">Exchange rate</Text>
            <Text size="sm">
              {selectedTab === 1 ? '1 ETH = 1 smETH' : '1 smETH = 1 ETH'}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text size="sm">Max transaction cost</Text>
            <TxPriceComponent gasLimit={estimateTxCost} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {/* <Text size="sm">Staking fees</Text>
            <Text size="sm">10%</Text> */}
          </div>
        </>
      )}
      {selectedTab === 2 && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text size="sm">Redeemable on</Text>
            <Text size="sm">
              {getDate(redeemableDate)}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text size="sm">Redeemable amount</Text>
            <Text size="sm">{(exchangeRateByETH * tokenVal) / 10 ** 18 + ' stETH'}</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text size="sm">Min transaction cost</Text>
            <TxPriceComponent gasLimit={estimateTxCost} />
          </div>
        </>
      )}
    </DetailComponentStyle>
  );
};

const Supermeta = (props: any) => {
  const { apr, chainId, utils, totalSupply, holders, usdPrice } = props;

  return (
    <>
      <SupermetaHeaderStyle
      // style={{
      //   display: 'flex',
      //   justifyContent: 'space-between',
      //   padding: 20,
      //   alignItems: 'center',
      // }}
      >
        {/* style={{ fontWeight: 'bold', fontSize: 20 }} */}
        <Text>
          Supermeta statistics
        </Text>
        <a
          target="_blank"
          href={`${scanUrls[chainId * 1 || 1]}/token/${getSMETHAddress(chainId || 1)}`}
          rel="noreferrer"
        >
          View on Etherscan
        </a>
      </SupermetaHeaderStyle>
      <SupermetaComponentStyle style={{ background: 'url(/noise_1noise.webp)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text size="sm">Annual percentage rate</Text>
          <Text size="sm">{apr.toFixed(1)}%</Text>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text size="sm">Total staked with Supermeta</Text>
          <Text size="sm">
            {parseFloat(
              utils.fromWei(totalSupply.data?.toString() || '0x0', 'ether'),
            ).toFixed(4)}{' '}
            ETH
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text size="sm">Stakers</Text>
          <Text size="sm">{holders}</Text>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text size="sm">smETH Market Cap</Text>
          <Text size="sm">
            $
            {(
              parseFloat(
                utils.fromWei(totalSupply.data?.toString() || '0x0', 'ether'),
              ) * usdPrice
            ).toFixed(2)}
          </Text>
        </div>
      </SupermetaComponentStyle>
    </>
  );
};

const Withdrawals = (props: any) => {
  const { withdrawals, claimETH, redeemButton, chainId } = props;
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <a
          target="_blank"
          href={`${scanUrls[chainId * 1 || 1]}/token/${getWithdreawAddress(chainId || 1)}`}
          rel="noreferrer"
        ><Text style={{ fontWeight: 'bold', fontSize: 20 }}>Withdrawals</Text></a>
      </div>
      <Block style={{ background: 'url(/noise_1noise.webp)', borderColor: "rgb(29, 29, 29)", borderStyle: "solid", borderWidth: "0px 2px 2px" }}>
        <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ width: '100%', borderBottom: 'solid 1px #474747' }}>
              <th>NFT ID</th>
              <th>Amount</th>
              <th>Redeemable On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals?.map((value: any, index: number) => (
              <tr key={index} style={{ height: "50px", borderBottom: 'solid 1px #474747' }}>
                <td>
                  <a
                    target="_blank"
                    href={`${scanUrls[chainId * 1 || 1]}/nft/${getWithdreawAddress(chainId || 1)}/${value.id}`}
                    rel="noreferrer"
                  >{value.id}
                  </a>
                </td>
                <td>{value.ETHAmount / (10 ** 18)} ETH </td>
                <td>{getDate(value.claimBlockId * 1000)}</td>
                <td>
                  {
                    value.claimed ?
                      (<DisabledButtonWrapper type="button" size="xxs" disabled={true}>
                        Claimed
                      </DisabledButtonWrapper>) :
                      ((new Date().getTime() / 1000) > parseInt(value.claimBlockId) ?
                        (<SubmitButtonWrapper type="button" size="xxs" style={{ fontSize: "12px", padding: "7px" }} disabled={value.id === redeemButton} onClick={() => claimETH(value.id, false)}>
                          {(value.id === redeemButton) ? "Processing" : "Redeem"}
                        </SubmitButtonWrapper>) : (<DisabledButtonWrapper type="button" size="xxs" disabled={true}>
                          Not Ready
                        </DisabledButtonWrapper>))
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block >
    </>
  );
};
