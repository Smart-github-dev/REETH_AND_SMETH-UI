import { FC } from 'react';
import Link from 'next/link';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
  HeaderManusStyle,
} from './headerStyles';
import HeaderWallet from './headerWallet';
import logo from '../../public/supermeta-logo.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: FC = () => {
  const router = useRouter();
  return (
    <HeaderStyle size="full" forwardedAs="header">
      <HeaderLogoStyle>
        <Link href="/">
          <Image src={logo} width={154} height={55} alt='Supermeta' />
          {/* <img src={logo} style={{ width: 154, height: 55 }} alt="Supermeta" /> */}
        </Link>
      </HeaderLogoStyle>
      <HeaderManusStyle>
        <Link
          className={router.asPath === '/deposit' ? 'active' : ''}
          href="/deposit"
        >
          <span>Deposit</span>
        </Link>
        <Link
          className={router.asPath === '/redeem' ? 'active' : ''}
          href="/redeem"
        >
          <span>Redeem</span>
        </Link>
        <Link
          className={router.asPath === '/rewards' ? 'active' : ''}
          href="/rewards"
        >
          <span>Rewards</span>
        </Link>
      </HeaderManusStyle>
      <HeaderActionsStyle>
        <HeaderWallet />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};

export default Header;
