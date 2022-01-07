import { NextPage } from "next";
import Head from 'next/head'
import { useEffect, useState, useContext, Suspense } from "react";
import { useRouter } from "next/router";
import AuthContext from '../../contexts/authContext';
import { Dish, Response } from '../../interfaces/DishInterface'
const sell: NextPage = () => {
    const router = useRouter();
    const { session }: any = useContext(AuthContext);
    const [items, setItems] = useState<Dish>(undefined);

    useEffect(() => {
        if (!session || session.user.role.includes('admin' || 'helper')) router.replace('/');
    }, [])

    return (
        <>
            <Head>
                <title>Vender</title>
                <meta name="Vender" content="Venta de platillos" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export default sell;