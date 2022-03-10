import Link from "next/link"
import { useState } from "react"
import { FaTrash, FaCog, FaAngleUp, FaRegFolderOpen, FaStar } from "react-icons/fa"
import { deleteItem, updateItem, changeStateOfItem, removeFavorite, setAsFavorite } from "../controllers/menuController"

const toggleCard = (id: string) => {
    document.getElementById(`itemBody_${id}`)?.classList.toggle('border-2')
    document.getElementById(`activate_${id}`)?.classList.toggle('text-lime-600')
}

const toggleStar = (id: string) => {
    document.getElementById(`star_${id}`)?.classList.toggle('text-amber-400')
}

const CatalogRowButtons = ({ title, icon, action, style }: any) => {
    return (
        <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={title}
            className={`inline-block border border-gray-600 hover:cursor-pointer px-2 py-2 hover:bg-gray-200 ${style}`}
            onClick={action}
        >
            {icon}
        </span>
    )
}

export const CatalogControls = ({ token, item, favs, setItem, setShowModal, userId }: any) => {
    const [state, setState] = useState(item!.forToday)
    return (
        <div className="xsm:text-2xl mt-2">
            <CatalogRowButtons
                title="Eliminar"
                icon={<FaTrash />}
                action={() => deleteItem(item!._id, token)}
            />
            <CatalogRowButtons
                title="Modificar"
                icon={<FaCog />}
                action={() => updateItem(item, setShowModal, setItem)}
            />
            <CatalogRowButtons
                title={item?.forToday ? "Desactivar" : "Activar"}
                icon={<FaAngleUp />}
                action={() => changeStateOfItem(item!._id, state, token, toggleCard(item!._id), setState(!state))}
                style={item?.forToday ? "text-lime-600" : undefined}
            />
            <CatalogRowButtons
                title='Review'
                icon={
                    <Link href={`/projects/comedor/menu/review/${item?._id}`} passHref>
                        <a><FaRegFolderOpen /></a>
                    </Link>
                }
            />
            <CatalogRowButtons
                title="Marcar como favorito"
                icon={<FaStar />}
                action={() => {
                    favs.includes(item!._id)
                        ?
                        removeFavorite(item!._id, userId, token, toggleStar(item!._id))
                        :
                        setAsFavorite(item!._id, userId, token, toggleStar(item!._id))
                }}
                style={
                    favs.includes(item!._id)
                        ?
                        'text-amber-400'
                        : undefined
                }
            />
        </div>
    )
}
