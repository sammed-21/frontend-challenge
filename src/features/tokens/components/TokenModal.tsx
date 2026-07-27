import { useEffect, useState } from 'react'

import {
  Avatar,
  Box,
  Flex,
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
  const { tokens } = useTokens()
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<Token[]>([])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(tokens)
    } else {
      const query = search.toLowerCase()
      setFiltered(
        tokens.filter(
          (token) =>
            token.symbol.toLowerCase().includes(query) ||
            token.address.toLowerCase().includes(query),
        ),
      )
    }
  }, [search, tokens])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
      <ModalContent
        bg="surface.card"
        border="1px solid"
        borderColor="surface.border"
        borderRadius="corner.lg"
        boxShadow="0px 4px 72px 0px rgba(0, 0, 0, 0.50)"
      >
        <ModalHeader
          fontSize="16px"
          fontWeight={500}
          color="text.primary"
          pb={3}
        >
          Select token
        </ModalHeader>
        <ModalCloseButton color="text.secondary" />
        <ModalBody pb={4} px={4}>
          <Input
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb={4}
            bg="surface.input"
            border="1px solid"
            borderColor="transparent"
            borderRadius="corner.sm"
            fontSize="14px"
            color="text.primary"
            _placeholder={{ color: 'text.disabled' }}
            _focus={{
              borderColor: 'surface.borderHover',
              boxShadow: 'none',
            }}
            _hover={{ borderColor: 'surface.borderHover' }}
          />
          <VStack
            spacing={0}
            align="stretch"
            maxH="400px"
            overflowY="auto"
            mx={-2}
            sx={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { bg: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                bg: 'surface.border',
                borderRadius: 'corner.full',
              },
            }}
          >
            {filtered.map((token) => (
              <HStack
                key={token.address}
                px={3}
                py="10px"
                borderRadius="corner.sm"
                cursor="pointer"
                transition="background 0.15s"
                _hover={{ bg: 'surface.input' }}
                onClick={() => {
                  onSelect(token)
                  onClose()
                  setSearch('')
                }}
                spacing={3}
              >
                {token.icon ? (
                  <Avatar
                    size="sm"
                    src={token.icon}
                    name={token.symbol}
                    bg="surface.input"
                  />
                ) : (
                  <Avatar size="sm" name={token.symbol} bg="surface.input" />
                )}
                <Box>
                  <Text fontWeight={600} fontSize="14px" color="text.primary">
                    {token.symbol}
                  </Text>
                  <Text fontSize="12px" color="text.secondary">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </Text>
                </Box>
              </HStack>
            ))}
            {filtered.length === 0 && (
              <Flex
                justify="center"
                align="center"
                py={8}
                color="text.secondary"
                fontSize="14px"
              >
                No tokens found
              </Flex>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
