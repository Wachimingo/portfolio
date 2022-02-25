import { GetServerSideProps } from "next";
import Head from "next/head";

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
            <section className="mt-8">
                {
                    skills.map((skill: any, i: number) => {
                        return (
                            <div key={'skill' + i} className='rounded shadow-lg inline-block overflow-hidden w-80 h-36 ml-2 break-words'>
                                <img className="w-8 inline-block" src={skill.icon} />
                                <h2 className="inline-block">{skill.name}</h2>
                                <progress className="inline-block ml-8" id={`skill_${skill.name}`} value={skill.level} max="100">{skill.level}%</progress>
                                <p>{skill.description}</p>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default skills;

import "../utils/dbConnection";
import Locale from "../models/localeModel";
import SkillsModel from "../models/skillsModel";
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = await Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('skills').select('-__v');
        const data = await SkillsModel.find({}).where('locale').equals(context.locale).select('-__v -locale');
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