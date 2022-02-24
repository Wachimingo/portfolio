import { GetServerSideProps } from "next";
import projectLayout from "../../../layouts/projectLayout";
import Image from 'next/image'
import Carousel from "../../../components/Carousel";
const classes = require('../../../styles/comedorIndex.module.css');

const index = ({ items, content, error }: any) => {
    if (error) {
        return <>{error}</>
    }
    return (
        <>
            <br />
            {/* Main section */}
            <section className={`text-center`}>
                <div className="text-black text-xl text-bold bg-white w-72" style={{ marginLeft: "42vw" }}>
                    <h1 className="text-2xl">{content.title}</h1>
                </div>
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
                    <div className="inline-block ml-24">
                        <h4>{content.lunch}</h4>
                        <Image
                            src='/assets/lunch.jpg'
                            alt="breakfast"
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="inline-block ml-24">
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
        const classes = require('../../../styles/comedorIndex.module.css');
        const res = await fetch(`${process.env.managementBackend}/api/v1/menu/forToday?limit=10`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        const items = await res.json() ?? [];

        const result = await fetch(`http://127.0.0.1:3000/api/locale?locale=${context.locale}&pageName=comedorIndex`);
        const locale = await result.json();
        return {
            props: {
                items: items.data,
                content: locale[0].content,
                error: null,
                customClass: classes.backgroundImage1
            }
        }
    } catch (error) {
        return {
            props: {
                items: null,
                content: null,
                error: 'No connection to Database',
                customClass: classes.backgroundImage1
            }
        }
    }

}