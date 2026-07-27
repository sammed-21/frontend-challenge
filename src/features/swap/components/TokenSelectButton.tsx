import { Avatar, Button, HStack, Text } from '@chakra-ui/react'

import type { Token } from '@shared/types'

interface TokenSelectButtonProps {
  token: Token | null
  onClick: () => void
  label: string
}

export function TokenSelectButton({
  token,
  onClick,
  label,
}: TokenSelectButtonProps) {
  if (!token) {
    return (
      <Button
        onClick={onClick}
        h="40px"
        px={4}
        borderRadius="corner.full"
        bg="brand.aquamarine"
        color="brand.carbon"
        fontWeight={600}
        fontSize="14px"
        _hover={{ bg: 'rgba(0, 255, 187, 0.85)' }}
        _active={{ bg: 'rgba(0, 255, 187, 0.70)' }}
        transition="all 0.2s ease-out"
        flexShrink={0}
      >
        {label}
      </Button>
    )
  }

  return (
    <Button
      onClick={onClick}
      h="40px"
      px={3}
      borderRadius="corner.full"
      bg="surface.inputHover"
      _hover={{ bg: 'surface.borderHover' }}
      transition="all 0.15s ease-out"
      flexShrink={0}
    >
      <HStack spacing={2}>
        {token.icon ? (
          <Avatar size="xs" src={token.icon} name={token.symbol} />
        ) : (
          <Avatar size="xs" name={token.symbol} bg="surface.border" />
        )}
        <Text fontWeight={600} fontSize="14px" color="text.primary">
          {token.symbol}
        </Text>
        <Text fontSize="xs" color="text.secondary">
          ▾
        </Text>
      </HStack>
    </Button>
  )
}
