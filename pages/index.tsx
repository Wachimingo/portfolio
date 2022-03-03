import type { GetServerSideProps } from 'next';
import { useContext } from 'react';
import AuthContext from './../contexts/authContext'
import Head from 'next/head';
import { SkillCard } from '../components/Card';
import "../utils/dbConnection";
import Locale from "../models/localeModel";
import Skills from "../models/skillsModel";
import Categories from "../models/categoriesModel";
import { FaFacebookF, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
const classes = require('./../styles/index.module.css');

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
        <div className={classes.curve}></div>
        <br />
        <div className={`inline-block ${classes.mainDiv}`}>
          <h1 className="text-2xl">Wachimingo</h1>
          <br />
          <p className="text-base">{content.welcome}</p>
        </div>
        <div className={`${classes.pic}`}>
          <Image
            src="/assets/profile.jpg"
            width={250}
            height={250}
          />
        </div>
      </main>
      <div className={classes.skillSection}>
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
      <footer className='bg-slate-800 text-white text-xl'>
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
  try {
    //Creating vars with promises to await them all in parallel
    const getLocale = Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('mainIndex').select('-__v');
    const getSkills = Skills.find({}).where('locale').equals(context.locale).select('-__v -locale').populate('category');
    const getCategories = Categories.find({}).where('locale').equals(context.locale).select('-__v');
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