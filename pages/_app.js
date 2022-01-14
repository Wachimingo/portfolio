import { AuthProvider } from './../contexts/authContext';
import { useEffect, useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import dynamic from 'next/dynamic';
// const CustomNavbar = dynamic(() => import('../components/navigation/navBars/CustomNavbar'), { ssr: false })
import CustomNavbar from '../components/navigation/navBars/CustomNavbar';
import './../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // const [isMounted, setIsMounted] = useState(true)
  // useEffect(() => {
  //   if (isMounted) {
  //     // import("bootstrap/dist/js/bootstrap");
  //   }
  //   setIsMounted(false)
  // }, []);

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