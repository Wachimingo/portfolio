import type { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
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

const CatalogModal = dynamic<any>(() => import('../../../../components/modals/CatalogModal').then((mod) => mod.CatalogModal));

interface propsType {
    items: Dish[],
    favs: Favs[],
    categories: Categories[],
    token: string,
    userId: string,
    error: []
}

const catalog = ({ items, favs, categories, token, userId, error }: propsType) => {
    const [image, setImage] = useState<any>(''); // Use for saving image files as base64 in dabase
    const { session }: any = useContext(AuthContext);
    const [item, setItem] = useState<Dish>(undefined); // Use for modify/update existing item
    const [showModal, setShowModal] = useState('hidden'); // 'hidden' to have the modal closed and '' to open it
    const [isMounted, setIsMounted] = useState(false);
    const t = useTranslations("catalog");
    useEffect(() => {
        if (!isMounted) {
            for (let index = 0; index < error.length; index++) {
                toast.error(error[index]);
            }
        }
        setIsMounted(true)
    }, [])

    if (!items) return <>{t("error")}</>
    return (
        <>
            <Head>
                <title>{t("title")}</title>
                <meta name={t("catalog")} content={t("content")} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={showModal === '' ? 'pointer-events-none' : ''}>
                <h1>{t("title")}</h1>
                <button type="button" className={`bg-cyan-500 text-white ${classes.addButton}`} onClick={() => setShowModal('')}>+</button>
                {/* Display items section */}
                <section>
                    {items?.map((item: Dish) => {
                        return (
                            <div key={item!._id} id={`itemBody_${item!._id}`} className={item!.forToday ? `card inline-block mx-2 ${classes.itemIsForToday}` : `card inline-block mx-2`} >
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
        const res1 = await fetch(`http://127.0.0.1:3000/api/comedor/dish?type=all`, {
            method: 'GET',
        })
        const items = await res1.json();
        const res3 = await fetch(`http://127.0.0.1:3000/api/comedor/categories`, {
            method: 'GET',
        })
        const categories = await res3.json();
        let res2 = undefined
        if (context.req.cookies !== undefined) {
            res2 = await fetch(`http://127.0.0.1:3000/api/comedor/favoriteDish?userId=${context.req.cookies?.userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}`
                }
            })
        }
        let favs = undefined
        if (res2?.ok) favs = await res2.json();
        if (context.req.cookies.role === 'admin') {
            if (!res1.ok) error.push(items.message);
            if (!res3.ok) error.push(categories.message);
            if (res2) {
                if (!res2.ok) console.log(favs.message)
            }
        } else {
            if (!res1.ok) error.push(items.message);
            if (!res3.ok) error.push(categories.message);
        }
        return {
            props: {
                items: items.records,
                favs: favs.records,
                categories: categories.records,
                token: context.req.cookies.token ?? null,
                userId: context.req.cookies.userId ?? null,
                messages: {
                    ...require(`../../../../public/static/messages/catalog/${context.locale}.json`),
                    ...require(`../../../../public/static/messages/navbar/${context.locale}.json`),
                },
                error,
            }
        }
    } catch (err) {
        return {
            notFound: true,
        };
    }
}