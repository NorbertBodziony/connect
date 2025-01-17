import { Title, A } from 'solid-start'

export default function Home() {
  return (
    <main>
      <Title>Nightly Connect Examples</Title>

      <A href="/solana">
        <button>Solana</button>
      </A>
      <A href="/solanaLazy">
        <button>Solana - lazy adapter build</button>
      </A>
      <A href="/solanaInitOnConnect">
        <button>Solana - init app on connect</button>
      </A>
      <A href="/sui">
        <button>Sui</button>
      </A>
      <A href="/aleph">
        <button>Aleph</button>
      </A>
    </main>
  )
}
