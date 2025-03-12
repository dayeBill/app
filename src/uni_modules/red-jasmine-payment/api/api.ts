import type { Payer, PaymentEnvironment } from '@/uni_modules/red-jasmine-payment/utils/payment'
import { unInstance } from '@/service'

export interface TradeRequest extends PaymentEnvironment {
  /**
   * 商户应用
   */
  merchant_app_id: string
  trade_no: string
  /**
   * 支付者
   */
  payer?: Payer
}

export interface PayerRequest extends PaymentEnvironment {
  /**
   * 商户应用
   */
  merchant_app_id: string

  /**
   * 渠道应用ID
   */
  channel_app_id?: string

  code?: string
}

export function payerInfo(data: PayerRequest) {
  return unInstance.post(`/api/payment/payer/payer/info`, data)
}

export function ready(data: TradeRequest) {
  return unInstance.post(`/api/payment/payer/trades/ready`, data)
}

export function paying(data: TradeRequest) {
  return unInstance.post(`/api/payment/payer/trades/paying`, data)
}
