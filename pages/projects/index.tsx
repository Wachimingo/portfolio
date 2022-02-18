import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Link from 'next/link';


type Project = {
    category: string,
    description: string,
    link: string,
    locale: string,
    name: string,
    status: string,
    _id: string
}

type ProjectsProps = {
    items: Project[],
}

const Projects = ({ items }: ProjectsProps) => {
    const t = useTranslations("index");
    return (
        <>
            <h1>{t("title")}</h1>
            <section className="card inline-block mx-2">
                {
                    items.map((item: any, i: number) => {
                        return (
                            <Link key={'link' + i} href={{ pathname: item.link }}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg hover:cursor-pointer" style={{ width: "25vw" }}>
                                    <img className="w-full" id={`img_${item._id}`} src={`${item.image}`} alt={item.name} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2" id={`title_${item._id}`}>{item.name}</div>
                                        <p className="text-gray-700 text-base text-sm" id={`description_${item._id}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item.category}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Projects;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const result = await fetch(`http://127.0.0.1:3000/api/projects?locale=${context.locale}`, {
            method: 'GET'
        });

        const data = await result.json();

        if (result.ok) {
            return {
                props: {
                    items: data,
                    messages: {
                        ...require(`../../messages/index/${context.locale}.json`),
                        ...require(`../../messages/navbar/${context.locale}.json`),
                    },
                }
            }
        } else {
            return {
                notFound: true
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}