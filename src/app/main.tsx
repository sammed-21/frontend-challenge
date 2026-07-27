import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider, type ThemeConfig, extendTheme } from '@chakra-ui/react'

import App from './App.tsx'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    heading: "'Inter', system-ui, sans-serif",
  },
  colors: {
    brand: {
      aquamarine: '#00FFBB',
      carbon: '#1D2021',
      cloud: '#F5F5F5',
      folly: '#FF3366',
      jonquil: '#FFCC00',
    },
    surface: {
      bg: '#0D0E0F',
      card: '#161819',
      input: 'rgba(245, 245, 245, 0.06)',
      inputHover: 'rgba(245, 245, 245, 0.10)',
      border: 'rgba(245, 245, 245, 0.10)',
      borderHover: 'rgba(245, 245, 245, 0.20)',
    },
    text: {
      primary: '#F5F5F5',
      secondary: 'rgba(245, 245, 245, 0.64)',
      disabled: 'rgba(245, 245, 245, 0.20)',
    },
  },
  radii: {
    corner: {
      xs: '4px',
      sm: '8px',
      base: '12px',
      lg: '16px',
      xlg: '24px',
      full: '9999px',
    },
  },
  shadows: {
    card: '0px 4px 48px 0px rgba(0, 0, 0, 0.30)',
    surface:
      '0px 1px 2px rgba(0,0,0,0.35), inset 0px 1px 0px rgba(255,255,255,0.09), inset 0px 4px 2px rgba(245,245,245,0.04), inset 0px -4px 2px rgba(29,32,33,0.30)',
  },
  styles: {
    global: {
      'html, body': {
        bg: 'surface.bg',
        color: 'text.primary',
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
