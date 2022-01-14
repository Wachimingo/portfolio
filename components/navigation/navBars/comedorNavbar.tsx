import type { FC } from 'react';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '../../Spinner';

export const ComedorNavBar: FC = () => {
    const { session }: any = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href='/' passHref>
                    <a className="navbar-brand">
                        <Image src="/vercel.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                        Comedor
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href='/' passHref>
                                <a className="nav-link active" aria-current="page">Menu</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/menu' passHref>
                                <a className="nav-link active" aria-current="page">Catalogo</a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {
                            session
                                ?
                                undefined
                                :
                                <li>
                                    <Link href={'/auth/signup'} passHref>
                                        <a className="nav-link active end-100" aria-current="page">Registrarse</a>
                                    </Link>
                                </li>
                        }

                        {/** Login/Logout link 
                            * @session is the current user session info from the AuthContext provider, if it is null it will render the login link, if it is not null it will render the logout link
                        */}
                        <li>
                            <Link href={!session ? '/auth/signin' : '/auth/signout'} passHref>
                                <a className="nav-link active end-100" aria-current="page">{!session ? 'Ingresar' : 'Salir'}</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}