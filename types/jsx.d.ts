import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

declare module 'react' {
  interface SVGProps<T> extends React.SVGProps<T> {
    size?: number
  }
}
