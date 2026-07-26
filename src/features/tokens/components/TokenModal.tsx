import { useTurbineConfig } from '@shared/hooks/useTurbineConfig'
import { Box, Spinner } from '@chakra-ui/react'

export function TokenModal() {
  const { turbineConfig, isLoading, error } = useTurbineConfig()
  const tokens = turbineConfig?.tokens
  return (
    <>
      {isLoading === false && turbineConfig!.tokens !== undefined ? (
        <Box>
          {tokens!.map((token) => (
            <Box key={token.address}>{token.symbol}</Box>
          ))}
        </Box>
      ) : error ? (
        <p>Error loading tokens</p>
      ) : (
        <Spinner></Spinner>
      )}
    </>
  )
}

export default TokenModal
