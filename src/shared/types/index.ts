import type { Address } from 'viem'

import type { TurbineTokenClass } from '@shared/services/turbine/types'

export type Token = {
  address: Address
  class: TurbineTokenClass
  decimals: number
  icon?: string
  symbol: string
}
