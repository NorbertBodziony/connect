import { Wallet, getWallets } from '@wallet-standard/core'

export interface IWalletListItem {
  name: string
  icon: string
  recent?: boolean
  detected?: boolean
}

export const suiWalletsFilter = (wallet: Wallet) => 'sui:signTransactionBlock' in wallet.features

export const solanaWalletsFilter = (wallet: Wallet) => 'solana:signTransaction' in wallet.features

export const getWalletsList = (
  presetList: Omit<IWalletListItem, 'recent' | 'detected'>[],
  walletsFilterCb: (wallet: Wallet) => boolean,
  recentWalletName?: string
) => {
  const { get } = getWallets()
  const windowWallets = get()

  const walletsData: Record<string, IWalletListItem> = {}

  presetList.forEach((wallet) => {
    walletsData[wallet.name] = wallet
  })

  windowWallets.filter(walletsFilterCb).forEach((wallet) => {
    walletsData[wallet.name] = {
      ...(walletsData?.[wallet.name] ?? wallet),
      detected: true,
      recent: recentWalletName === wallet.name
    }
  })

  return Object.values(walletsData)
}

export const getSolanaWalletsList = (
  presetList: Omit<IWalletListItem, 'recent' | 'detected'>[],
  recentWalletName?: string
) => getWalletsList(presetList, solanaWalletsFilter, recentWalletName)

export const getSuiWalletsList = (
    presetList: Omit<IWalletListItem, 'recent' | 'detected'>[],
    recentWalletName?: string
  ) => getWalletsList(presetList, suiWalletsFilter, recentWalletName)
