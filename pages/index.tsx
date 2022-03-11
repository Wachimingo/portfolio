import type { GetServerSideProps } from 'next';
import { Suspense } from 'react';
import Head from 'next/head';
import dbConnect from "../utils/dbConnection";
import Locale from "../models/localeModel";
import Skills from "../models/skillsModel";
import certificationsModel from '../models/certificationsModel';
import Categories from "../models/categoriesModel";
import { FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const CertCard = dynamic<any>(() => import('../components/Card').then((mod) => mod.CertCard));
const SkillCard = dynamic<any>(() => import('../components/Card').then((mod) => mod.SkillCard));
const Footer = dynamic<any>(() => import('../components/Footer.server'));

const Home = ({ content, locale, skills, categories, certs }: any) => {
  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{content.title}</title>
        <meta name={content.title} content={content.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=' relative flex-grow'>
        <div className='curve'></div>
        <br />
        <div className='text-white text-2xl inline-block top-2 absolute 2xl:left-8  xl:left-4 lg:left-2 md:left-0 sm:left-0 xs:left-0'>
          <h1 className="text-2xl">Wachimingo</h1>
          <br />
          <p className="text-base">{content.welcome}</p>
        </div>
        <div className='2xl:float-right 2xl:absolute 2xl:right-24 2xl:top-8 2xl:w-64 2xl:h-64 xl:float-right xl:absolute xl:right-24 xl:top-32 xl:w-64 xl:h-64 lg:float-right lg:absolute lg:right-24 lg:top-32 lg:w-64 lg:h-64 md:float-right md:absolute md:right-64 md:top-32 md:w-32 md:h-32 sm:float-right sm:absolute sm:right-64 sm:top-32 sm:w-32 sm:h-32 xs:float-right xs:absolute xs:right-32 xs:top-44 xs:w-24 xs:h-24 border-white border-8 h-52'>
          <Image
            src="/assets/profile.jpg"
            layout='fill'
          />
        </div>

        <br />
        <section className="relative bottom-40 right-4 ">
          <h1 className='relative text-2xl bottom-0 right-0'>{content.skills}</h1>
          <br />
          <div className='2xl:h-40vh xl:h-40vh lg:h-40vh md:h-40vh sm:h-40vh xs:h-128 overflow-hidden'>
            {
              categories.map((cat: any) => {
                if (cat.relatedTo === 'skills') {
                  return (
                    <section className="mb-8 xs:mb-0">
                      <h3 className="text-xl">{cat.name}</h3>
                      {
                        skills.filter((skill: any) => skill.category.name === cat.name).map((item: any) => {
                          return (
                            <Suspense fallback={<></>}>
                              <SkillCard item={item} />
                            </Suspense>
                          )
                        })
                      }
                    </section>
                  )
                } else undefined
              })
            }
            <SkillCard item={[]} />
            <SkillCard item={[]} />
          </div>
          <div className='relative bottom-0 left-4 inline-block '>
            <div className='ml-10 text-2xl animate-bounce w-6 h-6 '>
              <FaArrowDown />
            </div>
            <Link href={'/skills'} passHref={true}>
              <a
                className="block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {content.seeMoreButton}
              </a>
            </Link>
          </div>
        </section>
        <div className="semicircle">
          <h3 className='text-white text-lg'>{content.certs}</h3>
        </div>
        <section className='relative top-8 right-4'>
          <div className="overflow-hidden">
            {
              certs.map((cert: any) => {
                return (
                  <Suspense fallback={<></>}>
                    <CertCard item={cert} />
                  </Suspense>
                )
              })
            }
            <SkillCard item={[]} />
            <SkillCard item={[]} />
          </div>
          <div className='relative top-0 mb-10 inline-block '>
            <div className='ml-10 text-2xl animate-bounce w-6 h-6 '>
              <FaArrowDown />
            </div>
            <Link href={'/skills'} passHref={true}>
              <a
                className="block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {content.seeMoreButton}
              </a>
            </Link>
          </div>
        </section>
      </main>
      {/* <div className="semicircle text-white text-lg">{content.experience}</div>
      <section>
        <div className="relative top-16 right-4 2xl:h-128 xl:h-128 lg:h-128 md:h-128 sm:h-138 xs:h-138 overflow-hidden">
          {

          }
          <SkillCard item={[]} />
          <SkillCard item={[]} />
        </div>
        <div className='relative bottom-20 inline-block '>
          <div className='ml-10 text-2xl animate-bounce w-6 h-6 '>
            <FaArrowDown />
          </div>
          <Link href={'/skills'} passHref={true}>
            <a
              className="block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {content.seeMoreButton}
            </a>
          </Link>
        </div>
      </section>
      <br /> */}
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await dbConnect();
    //Creating vars with promises to await them all in parallel
    const getLocale = Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('mainIndex').select('-__v');
    const getSkills = Skills.find({}).where('locale').equals(context.locale).select('-__v -locale').populate('category').limit(5);
    const getCerts = certificationsModel.find({}).where('locale').equals(context.locale).select('-__v -locale').limit(5);
    const getCategories = Categories.find({}).where('locale').equals(context.locale).select('-__v').limit(3);
    //Await all promises in parallel
    const [locale, skills, categories, certs] = await Promise.all([getLocale, getSkills, getCategories, getCerts]);

    //Some var is ruturn in json as getServerSideProps doesn't do the serialization itself
    return {
      props: {
        content: locale[0].content,
        skills: JSON.parse(JSON.stringify(skills)),
        categories: JSON.parse(JSON.stringify(categories)),
        certs: JSON.parse(JSON.stringify(certs)),
        locale: context.locale
      }
    }
  } catch (err) {
    return { props: { error: 'Something went wrong' } }
  }
}
