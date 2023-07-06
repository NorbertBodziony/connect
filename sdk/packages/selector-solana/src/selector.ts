import { AppSolana, SOLANA_NETWORK } from '@nightlylabs/nightly-connect-solana'
import { StandardWalletAdapter } from '@solana/wallet-standard'
import { NightlyConnectSolanaWallet } from './wallet'
import { PublicKey } from '@solana/web3.js'
import {
  AppInitData,
  MetadataWallet,
  NCBaseSelector,
  NETWORK,
  clearSessionIdForNetwork
} from '@nightlylabs/wallet-selector-base'
import { solanaWalletsFilter } from './detection'
import { WalletAdapterCompatibleStandardWallet } from '@solana/wallet-adapter-base'

export class NCSolanaSelector extends NCBaseSelector<StandardWalletAdapter> {
  private _app: AppSolana

  constructor(
    appInitData: AppInitData,
    app: AppSolana,
    metadataWallets: MetadataWallet[],
    anchorRef?: HTMLElement
  ) {
    super(
      appInitData,
      metadataWallets,
      (wallet) =>
        new StandardWalletAdapter({
          wallet: wallet as WalletAdapterCompatibleStandardWallet
        }),
      solanaWalletsFilter,
      {
        network: NETWORK.SOLANA,
        name: 'Solana',
        icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
      },
      app.sessionId,
      (walletName, url) => {
        this._app.connectDeeplink({
          walletName,
          url
        })
      },
      anchorRef
    )
    this._app = app
    this.setApp(app)
  }

  private setApp = (app: AppSolana) => {
    this._app = app
    this._sessionId = app.sessionId
    this._app.on('userConnected', (e) => {
      const adapter = new StandardWalletAdapter({
        wallet: new NightlyConnectSolanaWallet(app, new PublicKey(e.publicKeys[0]), async () => {
          clearSessionIdForNetwork(SOLANA_NETWORK)
          const app = await AppSolana.build(this._appInitData)
          this.setApp(app)
        })
      })
      adapter.connect().then(() => {
        this.onConnected?.(adapter)
        this.closeModal()
      })
    })
  }

  public static build = async (appInitData: AppInitData, anchorRef?: HTMLElement) => {
    const [app, metadataWallets] = await Promise.all([
      AppSolana.build(appInitData),
      AppSolana.getWalletsMetadata('https://nc2.nightly.app/get_wallets_metadata')
        .then((list) =>
          list.map((wallet) => ({
            name: wallet.name,
            icon: wallet.image.default,
            deeplink: wallet.mobile,
            link: wallet.homepage
          }))
        )
        .catch(() => [] as MetadataWallet[])
    ])
    const selector = new NCSolanaSelector(appInitData, app, metadataWallets, anchorRef)

    return selector
  }
}