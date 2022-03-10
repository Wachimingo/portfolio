import { useForm } from 'react-hook-form';
import { useEffect, memo } from 'react';
const classes = require('../../styles/modal.module.css')
import { closeButton, closeXButton, formInput, formLabel, h3Title, modalBox, submitButton } from '../../styles/modalsAndFormsInlineJS';
import { modifyItem, addNewItem } from '../../controllers/menuController';

export const CatalogModal: any = memo((props: any) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        if (props.item) {
            setValue('name', props.item?.name);
            setValue('description', props.item?.description);
            setValue('price', props.item?.price);
            setValue('category', props.item?.category);
        }
        if (props.showModal === 'hidden') {
            reset()
        }
    }, [props.showModal])

    const closeModal = () => {
        props.setShowModal('hidden')
        props.setItem(undefined)
    }

    return (
        <div id="catalog-modal" className={`absolute top-16 left-1/2 ${props.showModal} ${modalBox} z-30`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className={h3Title}>
                            {!props.item ? 'Añadir platillo' : `Modificar platillo ${props.item?.name}`}
                        </h3>
                        <button type="button"
                            className={closeXButton}
                            onClick={closeModal}>
                            X
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                            onSubmit={
                                props.item
                                    ?
                                    handleSubmit((data) => modifyItem(data, props.item, props.image, props.token, props.setShowModal, props.setItem))
                                    :
                                    handleSubmit((data) => addNewItem(data, props.image, props.token, props.setShowModal))}
                        >
                            {/**@Name input */}
                            <div className="mb-4">
                                <label className={formLabel} htmlFor="name">Nombre del platillo:</label>
                                <input id='formName' {...register("name",
                                    {
                                        required: 'Ingrese el nombre del producto',
                                        maxLength: { value: 50, message: 'No ingrese mas de 50 letras para el nombre' },
                                        pattern: { value: /^[a-zA-Z ]+$/, message: 'No ingresar numeros' }
                                    })} type="text" name="name" className={formInput} />
                            </div>
                            {errors.name ? <p className="text-red-500">{errors.name.message}</p> : undefined}
                            <br />
                            {/**@Description input */}
                            <div className="form mb3">
                                <label className={formLabel} htmlFor="description">Descripcion del platillo:</label>
                                <textarea id='formDescription' {...register("description",
                                    {
                                        required: 'Ingrese la descripcion del producto',
                                        maxLength: { value: 150, message: 'No ingrese mas de 150 letras' }
                                    })} name="description" className={formInput} style={{ height: "15vh" }}></textarea>
                            </div>
                            {errors.description ? <p className="text-red-500">{errors.description.message}</p> : undefined}
                            <br />
                            {/**@Price input */}
                            <div className="form mb3">
                                <label className={formLabel} htmlFor="price">Precio del platillo:</label>
                                <input id='formPrice' {...register("price")} type="number" name="price" step="0.01" className={formInput} />
                            </div>
                            {errors.price ? <p className="text-red-500">{errors.price.message}</p> : undefined}
                            <br />
                            {/**@Categories input */}
                            <div className="form mb3">
                                <label className={formLabel} htmlFor="category">Categoria:</label>
                                <select id='formCategory' {...register("category")} name="category" className={formInput}>
                                    {
                                        props.categories.map((category: any, i: number) => {
                                            return (
                                                <option key={i} value={category._id}>
                                                    {category.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            {/**@Img input */}
                            <div className="mb3">
                                <label className={formLabel} htmlFor="img">Foto del platillo:</label>
                                <input id="formImg" type="file" name="img" className={formInput} onChange={(e) => props.imageHandler(e, props.setImage)} />
                            </div>
                            <br />
                            <div className={``}>
                                <img src={props.item && !props.image ? props?.item?.image : props?.image} className='w-20 ml-50' />
                            </div>
                            <br />
                            <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" onClick={closeModal} className={closeButton}>Cerrar</button>
                                <button type="submit" className={submitButton}>{props.item ? 'Modifcar' : 'Añadir'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
});
