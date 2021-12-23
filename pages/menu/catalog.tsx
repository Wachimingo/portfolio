import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
const classes = require('./../../styles/catalog.module.css');
import ImageFile from './../../components/previewUpload';
import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from './../../contexts/authContext';
import Spinner from './../../components/Spinner';

type Dish = {
    name: string;
    description: string;
    price: number;
    image: string;
}

const catalog: NextPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [image, setImage] = useState('');
    const { session }: any = useContext(AuthContext);
    const [items, setItems] = useState<Dish[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const closeBtnRef = useRef(null);

    useEffect(() => {
        getItems();
    }, [])

    // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
    function resizedataURL(datas: string, wantedWidth: number, wantedHeight: number) {
        return new Promise(async function (resolve, reject) {

            // We create an image to receive the Data URI
            var img = document.createElement('img');

            // When the event "onload" is triggered we can resize the image.
            img.onload = function () {
                // We create a canvas and get its context.
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // We set the dimensions at the wanted size.
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;

                // We resize the image with the canvas method drawImage();
                ctx?.drawImage(this, 0, 0, wantedWidth, wantedHeight);

                var dataURI = canvas.toDataURL();

                // This is the return of the Promise
                resolve(dataURI);
            };

            // We put the Data URI in the image's src attribute
            img.src = datas;

        })
    }

    const addNewItem = async (data: Dish) => {
        const optimizedImage = await resizedataURL(image, 100, 100)
        fetch('/api/dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.token}`
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                price: data.price,
                image: optimizedImage
            })
        }).then(res => res.json()).then(res => console.log(res)).then(() => closeBtnRef.current.click())
    }

    const getItems = async () => {
        fetch('/api/dish', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.token}`
            }
        })
            .then(res => res.json())
            .then(res => handleResponse(res))
    }

    const handleResponse = (response: Dish) => {
        // const optimizedImage = await resizedataURL(response.records.image, 500, 500)
        // response.records.image = optimizedImage
        setItems(response.records);
        setIsLoaded(true);
    }

    const imageHandler = (e: any) => {
        let reader = new FileReader();
        reader.onload = function (ev: any) {
            setImage(ev.target.result);
        }.bind(this);
        reader.readAsDataURL(e.target.files[0])
    }

    if (!isLoaded) {
        return <Spinner />
    }
    else {
        return (
            <div>
                <Head>
                    <title>Catalogo</title>
                    <meta name="Catalogo" content="Catalogo de platillos" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>Catalogo</h1>
                {/* Add new Item section */}
                <section>
                    <span data-bs-toggle="modal" data-bs-target="#add" data-mdb-ripple-color="light" style={{ cursor: " pointer" }}>
                        <div className="card" style={{ width: "10vw" }}>
                            <Image className={`card-img-top ${classes.addButton}`} src="/assets/cards/plus.png" alt="Card image cap" width={150} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Agregar Nuevo</h5>
                                <p className="card-text">Añadir nuevo platillo al catalogo</p>
                            </div>
                        </div>
                    </span>
                </section>
                {/* Display items section */}
                <section>
                    {items?.map((item: any) => {
                        // console.log(item.image)
                        return (
                            <div key={item._id} className="card d-inline-block mx-2" style={{ width: "10vw" }}>
                                <img className={`card-img-top`} src={`${item.image}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">${item.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </section>
                {/* Modal box */}
                <div className="modal fade" id="add" tabIndex={-1} aria-labelledby="add" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Añadir platillo</h5>
                                <button ref={closeBtnRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(addNewItem)}>
                                    {/**@Name input */}
                                    <div className="form mb3">
                                        <label className="form-lable" htmlFor="name">Nombre del platillo:</label>
                                        <input {...register("name", { required: true, maxLength: 50, pattern: /^[a-zA-Z ]+$/ })} type="text" name="name" className="form-control form-control-sm" />
                                    </div>
                                    {errors.name && <p className="text-danger">No ingresar numeros</p>}
                                    <br />
                                    {/**@Description input */}
                                    <div className="form mb3">
                                        <label className="form-lable" htmlFor="description">Descripcion del platillo:</label>
                                        <textarea {...register("description", { required: true, maxLength: 150 })} name="description" className="form-control form-control-sm" style={{ height: "15vh" }}></textarea>
                                    </div>
                                    {errors.description && <p className="text-danger">No ingresar caracteres especiales</p>}
                                    <br />
                                    {/**@Price input */}
                                    <div className="form mb3">
                                        <label className="form-lable" htmlFor="price">Precio del platillo:</label>
                                        <input {...register("price")} type="number" name="price" step="0.01" className="form-control form-control-sm" />
                                    </div>
                                    {errors.price && <p className="text-danger">Error</p>}
                                    <br />
                                    {/**@Img input */}
                                    <div className="mb3">
                                        <label className="form-lable" htmlFor="img">Foto del platillo:</label>
                                        <input {...register("img")} type="file" name="img" className="form-control form-control-sm" onChange={imageHandler} />
                                    </div>
                                    <div className={``}>
                                        <ImageFile imageURI={image} />
                                    </div>
                                    <br />
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-primary">Agregar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default catalog;