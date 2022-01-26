import type { GetServerSideProps } from "next";
import Head from 'next/head'
import { StarRating, drawStars } from "../../../../components/StarRating";
import { Card } from '../../../../components/Card'
import { ReviewModal } from "../../../../components/ReviewModal";
import { useState } from "react";

const review = ({ item, review, userId, token, error }: any) => {
    const [showModal, setShowModal] = useState('hidden');
    const [stars, setStars] = useState(0);
    if (error) {
        return <p>{error}</p>
    } else {
        return (
            <>
                <Head>
                    <title>{item.name}</title>
                    <meta name={item.name} content={`Descripcion y review de ${item.name}`} />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/* Dish info */}
                <section >
                    <h1>Reseñas</h1>
                    <div key={item._id} id={`itemBody_${item._id}`} className={`card inline-block mx-2`} >
                        <Card item={item} />
                    </div>
                </section>
                {/* Review Dish */}
                <section style={{ marginTop: "2vh" }}>
                    <h2>Dinos que te parecio este platillo</h2>
                    <StarRating
                        setShowModal={setShowModal}
                        setStars={setStars}
                        stars={review.rating}
                    />
                </section>
                {/* Dish reviews */}
                <section>
                    <hr className="solid"></hr>
                    <h2>Reseñas</h2>
                    {/* <StarRating /> */}
                    {
                        item.reviews.map((review: any, i: number) => {
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
                    review={review}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    stars={stars}
                    isNew={review.record}
                />
            </>
        )
    }

}

export default review

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let error = null;

        const res1 = await fetch(`http://localhost:3000/api/comedor/dish?type=one&id=${context.query.id}`, {
            method: 'GET',
        });

        const item = await res1.json();
        // console.log(item)


        // const res2 = await fetch(`http://localhost:3000/api/comedor/reviews?type=one&userId=${context.req.cookies.userId}&dishId=${context.query.id}`, {
        const res2 = await fetch(`http://localhost:3000/api/comedor/reviews?type=one&userId=${context.req.cookies.userId}&dishId=${context.query.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${context.req.cookies.token}`
            }
        });

        const review = await res2.json();

        if (context.req.cookies.role === 'admin') {
            if (!res1.ok) error = item.message;
            if (!res2.ok) error = review.message;
        } else {
            if (!res1.ok) return {
                notFound: true,
            };
            if (!res2.ok) return {
                notFound: true,
            };
        }

        return {
            props: {
                item: item.record,
                review,
                token: context.req.cookies.token ?? null,
                userId: context.req.cookies.userId ?? null,
                error
            }
        }
    } catch (err) {
        return { props: { error: 'Something went wrong' } }
    }
}