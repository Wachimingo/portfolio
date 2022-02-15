import { AuthProvider } from '../contexts/authContext';
import 'tailwindcss/tailwind.css';
import MainNavbar from '../components/MainNavbar.server';
import './../styles/globals.css';
// import 'react-toastify/dist/ReactToastify.css';
// import '../node_modules/react-toastify/dist/ReactToastify.minimal.css';
import { ToastContainer } from 'react-toastify';
import { Fragment, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Fragment;
  useEffect(() => {
    import('react-toastify/dist/ReactToastify.css');
  }, [])
  return (
    <Layout>
      <AuthProvider>
        <MainNavbar />
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </Layout>
  )
}

export default MyApp;