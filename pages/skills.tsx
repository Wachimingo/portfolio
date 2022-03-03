import { GetServerSideProps } from "next";
import Head from "next/head";
import "../utils/dbConnection";
import Locale from "../models/localeModel";
import SkillsModel from "../models/skillsModel";
import Categories from "../models/categoriesModel";
import { SkillCard } from "../components/Card";

const skills = ({ skills, content, categories }: any) => {
    return (
        <>
            <Head>
                <title>{content.title}</title>
                <meta name={content.title} content={content.content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-2xl">{content.description}</h1>
            <br />
            <section >
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
            </section>
        </>
    )
}

export default skills;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        //Creating vars with promises to await them all in parallel
        const getLocale = Locale.find({}).where('locale').equals(context.locale).where('pageName').equals('skills').select('-__v').populate('Categories');
        const getSkills = SkillsModel.find({}).where('locale').equals(context.locale).select('-__v -locale');
        const getCategories = Categories.find({}).where('locale').equals(context.locale).select('-__v');
        //Await all promises in parallel
        const [locale, data, categories] = await Promise.all([getLocale, getSkills, getCategories]);
        return {
            props: {
                skills: JSON.parse(JSON.stringify(data)),
                categories: JSON.parse(JSON.stringify(categories)),
                content: locale[0].content
            }
        }
    } catch (err) {
        return { props: { error: 'Something went wrong' } }
    }
}
