import { AuthProvider } from './../contexts/authContext';
import 'tailwindcss/tailwind.css';
import MainNavbar from '../components/MainNavbar.server';
import './../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
// import '../node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <MainNavbar />
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default MyApp;