import type { GetServerSideProps } from 'next';
import { useContext } from 'react';
import AuthContext from './../contexts/authContext'
import Head from 'next/head';
import Image from 'next/image';
import { toast } from "react-toastify";

const Home = ({ content }: any) => {
  const { session }: any = useContext(AuthContext);
  return (
    <div >
      <Head>
        <title>{content.title}</title>
        <meta name={content.title} content={content.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-2xl">Wachimingo</h1>
        <br />
        <p className="text-base">{content.welcome}</p>
      </main>

      <footer >

      </footer>
    </div>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const result = await fetch(`http://127.0.0.1:3000/api/locale?locale=${context.locale}&pageName=mainIndex`);
    const locale = await result.json();
    return {
      props: {
        content: locale[0].content
      }
    }
  } catch (err) {

    return { props: { error: 'Something went wrong' } }
  }
}