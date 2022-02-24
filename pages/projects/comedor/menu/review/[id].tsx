import type { GetServerSideProps } from "next";
import Head from 'next/head'
import { StarRating, drawStars } from "../../../../../components/StarRating";
import { Card } from '../../../../../components/Card'
import { ReviewModal } from "../../../../../components/modals/ReviewModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dish } from "../../../../../interfaces/DishInterface";
import { Review } from "../../../../../interfaces/ReviewInterface";
import { toast } from "react-toastify";

interface ReviewProps {
    item: Dish,
    review: Review,
    userId: string,
    token: string,
    error: []
}

const review = ({ item, review, userId, token, error }: ReviewProps) => {
    const [showModal, setShowModal] = useState('hidden');
    const [stars, setStars] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (!isMounted) {
            for (let index = 0; index < error.length; index++) {
                toast.error(error[index]);
            }
        }
        setIsMounted(true)
    }, [])
    if (!item) return (
        <>
            <Link href={'/comedor/menu/catalog'} passHref>
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Volver al catalogo</a>
            </Link>
            <br />
            <br />
            <h1>Error</h1>
        </>
    )
    return (
        <>
            <Head>
                <title>{item?.name}</title>
                <meta name={item?.name} content={`Descripcion y review de ${item?.name}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href={'/comedor/menu/catalog'} passHref>
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Volver al catalogo</a>
            </Link>
            <br />
            <br />
            {/* Dish info */}
            <section >
                <h1>Reseñas</h1>
                <br />
                <div key={item?._id} id={`itemBody_${item?._id}`} className={`card inline-block mx-2`} >
                    <Card item={item} />
                </div>
            </section>
            {/* Review Dish */}
            <section style={{ marginTop: "2vh" }}>
                <h2>Dinos que te parecio este platillo</h2>
                <StarRating
                    setShowModal={setShowModal}
                    setStars={setStars}
                    stars={review ? review.rating : 0}
                />
            </section>
            {/* Dish reviews */}
            <section>
                <hr className="solid"></hr>
                <h2>Reseñas</h2>
                {/* <StarRating /> */}
                {
                    item?.reviews.map((review: any, i: number) => {
                        return (
                            <div key={i}>
                                <hr className="solid"></hr>
                                <div style={{ color: "yellow" }}>{drawStars(review.rating)}</div>
                                <p>{review.user.name}: {review.review}</p>
                            </div>
                        )
                    })
                }
            </section>
            <ReviewModal
                userId={userId}
                token={token}
                item={item}
                review={review ? review : undefined}
                showModal={showModal}
                setShowModal={setShowModal}
                stars={stars}
                isNew={review ? false : true}
            />

        </>
    )
}

export default review

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let error = [];
        // ${context.query.id}
        const res1 = await fetch(`http://127.0.0.1:3000/api/comedor/dish?type=one&id=${context.query.id}`, {
            method: 'GET',
        });
        const item = await res1.json();
        // ${context.query.id}
        const res2 = await fetch(`http://127.0.0.1:3000/api/comedor/reviews?type=one&userId=${context.req.cookies.userId}&dishId=${context.query.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${context.req.cookies.token}`
            }
        });
        const review = await res2.json();
        if (context.req.cookies.role === 'admin') {
            if (!res1.ok) error.push(item.message);
            if (!res2.ok) error.push(review.message);
        } else {
            if (!res1.ok) console.log(item.message);
            if (!res2.ok) console.log(review.message);
        }
        return {
            props: {
                item: item.record,
                review: review.record,
                token: context.req.cookies.token ?? null,
                userId: context.req.cookies.userId ?? null,
                error
            }
        }
    } catch (err) {
        return { props: { error: 'Something went wrong' } }
    }
}