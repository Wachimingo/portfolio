import { useForm } from 'react-hook-form';
import ImageFile from '../previewUpload';
const classes = require('../../styles/modal.module.css')
const CatalogModal = (props: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    setValue('name', props.item?.name)
    setValue('description', props.item?.description)
    setValue('price', props.item?.price)
    return (
        <div id="default-modal" className={`${props.show} overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${classes.aligment}`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                            {!props.item ? 'Añadir platillo' : `Modificar platillo ${props.item?.name}`}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal" onClick={() => props.setShowModal('hidden')}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={props.item ? handleSubmit(props.modifyItemHandler) : handleSubmit(props.addNewItemHandler)}>
                            {/**@Name input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre del platillo:</label>
                                <input id='formName' {...register("name", { required: true, maxLength: 50, pattern: /^[a-zA-Z ]+$/ })} type="text" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {errors.name && <p className="text-danger">No ingresar numeros</p>}
                            <br />
                            {/**@Description input */}
                            <div className="form mb3">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripcion del platillo:</label>
                                <textarea id='formDescription' {...register("description", { required: true, maxLength: 150 })} name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{ height: "15vh" }}></textarea>
                            </div>
                            {errors.description && <p className="text-danger">No ingresar caracteres especiales</p>}
                            <br />
                            {/**@Price input */}
                            <div className="form mb3">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio del platillo:</label>
                                <input id='formPrice' {...register("price")} type="number" name="price" step="0.01" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {errors.price && <p className="text-danger">Error</p>}
                            <br />
                            {/**@Img input */}
                            <div className="mb3">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">Foto del platillo:</label>
                                <input id="formImg" {...register("img")} type="file" name="img" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => props.imageHandler(e, props.setImage)} />
                            </div>
                            <br />
                            <div className={``}>
                                <img src={props.item && !props.image ? props?.item?.image : props?.image} className='w-20 ml-50' />
                            </div>
                            <br />
                            <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" onClick={() => props.setShowModal('hidden')} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cerrar</button>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{props.item ? 'Modifcar' : 'Añadir'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogModal