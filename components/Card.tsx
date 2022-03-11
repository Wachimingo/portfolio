import { Dish, Order } from "../interfaces/DishInterface";
import { updateStatus } from "../controllers/ordersController";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

type CardProps = {
    item: Dish,
}

export const Card = ({ item }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg samsungS8:w-32 content-center">
            <img className="w-screen" id={`img_${item?._id}`} src={`${item?.image}`} alt={item?.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2" id={`title_${item?._id}`}>{item?.name}</div>
                <p className="text-gray-700 text-base text-sm" id={`description_${item?._id}`}>
                    {item?.description}
                </p>
                <p className="text-gray-700 text-base" id={`price_${item?._id}`}>
                    ${item?.price}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item?.category?.name}</span>
            </div>
        </div>
    )
}

type OrderCardProps = {
    order: Order,
    role: string,
    token: string,
    locale?: string,
}

export const OrderCard = ({ order, role, token, locale }: OrderCardProps) => {
    return (
        <div key={'order' + order._id} className="max-w-sm rounded overflow-hidden shadow-lg card inline-block mx-2 xsm:w-screen" >
            <div className="px-6 py-4">
                {
                    role === 'admin'
                        ?
                        <div className="font-bold text-xl mb-2" >
                            <h5>
                                {locale === 'en' ? 'Submitter:' : 'Pedido por:'} {order.user.name}
                            </h5>
                        </div>
                        : undefined
                }

                <p className="text-gray-700 text-base text-sm" >
                    {locale === 'en' ? 'Total dishes' : 'Total de platos'}: {order.totalDishes}
                </p>
                <p className="text-gray-700 text-base" >
                    {locale === 'en' ? 'Payment' : 'Total a pagar'}: ${order.totalPrice}
                </p>
                <p className="text-gray-700 text-base" >
                    {locale === 'en' ? 'Date' : 'Fecha'}: {order.createdAt}
                </p>
                {
                    order.status === 'isPending'
                        ?
                        <p className="text-red-700 text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Pending' : 'Pendiente'}
                        </p> : undefined
                }
                {
                    order.status === 'isReady'
                        ?
                        <p className="text-green-700 text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Ready' : 'Lista'}
                        </p> : undefined
                }
                {
                    order.status === 'completed'
                        ?
                        <p className="text-black text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Completed' : 'Completado'}
                        </p> : undefined
                }
                <p className={`text-base ${order.isPaid ? 'text-green-700' : 'text-red-700'}`} >
                    {order.isPaid ? locale === 'en' ? 'Payed' : 'Pagado' : locale === 'en' ? 'Payment pending' : 'Pago pendiente'}
                </p>
            </div>
            <ul className="text-left">
                {
                    order.body.map((dish: any, j: number) => {
                        return (
                            <li key={"dishName" + j}>{dish.name}</li>
                        )
                    })
                }
            </ul>
            <br />
            <OrderControls role={role} token={token} orderId={order._id} currentStatus={order.status} locale={locale} />
            <br />
        </div>
    )
}

export const OrderControls = ({ role, token, orderId, currentStatus, locale }: any) => {
    return (
        <div>
            {
                role !== 'user'
                    ?
                    currentStatus === "completed" ? undefined
                        :
                        <button
                            onClick={() => currentStatus === "isPending" ? updateStatus(token, orderId, 'isReady') : updateStatus(token, orderId, 'completed')}
                            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                        >
                            {currentStatus === "isPending" ? locale === 'en' ? 'Set Ready' : 'Lista' : locale === 'en' ? 'Complete' : 'Copmletar'}
                        </button> : undefined
            }

            <button
                // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                style={{ marginLeft: "2vw" }}
            >
                {locale === 'en' ? 'Cancel' : 'Cancelar'}
            </button>
        </div>
    )
}

export const SkillCard = ({ item }: any) => {
    return (
        <div className='rounded shadow-lg inline-block overflow-hidden w-80 h-fit ml-8 break-words'>
            <br />
            <img className="w-8 inline-block" src={item.icon} />
            <h2 className="inline-block">{item.name ?? <div className="bg-slate-200 text-slate-200">_________</div>}</h2>
            <progress className="inline-block ml-8" id={`skill_${item.name}`} value={item.level} max="100">{item.level}%</progress>
            <p>{item.description}</p>
            <br />
        </div>
    );
}

export const CertCard = ({ item }: any) => {
    return (
        <Link href={item.link ?? ''} passHref>
            <a target="_blank" rel="noopener noreferrer">
                <div className='rounded shadow-lg inline-block overflow-hidden w-80 h-fit ml-8 break-words hover:cursor-pointer hover:bg-slate-300'>
                    <br />
                    <img className="w-8 inline-block" src={item.icon} />
                    <h2 className="inline-block">{item.name ?? <div className="bg-slate-200 text-slate-200">_________</div>}</h2>
                    <p>{item.description}</p>
                    <br />
                </div>
            </a>
        </Link>
    );
}