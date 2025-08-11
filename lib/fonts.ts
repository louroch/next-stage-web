import { Inter, Roboto } from 'next/font/google'
import localFont from 'next/font/local'

// Fuente para títulos - Special Gothic Expanded One
export const specialGothic = localFont({
  src: [
    {
      path: '../public/fonts/SpecialGothicExpandedOne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-special-gothic',
  display: 'swap',
})

// Fuente para subtítulos - Timmana
export const timmana = localFont({
  src: [
    {
      path: '../public/fonts/Timmana-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-timmana',
  display: 'swap',
})

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
