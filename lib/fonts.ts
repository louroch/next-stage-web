import { Inter, Roboto, Oswald, Timmana } from 'next/font/google'

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

// Oswald para títulos/subtítulos
export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

// Timmana para subtítulos
export const timmana = Timmana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-timmana',
  display: 'swap',
})

// Fuentes personalizadas con fallback a Inter (Special Gothic Expanded One)
export const specialGothic = {
  variable: '--font-special-gothic',
  style: { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }
}
