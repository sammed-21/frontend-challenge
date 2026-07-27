import { Box, Input, Text } from '@chakra-ui/react'

export function toOnchainAmount(value: string, decimals: number): bigint {
  const parsed = parseFloat(value)
  return BigInt(Math.round(parsed * 10 ** decimals))
}

export function fromOnchainAmount(value: bigint, decimals: number): string {
  return (Number(value) / 10 ** decimals).toString()
}

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  readOnly?: boolean
}

export function AmountInput({
  value,
  onChange,
  label,
  readOnly = false,
}: AmountInputProps) {
  return (
    <Box flex={1}>
      <Text fontSize="12px" color="text.secondary" mb={2} fontWeight={500}>
        {label}
      </Text>
      <Input
        type="text"
        inputMode="decimal"
        placeholder="0"
        value={value}
        onChange={(e) => {
          const raw = e.target.value
          if (/^[0-9]*\.?[0-9]*$/.test(raw)) {
            onChange(raw)
          }
        }}
        readOnly={readOnly}
        fontSize="28px"
        fontWeight={500}
        color={value ? 'text.primary' : 'text.disabled'}
        bg="transparent"
        border="none"
        h="40px"
        p={0}
        _focus={{ boxShadow: 'none', outline: 'none' }}
        _placeholder={{ color: 'text.disabled' }}
      />
    </Box>
  )
}
