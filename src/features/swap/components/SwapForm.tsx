import { useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import type { Token } from '@shared/types'

import { TokenModal } from '@features/tokens/components/TokenModal'

import { useQuote } from '../hooks/useQuote'
import { isValidAmount } from '../utils/amount'
import { AmountInput } from './AmountInput'
import { SpreadSelector } from './SpreadSelector'
import { TokenSelectButton } from './TokenSelectButton'

type ModalTarget = 'sell' | 'buy' | null

export function SwapForm() {
  const { isConnected } = useAccount()

  const [sellToken, setSellToken] = useState<Token | null>(null)
  const [buyToken, setBuyToken] = useState<Token | null>(null)
  const [sellAmount, setSellAmount] = useState('')
  const [modalTarget, setModalTarget] = useState<ModalTarget>(null)

  const { quote, isLoading: quoteLoading } = useQuote(
    sellToken?.address,
    buyToken?.address,
    sellAmount,
  )
  const buyAmount = quote ? quote.estimatedOutput : ''

  function handleTokenSelect(token: Token) {
    if (modalTarget === 'sell') {
      if (token.address === buyToken?.address) {
        setBuyToken(sellToken)
      }
      setSellToken(token)
    } else if (modalTarget === 'buy') {
      if (token.address === sellToken?.address) {
        setSellToken(buyToken)
      }
      setBuyToken(token)
    }
  }

  function handleSwapTokens() {
    const temp = sellToken
    setSellToken(buyToken)
    setBuyToken(temp)
    setSellAmount('')
  }

  function handleSubmit() {
    console.log('Submit order:', {
      sellToken: sellToken?.address,
      buyToken: buyToken?.address,
      sellAmount,
    })
  }

  function getButtonText() {
    if (!isConnected) return 'Connect Wallet'
    if (!sellToken || !buyToken) return 'Select Tokens'
    if (!sellAmount) return 'Enter Amount'
    return 'Swap'
  }

  const isSubmitDisabled =
    !isConnected ||
    !sellToken ||
    !buyToken ||
    !sellAmount ||
    !isValidAmount(sellAmount)

  return (
    <Box
      w="full"
      maxW="520px"
      bg="surface.card"
      borderRadius="corner.lg"
      border="1px solid"
      borderColor="surface.border"
      p={5}
      boxShadow="card"
    >
      <VStack spacing={3} align="stretch">
        <Heading size="sm" fontWeight={500} color="text.secondary" mb={1}>
          Swap
        </Heading>

        {/* Sell */}
        <Box
          bg="surface.input"
          borderRadius="corner.base"
          p={4}
          border="1px solid"
          borderColor="transparent"
          transition="border-color 0.2s"
          _hover={{ borderColor: 'surface.borderHover' }}
        >
          <Flex justify="space-between" align="center">
            <AmountInput
              value={sellAmount}
              onChange={setSellAmount}
              label="You pay"
            />
            <TokenSelectButton
              token={sellToken}
              onClick={() => setModalTarget('sell')}
              label="Select token"
            />
          </Flex>
        </Box>

        {/* Swap direction */}
        <Center my={-1} position="relative" zIndex={1}>
          <Box
            as="button"
            onClick={handleSwapTokens}
            w="36px"
            h="36px"
            borderRadius="corner.sm"
            bg="surface.input"
            border="1px solid"
            borderColor="surface.border"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              bg: 'surface.inputHover',
              borderColor: 'surface.borderHover',
              transform: 'rotate(180deg)',
            }}
          >
            <Text fontSize="md" color="text.secondary">
              ↓
            </Text>
          </Box>
        </Center>

        {/* Buy */}
        <Box
          bg="surface.input"
          borderRadius="corner.base"
          p={4}
          border="1px solid"
          borderColor="transparent"
          transition="border-color 0.2s"
          _hover={{ borderColor: 'surface.borderHover' }}
        >
          <Flex justify="space-between" align="center">
            <AmountInput
              value={quoteLoading ? '...' : buyAmount}
              onChange={() => {}}
              label="You receive"
              readOnly
            />
            <TokenSelectButton
              token={buyToken}
              onClick={() => setModalTarget('buy')}
              label="Select token"
            />
          </Flex>
        </Box>

        <SpreadSelector />

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          isDisabled={isSubmitDisabled}
          h="56px"
          w="full"
          borderRadius="corner.base"
          fontWeight={500}
          fontSize="16px"
          bg={isSubmitDisabled ? 'surface.input' : 'brand.aquamarine'}
          color={isSubmitDisabled ? 'text.disabled' : 'brand.carbon'}
          _hover={isSubmitDisabled ? {} : { bg: 'rgba(0, 255, 187, 0.85)' }}
          _active={isSubmitDisabled ? {} : { bg: 'rgba(0, 255, 187, 0.70)' }}
          _disabled={{
            bg: 'surface.input',
            color: 'text.disabled',
            opacity: 1,
            cursor: 'not-allowed',
          }}
          transition="all 0.2s ease-out"
          boxShadow={isSubmitDisabled ? 'none' : '0px 1px 2px rgba(0,0,0,0.35)'}
        >
          {getButtonText()}
        </Button>
      </VStack>

      <TokenModal
        isOpen={modalTarget !== null}
        onClose={() => setModalTarget(null)}
        onSelect={handleTokenSelect}
      />
    </Box>
  )
}
