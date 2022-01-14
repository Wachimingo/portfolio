import type { GetServerSideProps, NextPage } from "next";
import Head from 'next/head'
import { StarRating, drawStars } from "../../../../components/StarRating";

const review = ({ item, review }: any) => {
    return (
        <>
            <Head>
                <title>{item.name}</title>
                <meta name={item.name} content={`Descripcion y review de ${item.name}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Dish info */}
            <section style={{ marginTop: "2vh" }}>
                <h1>{item.name}</h1>
                <img src={item.image} style={{ marginTop: "2vh", width: "25vw" }} />
                <p style={{ marginTop: "2vh", fontSize: "150%" }}>{item.description}</p>
            </section>
            {/* Review Dish */}
            <section style={{ marginTop: "2vh" }}>
                <h2>Dinos que te parecio este platillo</h2>
                <StarRating />
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
        </>
    )
}

export default review

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const res1 = await fetch(`http://localhost:3000/api/dish?type=one&id=${context.query.id}`, {
            method: 'GET',
        });

        const item = await res1.json();

        // const res2 = await fetch('http://localhost:3000/api/brand', {
        //     method: 'GET',
        // });

        // // console.log(item)
        // const review = await res2.json();
        return { props: { item: item.record } }
    } catch (err) {

        return { props: { error: 'Something went wrong' } }
    }
}