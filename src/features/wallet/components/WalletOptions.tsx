import * as React from 'react'

import { Button, Text, VStack } from '@chakra-ui/react'
import { useConnect } from 'wagmi'
import type { Connector } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <VStack spacing={2}>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </VStack>
  )
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button
      isDisabled={!ready}
      onClick={onClick}
      h="36px"
      px={4}
      borderRadius="corner.sm"
      bg="surface.input"
      border="1px solid"
      borderColor="surface.border"
      color="text.primary"
      fontWeight={500}
      fontSize="13px"
      _hover={{
        bg: 'surface.inputHover',
        borderColor: 'surface.borderHover',
      }}
      _disabled={{
        opacity: 0.4,
        cursor: 'not-allowed',
      }}
      transition="all 0.15s ease-out"
    >
      {connector.name}
    </Button>
  )
}
