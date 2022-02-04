import { GetServerSideProps } from "next";
import Head from 'next/head'
import { useEffect, useState, useContext, useRef, Suspense } from "react";
import { useRouter } from "next/router";
import AuthContext from '../../../contexts/authContext';
import { Dish, Response } from '../../../interfaces/DishInterface'
import { Card } from "../../../components/Card";
import { FaTrashAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { toast } from "react-toastify";
import { increaseCount, decreaseCount, processTransaction } from "../../../controllers/menuController";
const classes = require('../../../styles/tooltip.module.css')

const sell = ({ role, userId, userName, items, token }: any) => {
    const [dishCounters, setDishCounters] = useState(() => items.map((x: any) => 0));
    const [selectedDishes, setSelectedDishes] = useState<any>([]);
    const [totalDishes, setTotalDishes] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

    }, [])
    //*TODO Clear screen after submit
    return (
        <>
            <Head>
                <title>{role !== 'user' ? 'Vender' : 'Comprar'}</title>
                <meta name="Vender" content={role !== 'user' ? 'Vender' : 'Comprar'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section>
                <h1>{role !== 'user' ? 'Vender platos' : 'Comprar'}</h1>
                <br />
                <div className='card inline-block mx-2'>
                    {
                        items.map((item: any, i: number) => {
                            return (
                                <div className="card inline-block mx-2">
                                    <div onClick={(e: any) => increaseCount(i, item, dishCounters[i], dishCounters, setDishCounters, totalDishes, setTotalDishes, selectedDishes, setSelectedDishes, totalPrice, setTotalPrice)} className={`${classes.tooltip} cursor-pointer hover:border-4 hover:border-cyan-600`}>
                                        <span className={classes.tooltiptext}>Añadir platillo</span>
                                        <Card item={item} />
                                    </div>
                                    <br />
                                    <button onClick={() => decreaseCount(i, item, dishCounters[i], dishCounters, setDishCounters, totalDishes, setTotalDishes, selectedDishes, setSelectedDishes, totalPrice, setTotalPrice)}
                                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                        style={{ width: "100%" }}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    <br />
                                    <p>{dishCounters[i]}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <br />
            <section>
                <p>Informacion de venta</p>
                <div className='card inline-block mx-2'>
                    <table className="table-auto border-2">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2">#</th>
                                <th className="border-2">Plato</th>
                                <th className="border-2">Cantidad</th>
                                <th className="border-2">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedDishes?.map((item: any, i: number) => {
                                    const index = items.indexOf(item); // as the counter state position of the items is based in the items array, we need to get the position in that variable, else the render won't find what to render
                                    return (
                                        dishCounters[index] > 0
                                            ?
                                            <>
                                                <tr className="border-2">
                                                    <td className="border-2">{i + 1}</td>
                                                    <td className="border-2">{item!.name}</td>
                                                    <td className="border-2">{dishCounters[index]}</td>
                                                    <td className="border-2">${dishCounters[index] * item!.price}</td>
                                                </tr>
                                            </>
                                            : undefined
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <table className="table-auto border-2">
                        <thead>
                            <tr className="border-2">
                                <th className="border-2">Total Platos</th>
                                <th className="border-2">Total a Pagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-2">
                                <td className="border-2">
                                    {totalDishes}
                                </td>
                                <td className="border-2">
                                    ${totalPrice}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
                <button
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                >
                    <FaThumbsDown /> Cancelar
                </button>
                <button
                    onClick={() => processTransaction(totalPrice, totalDishes, token, userId, undefined, selectedDishes, dishCounters, items)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    style={{ marginLeft: "2vw" }}
                >
                    <FaThumbsUp /> Procesar
                </button>
            </section>
        </>
    )
}

export default sell;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const res = await fetch(`${process.env.managementBackend}/api/v1/menu/forToday?limit=10`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + context.req.cookies.token
            }
        });

        const items = await res.json();

        // console.log(items)

        return {
            props: {
                items: items.data,
                role: context.req.cookies.role,
                userId: context.req.cookies.userId,
                userName: context.req.cookies.userName ?? '',
                token: context.req.cookies.token ?? ''
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}
