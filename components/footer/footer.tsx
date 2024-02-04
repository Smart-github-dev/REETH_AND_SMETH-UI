import { FC } from 'react';
import { Link } from '@lidofinance/lido-ui';
import {
  FooterStyle,
  FooterDividerStyle,
  FooterLogoStyle,
  FooterGroupStyle,
  FooterTitleStyle,
  FooterItemStyle,
} from './footerStyles';
import logo from '../../public/supermeta-logo.svg';
import Image from 'next/image';

const Footer: FC = () => (
  <FooterStyle size="full" forwardedAs="footer">
    <FooterDividerStyle />

    <FooterLogoStyle>
      <Image src={logo} width={154} height={35} alt='Supermeta' />
      {/* <img src={logo} style={{ width: 154, height: 35, visibility: "visible" }} alt="Supermeta" /> */}
    </FooterLogoStyle>

    <FooterGroupStyle>
      <FooterTitleStyle>Resources</FooterTitleStyle>
      <FooterItemStyle>
        <Link href="https://supermeta.fi">Home</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://docs.supermeta.fi">
          Docs
        </Link>
      </FooterItemStyle>
      {/* <FooterItemStyle>
        <Link href="https://lido.fi/terms-of-use">Terms of Use</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://lido.fi/privacy-notice">Privacy Notice</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://lido.fi/faq">FAQ</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://lido.fi/static/LIDO_press_kit.zip">Press Kit</Link>
      </FooterItemStyle> */}
    </FooterGroupStyle>

    <FooterGroupStyle>
      <FooterTitleStyle>Community</FooterTitleStyle>
      <FooterItemStyle>
        <Link href="https://twitter.com/supermetafi">Twitter</Link>
      </FooterItemStyle>
      <FooterItemStyle>
        <Link href="https://t.me/supermetafi">Telegram</Link>
      </FooterItemStyle>
      {/* <FooterItemStyle>
        <Link href="https://discord.gg/vgdPfhZ">Discord</Link>
      </FooterItemStyle> */}
      <FooterItemStyle>
        <Link href="https://github.com/supermetafi">GitHub</Link>
      </FooterItemStyle>
      {/* <FooterItemStyle>
        <Link href="https://www.reddit.com/r/LidoFinance/">Reddit</Link>
      </FooterItemStyle> */}
      {/* <FooterItemStyle>
        <Link href="https://blog.lido.fi/">Medium</Link>
      </FooterItemStyle> */}
    </FooterGroupStyle>

    <FooterGroupStyle>
      <FooterTitleStyle>Contact</FooterTitleStyle>
      <FooterItemStyle>
        <Link href="mailto:shenoy@supermeta.fi">shenoy@supermeta.fi</Link>
      </FooterItemStyle>
      {/* <FooterItemStyle>
        <Link href="http://help.lido.fi/">Help Center</Link>
      </FooterItemStyle> */}
    </FooterGroupStyle>
  </FooterStyle>
);

export default Footer;
