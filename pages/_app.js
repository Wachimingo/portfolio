import { AuthProvider } from '../contexts/authContext';
import 'tailwindcss/tailwind.css';
import MainNavbar from '../components/MainNavbar.server';
import './../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { Fragment, useEffect } from 'react'
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Fragment;
  useEffect(() => {
    document.body.className = pageProps.customClass ?? '';
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