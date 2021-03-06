import { GetServerSideProps } from "next";
import projectLayout from "../../../layouts/projectLayout";
import Image from 'next/image'
import Carousel from "../../../components/Carousel";
import { connect } from "mongoose"
import Locale from "../../../models/localeModel";
import Head from "next/head";
import dbConnect from "../../../utils/dbConnection";

const index = ({ items, content, error, locale }: any) => {
    if (error) {
        return <>{error}</>
    }
    return (
        <>
            <Head>
                <title>{locale === 'en' ? 'Restaurant' : 'Comedor'}</title>
                <meta name={content.title} content={content.title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <br />
            <style jsx global>{`
                body {
                    background: url("https://i2.wp.com/diplomartbrussels.com/wp-content/uploads/2020/09/food-background-images-94-images-in-co-381169-png-images-pngio-food-background-png-1440_619.png?ssl=1");
                    background-repeat: no-repeat;
                    background-size: 100%;
                    background-color: #fcf8f5;
                }
                `}
            </style>
            {/* Main section */}
            <section className={`text-center`}>
                <div className="text-black text-xl text-bold right-50">
                    <h1 className="text-2xl">{content.title}</h1>
                </div>
                <br />
                <Image src={`/logo.jpg`} alt="logo" width="250" height="250" />
                <br />
                <h2>{content.slogan}</h2>
                <br />
                <p>{content.todaysMenu}</p>
                <Carousel items={items} />
                {/* <Link href="/menu/sell" passHref>
          <a className="btn btn-success" style={{ width: "25vw" }}>Comprar</a>
        </Link> */}

            </section>
            <br />
            <br />
            <section className={`text-center`}>
                <h3 className="text-xl">{content.waiting}</h3>
                <br />
                <div>
                    <div className="inline-block">
                        <h4>{content.breakfast}</h4>
                        <Image
                            src='/assets/breakfast.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="inline-block xl:ml-24">
                        <h4>{content.lunch}</h4>
                        <Image
                            src='/assets/lunch.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="inline-block xl:ml-24">
                        <h4>{content.dinner}</h4>
                        <Image
                            src='/assets/dinner.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                </div>
            </section>
        </ >
    )
}

export default index;

index.Layout = projectLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        await dbConnect();
        const res = await fetch(`${process.env.managementBackend}/api/v1/menu/forToday?limit=10`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        const items = await res.json() ?? [];

        const locale = await Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('comedorIndex').select('-__v');
        return {
            props: {
                items: items.data,
                content: locale[0].content,
                error: null,
                locale: context.locale
            }
        }
    } catch (error) {
        return {
            props: {
                items: null,
                content: null,
                error: 'No connection to Database',
            }
        }
    }

}