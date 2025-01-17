import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { NightlyMainPage } from './nightly-main-page'
import './nightly-main-page'
import Phantom from '../../static/svg/PhantomIcon.svg'
import MetaMask from '../../static/svg/MetaMaskIcon.svg'
import Coinbase from '../../static/svg/CoinbaseIcon.svg'
import Glow from '../../static/svg/GlowIcon.svg'
import ZenGO from '../../static/svg/ZenGOIcon.svg'
import Trust from '../../static/svg/TrustIcon.svg'
import Binance from '../../static/svg/BinanceIcon.svg'
import Sollet from '../../static/svg/SolletIcon.svg'
import NightlyIcon from '../../static/svg/NightlyIcon.svg'
import ChainIcon from '../../static/svg/ChainIcon.svg'
import { WalletSelectorItem } from '../../utils/types'

const meta = {
  title: 'nightly-main-page',
  parameters: {
    layout: 'centered'
  },

  render: (args) => {
    if (args.open) {
      return html`
        <nightly-main-page
          .onClose=${args.onClose}
          .selectorItems=${args.selectorItems}
          .onWalletClick=${args.onWalletClick}
          .chainIcon=${args.chainIcon}
          .chainName=${args.chainName}
          .sessionId=${args.sessionId}
          ?connecting=${args.connecting}
          .relay=${args.relay}
        ></nightly-main-page>
      `
    } else {
      return html``
    }
  }
} satisfies Meta<NightlyMainPage & { open: boolean }>

export default meta

interface NightlyModalArgs {
  onClose: () => void
  selectorItems: WalletSelectorItem[]
  onWalletClick: (name: string) => void
  chainIcon: string
  chainName: string
  sessionId: string
  connecting: boolean
  relay: string
}
type Story = StoryObj<NightlyModalArgs & { open: boolean }>

export const Default: Story = {
  name: 'Default',
  args: {
    open: true,
    onClose: () => console.log('close'),
    selectorItems: [
      { name: 'Phantom', icon: Phantom, recent: true, link: `https://www.binance.com/en` },
      {
        name: 'Nightly Wallet',
        icon: NightlyIcon,
        link: `https://www.binance.com/en`
      },
      { name: 'MetaMask', icon: MetaMask, link: `https://www.binance.com/en` },
      { name: 'Glow', icon: Glow, link: `https://www.binance.com/en` },
      { name: 'ZenGO', icon: ZenGO, detected: true, link: `https://www.binance.com/en` },
      { name: 'Trust', icon: Trust, link: `https://www.binance.com/en` },
      { name: 'Binance', icon: Binance, link: `https://www.binance.com/en` },
      { name: 'Sollet', icon: Sollet, link: `https://www.binance.com/en` },
      { name: 'Phantom2', icon: Phantom, link: `https://www.binance.com/en` },
      { name: 'MetaMask2', icon: MetaMask, link: `https://www.binance.com/en` },
      { name: 'Coinbase', icon: Coinbase, link: `https://www.binance.com/en` },
      { name: 'ZenGO2', icon: ZenGO, link: `https://www.binance.com/en` },
      { name: 'Trust2', icon: Trust, detected: true, link: `https://www.binance.com/en` },
      { name: 'Binance2', icon: Binance, link: `https://www.binance.com/en` },
      { name: 'Phantom3', icon: Phantom, link: `https://www.binance.com/en` },
      {
        name: 'Nightly Wallet2',
        icon: NightlyIcon,
        link: `https://www.binance.com/en`
      },
      { name: 'MetaMask2', icon: MetaMask, link: `https://www.binance.com/en` },
      { name: 'Glow2', icon: Glow, link: `https://www.binance.com/en` },
      { name: 'ZenGO3', icon: ZenGO, detected: true, link: `https://www.binance.com/en` },
      { name: 'Trust3', icon: Trust, link: `https://www.binance.com/en` },
      { name: 'Binance3', icon: Binance, link: `https://www.binance.com/en` },
      { name: 'Sollet2', icon: Sollet, link: `https://www.binance.com/en` },
      { name: 'Phantom4', icon: Phantom, link: `https://www.binance.com/en` },
      { name: 'MetaMask3', icon: MetaMask, link: `https://www.binance.com/en` },
      { name: 'Coinbase2', icon: Coinbase, link: `https://www.binance.com/en` },
      { name: 'ZenGO4', icon: ZenGO, link: `https://www.binance.com/en` },
      { name: 'Trust4', icon: Trust, detected: true, link: `https://www.binance.com/en` },
      { name: 'Binance4', icon: Binance, link: `https://www.binance.com/en` }
    ],
    onWalletClick: (name: string) => {
      console.log('Item clicked:', name)
    },
    chainIcon: ChainIcon,
    chainName: 'Solana',
    sessionId:
      'fsdhfdzfsdhgfzghggdfhbgchgbdfnvfbxhncvfjhzxdhgbhghfgfvzhfgjhgszdhgzxdfhgfzxdjfuhdfhgd',
    connecting: true,
    relay: 'https://nc2.nightly.app'
  }
}
