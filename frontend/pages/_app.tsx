import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import axios from "axios";

// if deployed use the domain deployed on, otherwise use localhost for testing.
if (typeof window !== "undefined") {
  if (window.location.origin !== "http://localhost:3000") {
    axios.defaults.baseURL = window.location.origin;
  }
  else {
    axios.defaults.baseURL = "http://localhost:8000/"
  }
}


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
