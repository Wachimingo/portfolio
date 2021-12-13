import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CustomNavbar from '../components/navigation/CustomNavbar';
import './../styles/globals.css'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <CustomNavbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;