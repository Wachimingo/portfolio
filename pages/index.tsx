import type { GetServerSideProps } from 'next';
import { useContext } from 'react';
import AuthContext from './../contexts/authContext'
import Head from 'next/head';
import Image from 'next/image';
import { toast } from "react-toastify";
import { useTranslations } from 'next-intl';

const Home = () => {
  const { session }: any = useContext(AuthContext);
  const t = useTranslations("index")
  return (
    <div >
      <Head>
        <title>{t("title")}</title>
        <meta name={t("title")} content={t("content")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-2xl">Wachimingo</h1>
        <br />
        <p className="text-base">Greetings! My name is Joshua Herrera, I'm a fullstack developer based in El Salvador</p>
        <p className="text-base">Feel free to check out the projecs I've worked on and the skills I have.</p>
      </main>

      <footer >

      </footer>
    </div>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    return {
      props: {
        messages: {
          ...require(`../public/static/messages/index/${context.locale}.json`),
          ...require(`../public/static/messages/navbar/${context.locale}.json`),
        },
      }
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}