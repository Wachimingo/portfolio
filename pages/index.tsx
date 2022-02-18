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
        <button
          onClick={
            () => toast.error("test")
          }
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          style={{ marginLeft: "2px" }}
        >
          test toast
        </button>
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
          ...require(`../messages/index/${context.locale}.json`),
          ...require(`../messages/navbar/${context.locale}.json`),
        },
      }
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}