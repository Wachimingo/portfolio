import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import Head from 'next/head';
const classes = require('./../../../../styles/catalog.module.css');
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../../contexts/authContext';
import { Card, ControlButtons } from '../../../../components/Card'
import { Dish, Favs, Categories } from '../../../../interfaces/DishInterface';
import { imageHandler } from '../../../../controllers/imgController';
import { toast } from 'react-toastify';
import projectLayout from '../../../../layouts/projectLayout';
import { useRouter } from 'next/router';

const CatalogModal = dynamic<any>(() => import('../../../../components/modals/CatalogModal').then((mod) => mod.CatalogModal));

interface propsType {
    items: Dish[],
    favs: Favs[],
    categories: Categories[],
    token: string,
    userId: string,
    error: [],
    role: string,
}

const catalog = ({ items, favs, categories, token, userId, error, role }: propsType) => {
    const router = useRouter();
    const [image, setImage] = useState<any>(''); // Use for saving image files as base64 in dabase
    const { session }: any = useContext(AuthContext);
    const [item, setItem] = useState<Dish>(undefined); // Use for modify/update existing item
    const [showModal, setShowModal] = useState('hidden'); // 'hidden' to have the modal closed and '' to open it
    const [isMounted, setIsMounted] = useState(false); // Use for avoiding the modal to open when the component is not mounted
    useEffect(() => {
        if (!isMounted) {

        }
        setIsMounted(true)
    }, [])

    if (!items) return <>Error</>
    return (
        <>
            <Head>
                <title>{router.locale === 'en' ? 'Catalog' : 'Catalogo'}</title>
                <meta name={router.locale === 'en' ? 'Catalog' : 'Catalogo'} content={router.locale === 'en' ? 'Catalog' : 'Catalogo'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={showModal === '' ? 'pointer-events-none' : ''}>
                <h1 className='text-2xl'>{router.locale === 'en' ? 'Catalog' : 'Catalogo'}</h1>
                {
                    role ?
                        role !== 'user'
                            ? <button type="button" className={`bg-cyan-500 text-white samsungS8:ml-0 ${classes.addButton}`} onClick={() => setShowModal('')}>+</button>
                            : undefined
                        : undefined
                }
                <br />
                {/* Display items section */}
                <section>
                    {items?.map((item: Dish) => {
                        return (
                            <div
                                key={item!._id}
                                id={`itemBody_${item!._id}`}
                                className={
                                    item!.forToday
                                        ? `xl:inline-block xl:mx-2 w-96 overflow-hidden border-2 border-graycontent-center  ${classes.catalog}`
                                        : `xl:inline-block xl:mx-2 overflow-hidden w-96 sm:ml-3  content-center ${classes.catalog}`} >
                                {
                                    session?.user.role === 'admin' ?? 'helper'
                                        ?
                                        <ControlButtons
                                            token={token}
                                            item={item}
                                            favs={favs}
                                            setItem={setItem}
                                            setShowModal={setShowModal}
                                            _id={userId}
                                        />
                                        : undefined
                                }
                                <Card item={item} />
                            </div>
                        )
                    })}
                </section>
            </div>
            {/* Modal box */}
            {
                session?.user?.role === 'admin' ?? 'helper'
                    ?
                    <CatalogModal
                        showModal={showModal} //Replace showModal with 'true' to open the modal for modifications
                        // show={'true'}
                        items={items}
                        item={item}
                        image={image}
                        imageHandler={imageHandler}
                        setImage={setImage}
                        setShowModal={setShowModal}
                        categories={categories}
                        setItem={setItem}
                        token={token}
                    />
                    : undefined
            }
        </>
    );
}

export default catalog;

catalog.Layout = projectLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let error = [];
        const fetchItems = fetch(`${process.env.managementBackend}/api/v1/menu?limit=1000`, {
            method: 'GET',
        })
        const fetchCategories = fetch(`${process.env.managementBackend}/api/v1/categories/`, {
            method: 'GET',
        })
        const [res1, res3] = await Promise.all([fetchItems, fetchCategories]);
        const [items, categories] = await Promise.all([res1.json(), res3.json()]);

        let res2 = undefined
        if (context.req.cookies !== undefined) {
            res2 = await fetch(`${process.env.managementBackend}/api/v1/fav/${context.req.cookies.userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}` ?? 'No token provided'
                }
            })
        }
        let favs = undefined
        if (res2?.ok) favs = await res2.json();

        return {
            props: {
                items: items.records,
                favs: favs.records,
                categories: categories.records,
                token: context.req.cookies.token ?? null,
                userId: context.req.cookies.userId ?? null,
                role: context.req.cookies.role ?? null,
            }
        }
    } catch (err) {
        return {
            notFound: true,
        };
    }
}