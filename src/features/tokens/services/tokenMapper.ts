import type { Token } from '@shared/types';
import type { TurbineToken } from '@shared/services/turbine/types'
import { TOKEN_ICONS } from '@shared/assets/tokens';


export function mapToken (supportedTokens: TurbineToken[]): Token[] {

    const tokens: Token[] = supportedTokens.map((token) => ({
        address: token.address,
        class: token.class,
        decimals: token.decimals,
        icon: TOKEN_ICONS[token.address.toLowerCase()],
        symbol: token.symbol
    }))
    return tokens
}