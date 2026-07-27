import { Box, Text } from '@chakra-ui/react'
import { type SpreadCurve, spreads } from 'turbine-sdk'

export function useSpreadCurve(): SpreadCurve {
  return spreads.constant(50)
}

export function SpreadSelector() {
  return (
    <Box py={2}>
      <Text fontSize="12px" color="text.secondary" fontWeight={500}>
        Spread strategy
      </Text>
      <Text fontSize="13px" color="text.disabled">
        Default (constant 50 bps)
      </Text>
    </Box>
  )
}
