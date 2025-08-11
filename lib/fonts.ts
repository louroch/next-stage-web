import { Inter, Roboto } from 'next/font/google'

// Fuente para cuerpo de texto - Roboto
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

// Fuente de respaldo - Inter
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Fuentes personalizadas con fallback a Inter
export const specialGothic = {
  variable: '--font-special-gothic',
  style: { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }
}

export const timmana = {
  variable: '--font-timmana',
  style: { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }
}
