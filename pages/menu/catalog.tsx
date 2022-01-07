import type { NextPage } from 'next';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import Head from 'next/head';
const classes = require('./../../styles/catalog.module.css');
import { useState, useContext, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthContext from '../../contexts/authContext';
import Spinner from '../../components/Spinner';
import { Dish } from '../../interfaces/DishInterface';
import { imageHandler } from '../../controllers/imgController';
import { setAsFavorite, removeFavorite, getFavorites } from '../../controllers/menuController';
import { FaAngleUp, FaTrash, FaCog, FaRegFolderOpen, FaStar } from "react-icons/fa";

//*TODO move the controller module to a dynamic import form so only when the user is admin it loads
import { getItems, addNewItem, deleteItem, changeStateOfItem, updateItem, modifyItem } from '../../controllers/menuController';


const CatalogModal = dynamic(() => import('../../components/modals/catalogModal'))

const catalog: NextPage = () => {
    const router = useRouter();
    const [image, setImage] = useState<any>('');
    const { session }: any = useContext(AuthContext);
    const [items, setItems] = useState<Dish[]>();
    const [item, setItem] = useState<Dish>(); // Used to modify/update existing item
    const [favs, setFavs]: any = useState([]);
    const [isMounted, setIsMounted] = useState<Boolean>(true)
    const closeBtnRef = useRef<any>(undefined);
    const modalBtnRef = useRef<any>(undefined);

    useEffect(() => {
        if (!session) {
            router.replace('/')
        } else {
            if (isMounted) {
                getItems(session.token, setItems);
                getFavorites(session.user._id, session.token, setFavs)
            }
            setIsMounted(false)
        }
    }, [])

    const addNewItemHandler = (data: Dish) => {
        addNewItem(data, image, session.token, closeBtnRef)
    }

    const modifyItemHandler = (data: Dish) => {
        modifyItem(data, item, image, session.token, closeBtnRef)
    }

    const toggleCard = (id: string) => {
        document.getElementById(`itemBody_${id}`)?.classList.toggle(`${classes.itemIsForToday}`)
        document.getElementById(`activate_${id}`)?.classList.toggle(`${classes.isActive}`)
    }

    const toggleStar = (id: string) => {
        document.getElementById(`star_${id}`)?.classList.toggle(`${classes.isFavorite}`)
    }

    if (!isMounted) {
        return (
            <Suspense fallback={<Spinner />}>
                <Head>
                    <title>Catalogo</title>
                    <meta name="Catalogo" content="Catalogo de platillos" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>Catalogo</h1>
                <button type="button" className={`btn btn-primary ${classes.addButton}`} data-bs-toggle="modal" data-bs-target="#add" data-mdb-ripple-color="light" ref={modalBtnRef}>+</button>
                {/* Display items section */}
                <section>

                    {items?.map((item: any) => {
                        return (
                            <div key={item._id} id={`itemBody_${item._id}`} className={item.forToday ? `card d-inline-block mx-2 ${classes.itemIsForToday}` : `card d-inline-block mx-2`} >
                                {
                                    session?.user?.role === 'admin'
                                        ?
                                        <div>
                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar" className={`d-inline-block  ${classes.controlButtons}`} onClick={() => deleteItem(item._id, session.token)}><FaTrash /></span>
                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar" className={`d-inline-block  ${classes.controlButtons}`} onClick={() => updateItem(item, modalBtnRef, setItem)}><FaCog /></span>
                                            <span
                                                id={`activate_${item._id}`}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title={item.forToday ? "Desactivar" : "Activar"}
                                                className={item.forToday ? `d-inline-block  ${classes.controlButtons} ${classes.isActive}` : `d-inline-block  ${classes.controlButtons}`}
                                                onClick={() => changeStateOfItem(item._id, !item.forToday, session.token, toggleCard(item._id))}>
                                                <FaAngleUp />
                                            </span>
                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="Review" className={`d-inline-block  ${classes.controlButtons}`}>
                                                <Link href={`/menu/review/${item.id}`}>
                                                    <FaRegFolderOpen />
                                                </Link>
                                            </span>
                                            <span
                                                id={`star_${item._id}`}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Marcar como favorito"
                                                className={favs.includes(item._id) ? `d-inline-block  ${classes.controlButtons} ${classes.isFavorite}` : `d-inline-block  ${classes.controlButtons}`}
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
                                        :
                                        <div>
                                            <span className={`d-inline-block  ${classes.controlButtons}`} onClick={() => deleteItem(item._id, session.token)}><Image src='/assets/icons/chat.png' width={20} height={20} /></span>
                                            <span className={`d-inline-block  ${classes.controlButtons}`} onClick={() => deleteItem(item._id, session.token)}><Image src='/assets/icons/star.png' width={20} height={20} /></span>
                                        </div>
                                }

                                <div style={{ width: "15vw" }} id={`cardBody_${item._id}`}>
                                    <img className={`card-img-top`} id={`img_${item._id}`} src={`${item.image}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title" id={`title_${item._id}`}>{item.name}</h5>
                                        <p className="card-text" id={`description_${item._id}`}>{item.description}</p>
                                        <p className="card-text" id={`price_${item._id}`}>${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
                {/* Modal box */}
                {session?.user?.role === 'admin' ?? 'helper'
                    ?
                    <CatalogModal
                        items={items}
                        item={item}
                        modifyItemHandler={modifyItemHandler}
                        addNewItemHandler={addNewItemHandler}
                        image={image}
                        imageHandler={imageHandler}
                        setImage={setImage}
                        closeBtnRef={closeBtnRef}
                    />
                    : undefined}
            </Suspense>
        );
    } else return <></>
}

export default catalog;