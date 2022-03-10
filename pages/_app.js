import { AuthProvider } from '../contexts/authContext';
import 'tailwindcss/tailwind.css';
import MainNavbar from '../components/MainNavbar.server';
import './../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react'
// import Script from 'next/script';
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Fragment;
  return (
    <>
      {/* <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
      `}
      </Script> */}
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