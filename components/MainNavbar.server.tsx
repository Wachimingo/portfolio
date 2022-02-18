import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useState, useContext, memo } from 'react';
import AuthContext from '../contexts/authContext';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { LocaleSwitcher } from './LocaleSwitcher'

const MainNavbar = () => {
    const { session }: any = useContext(AuthContext);
    const t = useTranslations("navbar");
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // Setting up useEffect to know when the component is mounted, so it can read the values from the session context
    useEffect(() => {
        if (!isMounted) {

        }
        setIsMounted(true)
    }, []);
    if (!isMounted) return <>{t("Loading")}</>
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800 mb-3 overflow-visible">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
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
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="navbar"
                    >
                        <Link href='/projects' passHref>
                            <a className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>{t("Projects")}</a>
                        </Link>
                        <Link href='/skills' passHref>
                            <a className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>{t("Skills")}</a>
                        </Link>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {
                                !session
                                    ?
                                    <li className="nav-item">
                                        <Link href={'/auth/signup'} passHref>
                                            <a
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">{t("Sign up")}</span>
                                            </a>
                                        </Link>
                                    </li>
                                    :
                                    undefined
                            }
                            <li className="nav-item">
                                <Link href={!session ? '/auth/signin' : '/auth/signout'} passHref>
                                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-7">{!session ? t('Sign in') : t('Sign out')}</a>
                                </Link>
                            </li>
                            <LocaleSwitcher />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );

}

export default MainNavbar;