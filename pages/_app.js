import { AuthProvider } from './../contexts/authContext';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CustomNavbar from '../components/navigation/CustomNavbar';
import './../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
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