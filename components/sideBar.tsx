import Link from "next/link";
import { Suspense, useContext, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import AuthContext from "../contexts/authContext";

type Nav = {
    link: string,
    name: string,
    project: string,
    projectId: string,
    role: Array<String>
}

type SideBarProps = {
    nav: Nav[],
    project: string
}

const SideBar = ({ nav, project }: SideBarProps) => {
    const [hide, setHide] = useState(false);
    const { session }: any = useContext(AuthContext);
    return (
        // <Suspense fallback={<>Loading</>}>
        <>
            <div className={`${hide ? 'hidden' : ''} fixed top-16 flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden z-10`}>
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-3xl uppercase text-indigo-500">{project}</h1>
                </div>
                <ul className="flex flex-col py-4">
                    {
                        nav.map((navItem: Nav, i: number) => {
                            // if (navItem.role.includes('user')) {
                            return (
                                <li key={'sideLink' + i}>
                                    <Link href={navItem.link}>
                                        <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                                            <span className="text-sm font-medium">{navItem.name}</span>
                                        </a>
                                    </Link>
                                </li>
                            )
                            // } else if (navItem.role.includes(session?.user?.role)) {
                            //     return (
                            //         <li key={'sideLink' + i}>
                            //             <Link href={navItem.link}>
                            //                 <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            //                     <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                            //                     <span className="text-sm font-medium">{navItem.name}</span>
                            //                 </a>
                            //             </Link>
                            //         </li>
                            //     )
                            // }
                        })
                    }
                </ul>
            </div>
            <button
                type="button"
                className={`fixed top-24 ${hide ? 'left-0' : 'left-52'} bg-white rounded-full flex text-black z-20 text-2xl`}
                onClick={() => { setHide(!hide) }}
            >
                {
                    hide
                        ? <FaArrowAltCircleRight />
                        : <FaArrowAltCircleLeft />}
            </button>
        </>
        // </Suspense> 
    )
}

export default SideBar;