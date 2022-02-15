import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderCard } from "../../../components/Card";
import SideBar from "../../../components/sideBar";
import projectLayout from "../../../layouts/projectLayout"

const index = ({ orders, role, nav, Component, pageProps }: any) => {
    return (
        <>
            {
                orders.map((order: any, i: number) => {
                    return (
                        <div key={'order' + i}>
                            <OrderCard order={order} role={role} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default index;

index.Layout = projectLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let result: any = undefined;
        if (context.req.cookies.role !== 'user') {
            result = await fetch(`${process.env.managementBackend}/api/v1/bills/orders?status=status&ifValue=isPending`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}`
                }
            });
        } else {
            result = await fetch(`${process.env.managementBackend}/api/v1/bills/ownedOrders?status=status&ifValue=isPending`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}`
                }
            });
        }

        let orders = await result.json() ?? [];

        return {
            props: {
                orders: orders.records ?? [],
                role: context.req.cookies.role ?? null
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }

}