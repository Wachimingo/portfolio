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
                <Link href={`/comedor/menu/review/${props.item?.id}`} passHref>
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