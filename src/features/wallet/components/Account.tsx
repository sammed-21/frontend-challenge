import { Button, HStack, Text } from '@chakra-ui/react'
import { useAccount, useDisconnect } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const shortened = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  return (
    <HStack spacing={3}>
      <Text
        fontSize="13px"
        color="text.secondary"
        fontFamily="mono"
        fontWeight={500}
        bg="surface.input"
        px={3}
        py="6px"
        borderRadius="corner.sm"
        border="1px solid"
        borderColor="surface.border"
      >
        {shortened}
      </Text>
      <Button
        size="sm"
        h="32px"
        px={3}
        borderRadius="corner.sm"
        bg="surface.input"
        color="brand.folly"
        fontWeight={500}
        fontSize="13px"
        border="1px solid"
        borderColor="transparent"
        _hover={{
          bg: 'rgba(255, 51, 102, 0.10)',
          borderColor: 'rgba(255, 51, 102, 0.20)',
        }}
        transition="all 0.2s"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </HStack>
  )
}
