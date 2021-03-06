import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { OrderCard } from "../../../components/Card";
import projectLayout from "../../../layouts/projectLayout"

const orders = ({ orders, role, token }: any) => {
    const router = useRouter();
    return (
        <>
            <br />
            <Link href={'/projects/comedor/orders?status=isPending'} passHref>
                <a
                    // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    style={{ marginLeft: "2vw" }}
                >
                    {router.locale === 'en' ? 'Pending' : 'Pendiente'}
                </a>
            </Link>
            <Link href={'/projects/comedor/orders?status=isReady'} passHref>
                <a
                    // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    style={{ marginLeft: "2vw" }}
                >
                    {router.locale === 'en' ? 'Ready' : 'Lista'}
                </a>
            </Link>
            <Link href={'/projects/comedor/orders?status=completed'} passHref>
                <a
                    // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                    className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                    style={{ marginLeft: "2vw" }}
                >
                    {router.locale === 'en' ? 'Completed' : 'Completado'}
                </a>
            </Link>
            <br />
            <br />
            {
                orders.map((order: any, i: number) => {
                    return (
                        <div key={'order' + i}>
                            <OrderCard order={order} role={role} token={token} locale={router.locale} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default orders;

orders.Layout = projectLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let result: any = undefined;
        if (context.req.cookies.role !== 'user') {
            result = await fetch(`${process.env.managementBackend}/api/v1/bills/orders?status=status&ifValue=${context.query.status ?? 'isPending'}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}`
                }
            });
        } else {
            result = await fetch(`${process.env.managementBackend}/api/v1/bills/ownedOrders?status=status&ifValue=${context.query.status ?? 'isPending'}`, {
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
                role: context.req.cookies.role ?? null,
                token: context.req.cookies.token ?? null,
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }

}