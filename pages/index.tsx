import type { GetServerSideProps } from 'next';
import { useContext } from 'react';
import AuthContext from './../contexts/authContext'
import Head from 'next/head';
import { SkillCard } from '../components/Card';
import { connect } from "mongoose"
import Locale from "../models/localeModel";
import Skills from "../models/skillsModel";
import Categories from "../models/categoriesModel";
import { FaArrowAltCircleDown, FaArrowDown, FaFacebookF, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa';
import Link from 'next/link';
// import Link from 'next/link';

const Home = ({ content, locale, skills, categories }: any) => {
  const { session }: any = useContext(AuthContext);
  return (
    <div >
      <Head>
        <title>{content.title}</title>
        <meta name={content.title} content={content.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`text-white text-2xl relative`}>
        <style jsx global>
          {`
            .curve {
              z-index: -100;
              margin-top: -1.2vh;
              /* display: block; */
              box-sizing: border-box;
              height: 400px;
              background-color: #34495E;
              clip-path: ellipse(300% 100% at 275% 0%);
          }
          `}
        </style>
        <div className='curve'></div>
        <br />
        <div className={`inline-block top-2 absolute 2xl:left-8  xl:left-4 lg:left-2 md:left-0 sm:left-0 xs:left-0`}>
          <h1 className="text-2xl">Wachimingo</h1>
          <br />
          <p className="text-base">{content.welcome}</p>
        </div>
        <img
          className='2xl:float-right 2xl:absolute 2xl:right-24 2xl:top-8 2xl:w-64 2xl:h-64 xl:float-right xl:absolute xl:right-24 xl:top-32 xl:w-64 xl:h-64 lg:float-right lg:absolute lg:right-24 lg:top-32 lg:w-64 lg:h-64 md:float-right md:absolute md:right-64 md:top-32 md:w-32 md:h-32 sm:float-right sm:absolute sm:right-64 sm:top-32 sm:w-32 sm:h-32 xs:float-right xs:absolute xs:right-32 xs:top-44 xs:w-24 xs:h-24 border-white border-8 h-52'
          src="/assets/profile.jpg"
        />
      </main>
      <br />
      <br />
      <section>
        <h1 className='relative text-2xl bottom-48'>{content.skills}</h1>
        <div className="relative bottom-40 right-4 h-96 overflow-hidden">
          {
            categories.map((cat: any) => {
              if (cat.relatedTo === 'skills') {
                return (
                  <section className="mb-12">
                    <h3 className="text-xl">{cat.name}</h3>
                    <br />
                    {
                      skills.filter((skill: any) => skill.category.name === cat.name).map((item: any) => {
                        return (
                          <SkillCard skill={item} />
                        )
                      })
                    }
                  </section>
                )
              } else undefined
            })
          }
        </div>
        <div className='relative bottom-32 inline-block '>
          <div className='ml-16 text-2xl animate-bounce w-6 h-6 '>
            <FaArrowDown />
          </div>
          <Link href={'/skills'} passHref={true}>
            <a
              className="block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {content.skillsButton}
            </a>
          </Link>
        </div>
      </section>
      <br />
      <footer className='relative bottom-0 bg-slate-800 text-white text-xl'>
        <div className='inline-block mx-2'>
          <h2>{locale === 'en' ? 'Find me in' : 'Encuentrame en'}:</h2>
          <span className='cursor-pointer hover:bg-white hover:text-black pr-1 pl-1 border border-white mr-2'>
            <a href="https://www.facebook.com/halex007/" target="_blank">
              <FaFacebookF className='inline-block' />
            </a>
          </span>
          <span className='cursor-pointer hover:bg-white hover:text-black pr-1 pl-1 border border-white'>
            <a href="https://www.linkedin.com/in/joshua-guillen-755143a7/" target="_blank">
              <FaLinkedinIn className='inline-block' />
            </a>
          </span>
          <br />
          <span className='text-sm'>
            <FaRegEnvelope className='inline-block' /> joshua.herrera2@outlook.com
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dev_db_url: string = 'mongodb://localhost:27017/portfolio'
  try {
    const cn = await connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true } as any)
    //Creating vars with promises to await them all in parallel
    const getLocale = Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('mainIndex').select('-__v');
    const getSkills = Skills.find({}).where('locale').equals(context.locale).select('-__v -locale').populate('category').limit(5);
    const getCategories = Categories.find({}).where('locale').equals(context.locale).select('-__v').limit(3);
    //Await all promises in parallel
    const [locale, skills, categories] = await Promise.all([getLocale, getSkills, getCategories]);

    //Some var is ruturn in json as getServerSideProps doesn't do the serialization itself
    return {
      props: {
        content: locale[0].content,
        skills: JSON.parse(JSON.stringify(skills)),
        categories: JSON.parse(JSON.stringify(categories)),
        locale: context.locale
      }
    }
  } catch (err) {
    return { props: { error: 'Something went wrong' } }
  }
}
