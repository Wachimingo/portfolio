import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { useRouter } from "next/router"

const projectLayout = ({ children }: any) => {
    const router = useRouter();
    const [nav, setNav] = useState([]);

    useEffect(() => {
        getNav(router.pathname.split('/')[2]);
    }, [router.locale])

    const getNav = async (project: string) => {
        const result = await fetch(`/api/navbar?project=${project}&locale=${router.locale}`, {
            method: 'GET'
        });
        const navItems: any = result.ok ? await result.json() : undefined;

        setNav(navItems);
    }

    return (
        <>
            <SideBar
                project={router.pathname.split('/')[2]}
                nav={nav}
            />

            {children}
        </>
    )
}

export default projectLayout;