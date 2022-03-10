import dynamic from 'next/dynamic'
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from '../../../../components/Card';
import { CatalogControls } from '../../../../components/CatalogComponents';
import AuthContext from '../../../../contexts/authContext';
import { imageHandler } from '../../../../controllers/imgController';
import { Dish, Favs, Categories } from '../../../../interfaces/DishInterface';
import projectLayout from '../../../../layouts/projectLayout';
import { GetServerSideProps } from 'next';

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
                    role && role === 'user' ? undefined
                        :
                        <button
                            type="button"
                            className="absolute bg-cyan-500 text-white rounded-full w-16 h-16 bottom-4 right-4 hover:opacity-50"
                            onClick={() => setShowModal('')}
                        >
                            +
                        </button>
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
                                        ? 'relative xl:inline-block xl:mx-2 w-fit left-0 overflow-hidden border-2 border-gray content-center z-10'
                                        : 'relative xl:inline-block xl:mx-2 w-fit left-0 overflow-hidden content-center z-10'} >
                                {
                                    session?.user.role === 'admin' ?? 'helper'
                                        // true
                                        ?
                                        <CatalogControls
                                            token={token}
                                            item={item}
                                            favs={favs}
                                            setItem={setItem}
                                            setShowModal={setShowModal}
                                            userId={userId}
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
                        showModal={showModal} //Replace showModal with '' to open the modal for modifications
                        // show={''}
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
        const fetchCategories = fetch(`${process.env.managementBackend}/api/v1/categories?locale=${context.locale}`, {
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