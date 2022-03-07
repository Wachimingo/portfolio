import { useEffect } from 'react';
import { useState, useContext, memo } from 'react';
import AuthContext from '../contexts/authContext';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { LocaleSwitcher } from './LocaleSwitcher'
import { useRouter } from 'next/router';

const MainNavbar = () => {
    const { session }: any = useContext(AuthContext);
    const router = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // Setting up useEffect to know when the component is mounted, so it can read the values from the session context
    useEffect(() => {
        if (!isMounted) {

        }
        setIsMounted(true)
    }, []);
    if (!isMounted) return <>{router.locale === 'en' ? 'Loading' : 'Cargando'}</>
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800 mb-3 overflow-visible">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-screen relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link href='/' passHref>
                            <a
                                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            >
                                Wachimingo
                            </a>
                        </Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <FaBars />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex lg:flex-grow xl:flex xl:flex-grow items-center grid" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="navbar"
                    >
                        <ul className="">
                            <li className="xl:inline-block lg:inline-block">
                                <Link href='/projects' passHref>
                                    <a
                                        className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                    >
                                        {router.locale === 'en' ? 'Projects' : 'Proyectos'}
                                    </a>
                                </Link>
                            </li>
                            <li className="xl:inline-block lg:inline-block">
                                <Link href='/skills' passHref>
                                    <a className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>{router.locale === 'en' ? 'Skills' : 'Habilidades'}</a>
                                </Link>
                            </li>
                        </ul>
                        <ul className="xl:absolute xl:right-16 lg:absolute lg:right-16">
                            {
                                !session
                                    ?
                                    <li className="xl:inline-block lg:inline-block">
                                        <Link href={'/auth/signup'} passHref>
                                            <a
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                {router.locale === 'en' ? 'Sign up' : 'Registrarse'}
                                            </a>
                                        </Link>
                                    </li>
                                    :
                                    undefined
                            }
                            <li className="xl:inline-block lg:inline-block">
                                <Link href={!session ? '/auth/signin' : '/auth/signout'} passHref>
                                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-7">{!session ? router.locale === 'en' ? 'Sign In' : 'Ingresar' : router.locale === 'en' ? 'Sign Out' : 'Salir'}</a>
                                </Link>
                            </li>

                        </ul>
                        <div className="xl:absolute xl:right-8">
                            <LocaleSwitcher />
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );

}

export default MainNavbar;