import { AuthProvider } from './../contexts/authContext';
import 'tailwindcss/tailwind.css';
import dynamic from 'next/dynamic';
const MainNavbar = dynamic(() => import('../components/NavBars').then((mod) => mod.MainNavbar), { ssr: false })
import './../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <MainNavbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp;