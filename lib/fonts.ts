import { Inter, Oswald } from 'next/font/google'
import localFont from 'next/font/local'

// Roboto (local)
export const roboto = localFont({
  src: [
    {
      path: '../public/fonts/Roboto/static/Roboto_Condensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
})

// Fuente de respaldo - Inter
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Oswald disponible si se requiere como fallback (no se usa para títulos)
export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

// Timmana (local) para subtítulos
export const timmana = localFont({
  src: [
    {
      path: '../public/fonts/Timmana/Timmana-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-timmana',
  display: 'swap',
})

// Special Gothic Expanded One (local) para títulos
export const specialGothic = localFont({
  src: [
    {
      path: '../public/fonts/Special_Gothic_Expanded_One/SpecialGothicExpandedOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-special-gothic',
  display: 'swap',
})
