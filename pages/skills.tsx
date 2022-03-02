import { GetServerSideProps } from "next";
import Head from "next/head";
import "../utils/dbConnection";
import Locale from "../models/localeModel";
import SkillsModel from "../models/skillsModel";

const skills = ({ skills, content }: any) => {
    return (
        <>
            <Head>
                <title>{content.title}</title>
                <meta name={content.title} content={content.content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-2xl">{content.description}</h1>
            <br />
            <section className="mt-8 grid xl:grid-cols-4 lg:grid-cols-2">
                {
                    skills.map((skill: any, i: number) => {
                        return (
                            <div key={'skill' + i} className='rounded shadow-lg xl:inline-block lg:inline-block overflow-hidden w-80 h-42 ml-2 break-words mb-4'>
                                <img className="w-8 inline-block" src={skill.icon} />
                                <h2 className="inline-block">{skill.name}</h2>
                                <progress className="inline-block ml-8" id={`skill_${skill.name}`} value={skill.level} max="100">{skill.level}%</progress>
                                <p>{skill.description}</p>
                                <div className="px-6 pt-4 pb-2">
                                    <span
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                    >
                                        #{skill?.category}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default skills;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        //Creating vars with promises to await them all in parallel
        const getLocale = Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('skills').select('-__v');
        const getSkills = SkillsModel.find({}).where('locale').equals(context.locale).select('-__v -locale');
        //Await all promises in parallel
        const [locale, data] = await Promise.all([getLocale, getSkills]);
        return {
            props: {
                skills: JSON.parse(JSON.stringify(data)),
                content: locale[0].content
            }
        }
    } catch (err) {
        return { props: { error: 'Something went wrong' } }
    }
}