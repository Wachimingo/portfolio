import type { NextPage, GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '../../components/Spinner';

type Items = {
    name: string;
    navType: string;
    value: string;
    childObject: Object;
    role: Array<String>;
}

type Brand = {
    name: string;
    bussinessType: string;
    location: Object;
    description: string;
    email: string;
}

interface CustomNavbarProps {
    props: {
        items: Array<Items>;
        brand: Brand;
    }
}

const CustomNavbar = () => {
    const [isItemsLoaded, setIsItemsLoaded] = useState<Boolean>(false);
    const [isBrandLoaded, setIsBrandLoaded] = useState<Boolean>(false);
    const [items, setItems] = useState<Items[]>([]);
    const [brand, setBrand] = useState<Brand>({ name: 'Brand', bussinessType: '', location: {}, description: '', email: '' });
    const session2 = { role: 'any' };
    useEffect(() => {
        fetch('/api/navbar', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => setItems(res))
            .then(() => setIsItemsLoaded(true));
        fetch('/api/brand', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => setBrand(res[0]))
            .then(() => setIsBrandLoaded(true));
    }, [items])

    if (!isItemsLoaded || !isBrandLoaded) {
        return <Spinner />
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link href='/' passHref>
                        <a className="navbar-brand">
                            <Image src="/vercel.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                            {brand.name}
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <Link href='/' passHref>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                            </Link>
                            {
                                items.map((item: Items) => {
                                    /**@param session.role from the current user session info, if it matches the nav element it will be render */
                                    if (item.childObject && item.role.includes(session2.role)) {
                                        return (
                                            <li key={item.name} className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {item.name}
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    {
                                                        Object.entries(item.childObject).map((child) => {
                                                            return (
                                                                <li key={child[1]}>
                                                                    <Link href={child[1]} passHref>
                                                                        <a className="dropdown-item" >{child[0]}</a>
                                                                    </Link>
                                                                </li>
                                                            )

                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    } else {
                                        if (item.role.includes(session2.role)) {
                                            return (
                                                <li key={item.name} className="nav-item">
                                                    <Link href={item.value} passHref>
                                                        <a className="nav-link active" aria-current="page">{item.name}</a>
                                                    </Link>
                                                </li>
                                            )
                                        } else return null
                                    }
                                })
                            }
                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                <Link href={'/auth/signin'} passHref>
                                    <a className="nav-link active end-100" aria-current="page">Ingresar</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default CustomNavbar;