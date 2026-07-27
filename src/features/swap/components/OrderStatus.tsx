import { Box, Text } from '@chakra-ui/react'

export function OrderStatus() {
  return (
    <Box py={4} textAlign="center">
      <Text fontSize="13px" color="text.disabled">
        No recent orders
      </Text>
    </Box>
  )
}
