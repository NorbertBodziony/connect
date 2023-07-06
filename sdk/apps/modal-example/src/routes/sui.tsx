import { createSignal, onMount, Show } from 'solid-js'
import { Title } from 'solid-start'
import { NCSuiSelector } from '@nightlylabs/wallet-selector-sui'
import { StandardWalletAdapter } from '@mysten/wallet-adapter-wallet-standard'
import { TransactionBlock } from '@mysten/sui.js'
import toast from 'solid-toast'

let selector: NCSuiSelector

export default function Sui() {
  const [adapter, setAdapter] = createSignal<StandardWalletAdapter>()
  onMount(async () => {
    if (selector) {
      return
    }
    selector = await NCSuiSelector.build({
      appMetadata: {
        name: 'NCTestSui',
        description: 'Nightly Connect Test',
        icon: 'https://docs.nightly.app/img/logo.png',
        additionalInfo: 'Courtesy of Nightly Connect team'
      },
      url: 'https://nc2.nightly.app'
    },
    document.getElementById('modalAnchor') ?? undefined
    )
    selector.onConnected = (newAdapter) => {
      setAdapter(newAdapter)
    }
  })
  return (
    <main>
      <Title>Sui Example</Title>
      <div id="modalAnchor" />
      <Show
        when={!!adapter()}
        fallback={
          <button
            onClick={() => {
              selector.openModal()
            }}>
            Connect
          </button>
        }>
        <h1>
          Current address (first one of all in your app): {adapter()?.wallet.accounts[0].address}
        </h1>
        <button
          onClick={async () => {
            try {
              const transactionBlock = new TransactionBlock()
              const coin = transactionBlock.splitCoins(transactionBlock.gas, [
                transactionBlock.pure(50000000)
              ])
              transactionBlock.transferObjects(
                [coin],
                transactionBlock.pure(
                  '0x5635a39dfd0b9e2302453695497b1979fa1af481a0fbfed9d0dd5a99accb2fc0'
                )
              )
              await adapter()!.signAndExecuteTransactionBlock({
                transactionBlock,
                chain: 'sui:testnet',
                account: adapter()!.wallet.accounts[0]
              })

              toast.success('Transaction was signed and sent!')
            } catch (e) {
              toast.error("Error: couldn't sign and send transaction!")
              console.log(e)
            }
          }}>
          Send 0.05 SUI
        </button>
        <button
          onClick={async () => {
            try {
              await adapter()!.signMessage!({
                message: new TextEncoder().encode('I love Nightly'),
                account: adapter()!.wallet.accounts[0]
              })

              toast.success('Message was signed!')
            } catch (e) {
              toast.error("Error: couldn't sign message!")
              console.log(e)
            }
          }}>
          Sign message
        </button>
        <button
          onClick={() => {
            adapter()?.disconnect()
            setAdapter(undefined)
          }}>
          Disconnect
        </button>
      </Show>
    </main>
  )
}