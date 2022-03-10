import { GetServerSideProps } from "next";
import Link from 'next/link';
import { useRouter } from "next/router";
// import "../../utils/dbConnection";
import ProjectModel from "../../models/projectModel";

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
    const router = useRouter();
    return (
        <>
            <h1 className="text-2xl">{router.locale === 'en' ? 'Projects' : 'Proyectos'}</h1>
            <br />
            <section className="inline-block">
                {
                    items.map((item: any, i: number) => {
                        return (
                            <Link key={'link' + i} href={{ pathname: item.link }}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg hover:cursor-pointer xl:w-80 sm:w-90">
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
import { connect } from "mongoose"
export const getServerSideProps: GetServerSideProps = async (context) => {
    const dev_db_url: string = 'mongodb://localhost:27017/portfolio'
    try {
        const cn = await connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true } as any)
        const data = await ProjectModel.find({}).where('locale').equals(context.locale).select('-__v');
        return {
            props: {
                items: JSON.parse(JSON.stringify(data))
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}