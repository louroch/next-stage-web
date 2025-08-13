import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { specialGothic, timmana, roboto, inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Stage - Booking Artístico',
  description: 'Somos un booking que entiende la música como experiencia',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${roboto.style.fontFamily};
  --font-special-gothic: ${specialGothic.variable};
  --font-timmana: ${timmana.variable};
  --font-roboto: ${roboto.variable};
  --font-inter: ${inter.variable};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${roboto.variable} ${inter.variable} ${timmana.variable} ${specialGothic.variable}`}>
        {children}
      </body>
    </html>
  )
}
