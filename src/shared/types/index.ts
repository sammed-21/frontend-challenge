import type { Address } from "viem";
import type { TurbineTokenClass } from "@shared/services/turbine/types"

export type Token = {
        address: Address;
        symbol: string;
        decimals: number;
        class: TurbineTokenClass;
        
}