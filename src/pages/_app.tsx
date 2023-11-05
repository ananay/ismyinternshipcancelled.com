import "@/styles/home.scss";
import "@/styles/CompanyCard.scss";
import "@/styles/home.scss";
import "@/styles/CompanyPopup.scss";
import "@/styles/MapOptions.scss";
import "@/styles/map.scss";

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
