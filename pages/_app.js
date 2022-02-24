import { AuthProvider } from '../contexts/authContext';
import 'tailwindcss/tailwind.css';
import MainNavbar from '../components/MainNavbar.server';
import './../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { Fragment, useEffect, useState } from 'react'
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Fragment;
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      document.body.className = pageProps.customClass ?? '';
    } else {
      // import('react-toastify/dist/ReactToastify.min.css');
    }
    setIsMounted(true);
  }, [])
  return (
    <>
      <Layout>
        <AuthProvider>
          <MainNavbar />
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
      <ToastContainer />
    </>
  )
}

export default MyApp;