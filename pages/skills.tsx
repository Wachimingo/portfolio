import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

const Skills = ({ skills }: any) => {
    const t = useTranslations('skills');
    return (
        <>
            <Head>
                <title>{t("title")}</title>
                <meta name={t("title")} content={t("content")} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-2xl">{t('description')}</h1>
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

export default Skills;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const result = await fetch(`http://127.0.0.1:3000/api/skills?locale=${context.locale}`);
        const data = await result.json();
        return {
            props: {
                skills: data,
                messages: {
                    ...require(`../public/static/messages/skills/${context.locale}.json`),
                    ...require(`../public/static/messages/navbar/${context.locale}.json`),
                },
            }
        }
    } catch (err) {

        return { props: { error: 'Something went wrong' } }
    }
}