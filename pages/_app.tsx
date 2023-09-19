
import type { AppProps } from 'next/app'
import "antd/dist/reset.css"
import "@/styles/globals.sass"

export default function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
