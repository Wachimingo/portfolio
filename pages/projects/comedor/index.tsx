import { GetServerSideProps } from "next";
import projectLayout from "../../../layouts/projectLayout";
import Image from 'next/image'
import { useTranslations } from "next-intl";
import Carousel from "../../../components/Carousel";
const classes = require('../../../styles/comedorIndex.module.css');

const index = ({ items }: any) => {
    const t = useTranslations("index");
    return (
        <>
            <br />
            {/* Main section */}
            <section className={`text-center`}>
                <div className="text-black text-xl text-bold bg-white w-72" style={{ marginLeft: "42vw" }}>
                    <h1>{t("welcome")}</h1>
                </div>
                <Image src={`/logo.jpg`} alt="logo" width="250" height="250" />
                <br />
                <h2>{t("slogan")}</h2>
                <br />
                <p>{t("todayMenu")}</p>
                <Carousel items={items} />
                {/* <Link href="/menu/sell" passHref>
          <a className="btn btn-success" style={{ width: "25vw" }}>Comprar</a>
        </Link> */}

            </section>
            <br />
            <br />
            <section className={`text-center`}>
                <h3>{t("waiting")}</h3>
                <br />
                <div>
                    <div className="inline-block">
                        <h4>{t("breakfast")}</h4>
                        <Image
                            src='/assets/breakfast.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="inline-block ml-24">
                        <h4>{t("lunch")}</h4>
                        <Image
                            src='/assets/lunch.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="inline-block ml-24">
                        <h4>{t("dinner")}</h4>
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
        const classes = require('../../../styles/comedorIndex.module.css');
        const res = await fetch(`${process.env.managementBackend}/api/v1/menu/forToday?limit=10`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        const items = await res.json() ?? [];
        // console.log("TCL: getServerSideProps:GetServerSideProps -> items", items)
        return {
            props: {
                items: items.data,
                messages: {
                    ...require(`../../../messages/index/comedor/${context.locale}.json`),
                    ...require(`../../../messages/navbar/${context.locale}.json`),
                    // ...require(`../../../messages/cards/${context.locale}.json`),
                },
                customClass: classes.backgroundImage1
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }

}