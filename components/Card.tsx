import { FaAngleUp, FaTrash, FaCog, FaRegFolderOpen, FaStar } from "react-icons/fa";
import { deleteItem, changeStateOfItem, updateItem, setAsFavorite, removeFavorite } from '../controllers/menuController';
import Link from 'next/link'
import { useState } from "react";
const classes = require('../styles/catalog.module.css');

const toggleCard = (id: string) => {
    document.getElementById(`itemBody_${id}`)?.classList.toggle(`${classes.itemIsForToday}`)
    document.getElementById(`activate_${id}`)?.classList.toggle(`${classes.isActive}`)
}

const toggleStar = (id: string) => {
    document.getElementById(`star_${id}`)?.classList.toggle(`${classes.isFavorite}`)
}

export const Card = (props: any) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{ width: "25vw" }}>
            <img className="w-full" id={`img_${props.item._id}`} src={`${props.item.image}`} alt={props.item.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2" id={`title_${props.item._id}`}>{props.item.name}</div>
                <p className="text-gray-700 text-base text-sm" id={`description_${props.item._id}`}>
                    {props.item.description}
                </p>
                <p className="text-gray-700 text-base" id={`price_${props.item._id}`}>
                    ${props.item.price}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.item.category.name}</span>
            </div>
        </div>
    )
}

export const ControlButtons = (props: any) => {
    const [state, setState] = useState(props.forToday)
    return (
        <div>
            <span
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Eliminar"
                className={`inline-block  ${classes.controlButtons}`}
                onClick={() => deleteItem(props.item._id, props.token)}>
                <FaTrash />
            </span>
            <span
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Modificar"
                className={`inline-block  ${classes.controlButtons}`}
                onClick={() => updateItem(props.item, props.setShowModal, props.setItem)}>
                <FaCog />
            </span>
            <span
                id={`activate_${props.item?._id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={props.item.forToday ? "Desactivar" : "Activar"}
                className={props.item.forToday ? `inline-block  ${classes.controlButtons} ${classes.isActive}` : `inline-block  ${classes.controlButtons}`}
                onClick={() => changeStateOfItem(props.item._id, state, props.token, toggleCard(props.item._id), setState(!state))}>
                <FaAngleUp />
            </span>
            <span data-bs-toggle="tooltip" data-bs-placement="top" title="Review" className={`inline-block  ${classes.controlButtons}`}>
                <Link href={`/projects/comedor/menu/review/${props.item?.id}`} passHref>
                    <a><FaRegFolderOpen /></a>
                </Link>
            </span>
            <span
                id={`star_${props.item._id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Marcar como favorito"
                className={props.favs.includes(props.item._id) ? `inline-block  ${classes.controlButtons} ${classes.isFavorite}` : `inline-block  ${classes.controlButtons}`}
                onClick={() => {
                    props.favs.includes(props.item._id)
                        ?
                        removeFavorite(props.item._id, props._id, props.token, toggleStar(props.item._id))
                        :
                        setAsFavorite(props.item._id, props._id, props.token, toggleStar(props.item._id))
                }}>
                <FaStar />
            </span>
        </div>
    )
}

export const OrderCard = ({ order, role }: any) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg card inline-block mx-2" style={{ width: "25vw" }} key={'order' + order._id}>
            <div className="px-6 py-4">
                {
                    role === 'admin'
                        ?
                        <div className="font-bold text-xl mb-2" >
                            <h5>
                                {order.customer !== '' ? 'Cliente: ' + order.customer : 'Orden realizada por: ' + order.user.name}
                            </h5>
                        </div>
                        : undefined
                }

                <p className="text-gray-700 text-base text-sm" >
                    Total de platos: {order.totalDishes}
                </p>
                <p className="text-gray-700 text-base" >
                    Precio: ${order.totalPrice}
                </p>
                <p className="text-gray-700 text-base" >
                    Fecha de orden: {order.createdAt}
                </p>
                {
                    order.status === 'isPending'
                        ?
                        <p className="text-red-700 text-base" >
                            <span className="text-gray-700">Estado:</span> Pendiente
                        </p> : undefined
                }
                {
                    order.status === 'isReady'
                        ?
                        <p className="text-green-700 text-base" >
                            <span className="text-gray-700">Estado:</span> Lista para retirar
                        </p> : undefined
                }
                {
                    order.status === 'completed'
                        ?
                        <p className="text-black text-base" >
                            <span className="text-gray-700">Estado:</span> Completada
                        </p> : undefined
                }
                <p className="text-gray-700 text-base" >
                    {order.isPaid ? 'Orden pagada' : 'Pago pendiente'}
                </p>
            </div>
            <ul className="text-left">
                {
                    order.body.map((dish: any, j: number) => {
                        return (
                            <li>{dish.name}</li>
                        )
                    })
                }
            </ul>
            <br />
            <OrderControls />
            <br />
        </div>
    )
}

export const OrderControls = ({ role }: any) => {
    return (
        <div>
            {
                role !== 'user'
                    ?
                    <button
                        // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    >
                        Orden Lista
                    </button> : undefined
            }

            <button
                // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                style={{ marginLeft: "2vw" }}
            >
                Cancelar
            </button>
        </div>
    )
}