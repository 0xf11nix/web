import { AssetId } from '@shapeshiftoss/caip'
import { Trade, TradeQuote } from '@shapeshiftoss/swapper'
import { Asset, chainAdapters, ChainTypes } from '@shapeshiftoss/types'

export enum TradeAmountInputField {
  BUY = 'BUY',
  SELL = 'SELL',
  FIAT = 'FIAT',
}

export type TradeAsset = {
  asset: Asset
  amount?: string
}

export type TradeProps = {
  defaultBuyAssetId: AssetId
}

export type BuildQuoteTxOutput = {
  success: boolean
  statusReason: string
}

export type TradeState<C extends ChainTypes> = {
  sellAsset: TradeAsset
  buyAsset: TradeAsset
  fiatSellAmount: string
  sellAssetFiatRate: string
  fees?: chainAdapters.QuoteFeeData<C>
  action?: TradeAmountInputField
  quote: TradeQuote<C>
  trade: Trade<C>
}

export enum TradeRoutePaths {
  Input = '/trade/input',
  Confirm = '/trade/confirm',
  Approval = '/trade/approval',
  SellSelect = '/trade/select/sell',
  BuySelect = '/trade/select/buy',
}
