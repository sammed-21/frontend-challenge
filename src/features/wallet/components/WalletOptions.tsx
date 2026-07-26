import { Button, Stack } from "@chakra-ui/react";
import { useConnect } from "wagmi";
import type { Connector } from "wagmi";
import * as React from 'react'

  export function WalletOptions() {
    const { connectors, connect } = useConnect();

    return (
      <Stack direction="row">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </Stack>
    );
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
        ; (async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <Button disabled={!ready} onClick={onClick} variant='outline' colorScheme='blue'>
            {connector.name}
        </Button>
    )
}