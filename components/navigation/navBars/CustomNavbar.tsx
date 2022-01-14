import type { FC } from 'react';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '../../Spinner';
import { FaBars } from 'react-icons/fa'

const CustomNavbar: FC = () => {
    const { session }: any = useContext(AuthContext);
    const [navbarOpen, setNavbarOpen] = useState(false);
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
                        <span onClick={() => {
                            document.getElementById('dropdown')?.classList.toggle('hidden')
                        }} className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>Comedor</span>

                        <div className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 absolute" style={{ top: "3vh" }} id="dropdown">
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li onClick={() => {
                                    document.getElementById('dropdown')?.classList.toggle('hidden')
                                }}>
                                    <Link href='/comedor/menu/catalog' passHref>
                                        <a className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Catalogo</a>
                                    </Link>
                                </li>
                                <li onClick={() => {
                                    document.getElementById('dropdown')?.classList.toggle('hidden')
                                }}>
                                    <Link href='/' passHref>
                                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
                                    </Link>
                                </li>
                                <li onClick={() => {
                                    document.getElementById('dropdown')?.classList.toggle('hidden')
                                }}>
                                    <Link href='/' passHref>
                                        <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {
                                !session
                                    ?
                                    <li className="nav-item">
                                        <Link href={'/auth/signup'} passHref>
                                            <a
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                            >
                                                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Registrarse</span>
                                            </a>
                                        </Link>
                                    </li>
                                    :
                                    undefined
                            }
                            <li className="nav-item">
                                <Link href={!session ? '/auth/signin' : '/auth/signout'} passHref>
                                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-7">{!session ? 'Ingresar' : 'Salir'}</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default CustomNavbar;