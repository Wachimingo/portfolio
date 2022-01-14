import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import Head from 'next/head';
const classes = require('./../../../styles/catalog.module.css');
import { useState, useContext } from 'react';
import Link from 'next/link'
import AuthContext from '../../../contexts/authContext';
// import Spinner from '../../../components/Spinner';
import { Dish, Favs } from '../../../interfaces/DishInterface';
import { imageHandler } from '../../../controllers/imgController';
import { setAsFavorite, removeFavorite } from '../../../controllers/menuController';
import { FaAngleUp, FaTrash, FaCog, FaRegFolderOpen, FaStar } from "react-icons/fa";

//*TODO move the controller module to a dynamic import form so only when the user is admin it loads
import { addNewItem, deleteItem, changeStateOfItem, updateItem, modifyItem } from '../../../controllers/menuController';

const CatalogModal = dynamic(() => import('../../../components/modals/catalogModal'));

interface propsType {
    items: Dish[],
    favs: Favs[],
}

const catalog = ({ items, favs }: propsType) => {
    const [image, setImage] = useState<any>('');
    const { session }: any = useContext(AuthContext);
    const [item, setItem] = useState<Dish>(); // Used to modify/update existing item
    const [showModal, setShowModal] = useState('hidden');

    const addNewItemHandler = (data: Dish) => {
        addNewItem(data, image, session.token, setShowModal)
    }

    const modifyItemHandler = (data: Dish) => {
        modifyItem(data, item, image, session.token, setShowModal)
    }

    const toggleCard = (id: string) => {
        document.getElementById(`itemBody_${id}`)?.classList.toggle(`${classes.itemIsForToday}`)
        document.getElementById(`activate_${id}`)?.classList.toggle(`${classes.isActive}`)
    }

    const toggleStar = (id: string) => {
        document.getElementById(`star_${id}`)?.classList.toggle(`${classes.isFavorite}`)
    }

    return (
        <>
            <Head>
                <title>Catalogo</title>
                <meta name="Catalogo" content="Catalogo de platillos" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Catalogo</h1>
            <button type="button" className={`bg-cyan-500 text-white ${classes.addButton}`} onClick={() => setShowModal('')}>+</button>
            {/* Display items section */}
            <section>
                {items?.map((item: any) => {
                    return (
                        <div key={item._id} id={`itemBody_${item._id}`} className={item.forToday ? `card inline-block mx-2 ${classes.itemIsForToday}` : `card inline-block mx-2`} >
                            {/* *TODO move the controller module to a dynamic import form so only when the user is admin it loads*/}
                            <div>
                                <span data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar" className={`inline-block  ${classes.controlButtons}`} onClick={() => deleteItem(item._id, session.token)}><FaTrash /></span>
                                <span data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar" className={`inline-block  ${classes.controlButtons}`} onClick={() => updateItem(item, setShowModal, setItem)}><FaCog /></span>
                                <span
                                    id={`activate_${item._id}`}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title={item.forToday ? "Desactivar" : "Activar"}
                                    className={item.forToday ? `inline-block  ${classes.controlButtons} ${classes.isActive}` : `inline-block  ${classes.controlButtons}`}
                                    onClick={() => changeStateOfItem(item._id, !item.forToday, session.token, toggleCard(item._id))}>
                                    <FaAngleUp />
                                </span>
                                <span data-bs-toggle="tooltip" data-bs-placement="top" title="Review" className={`inline-block  ${classes.controlButtons}`}>
                                    <Link href={`/comedor/menu/review/${item.id}`}>
                                        <FaRegFolderOpen />
                                    </Link>
                                </span>
                                <span
                                    id={`star_${item._id}`}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Marcar como favorito"
                                    className={favs.includes(item._id) ? `inline-block  ${classes.controlButtons} ${classes.isFavorite}` : `inline-block  ${classes.controlButtons}`}
                                    onClick={() => {
                                        favs.includes(item._id)
                                            ?
                                            removeFavorite(item._id, session.user._id, session.token, toggleStar(item._id))
                                            :
                                            setAsFavorite(item._id, session.user._id, session.token, toggleStar(item._id))
                                    }}>
                                    <FaStar />
                                </span>
                            </div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" id={`img_${item._id}`} src={`${item.image}`} alt="Sunset in the mountains" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2" id={`title_${item._id}`}>{item.name}</div>
                                    <p className="text-gray-700 text-base" id={`description_${item._id}`}>
                                        {item.description}
                                    </p>
                                    <p className="text-gray-700 text-base" id={`price_${item._id}`}>
                                        ${item.price}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
            {/* Modal box */}
            {
                session?.user?.role === 'admin' ?? 'helper'
                    ?
                    <CatalogModal
                        show={showModal}
                        items={items}
                        item={item}
                        modifyItemHandler={modifyItemHandler}
                        addNewItemHandler={addNewItemHandler}
                        image={image}
                        imageHandler={imageHandler}
                        setImage={setImage}
                        setShowModal={setShowModal}
                    />
                    : undefined
            }
        </>
    );
}

export default catalog;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const res1 = await fetch(`http://localhost:3000/api/dish?type=all`, {
            method: 'GET',
        })
        const items = await res1.json() ?? null;

        let res2 = undefined

        if (context.req.cookies.userId && context.req.cookies.userId) {
            res2 = await fetch(`http://localhost:3000/api/favoriteDish?userId=${context.req.cookies?.userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${context.req.cookies.token}`
                }
            })
        }
        let favs = undefined
        if (res2?.ok) favs = await res2.json();

        // console.log(favs)
        return { props: { items: items.records, favs: favs.records } }
    } catch (err) {
        return {
            notFound: true,
        };
    }
}