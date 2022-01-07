import { AuthProvider } from './../contexts/authContext';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CustomNavbar from '../components/navigation/CustomNavbar';
import './../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    if (isMounted) {
      import("bootstrap/dist/js/bootstrap");
    }
    setIsMounted(false)
  }, []);

  return (
    <>
      <AuthProvider>
        <CustomNavbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp;