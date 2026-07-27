import { useState } from 'react'

import {
  Avatar,
  Box,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

import type { Token } from '@shared/types'

import { useTokens } from '../providers/TokenProvider'

interface TokenModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (token: Token) => void
}

export function TokenModal({ isOpen, onClose, onSelect }: TokenModalProps) {
  const tokens = useTokens()
  const [search, setSearch] = useState('')

  const filtered = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg="gray.800" borderColor="gray.700">
        <ModalHeader>Select Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Input
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb={4}
            bg="gray.900"
            border="none"
          />
          <VStack spacing={1} align="stretch" maxH="400px" overflowY="auto">
            {filtered.map((token) => (
              <HStack
                key={token.address}
                px={3}
                py={2}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'gray.700' }}
                onClick={() => {
                  onSelect(token)
                  onClose()
                  setSearch('')
                }}
              >
                {token.icon ? (
                  <Avatar size="sm" src={token.icon} name={token.symbol} />
                ) : (
                  <Avatar size="sm" name={token.symbol} bg="gray.600" />
                )}
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    {token.symbol}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </Text>
                </Box>
              </HStack>
            ))}
            {filtered.length === 0 && (
              <Text color="gray.500" textAlign="center" py={4}>
                No tokens found
              </Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
