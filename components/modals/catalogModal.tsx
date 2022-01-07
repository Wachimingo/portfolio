import { useForm } from 'react-hook-form';
import ImageFile from '../previewUpload';
const CatalogModal = (props: any) => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    setValue('name', props.item?.name)
    setValue('description', props.item?.description)
    setValue('price', props.item?.price)
    return (
        <div className="modal fade" id="add" tabIndex={-1} aria-labelledby="add" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.item ? 'Modifcar ' + props.item.name : 'Añadir platillo'}</h5>
                        <button ref={props.closeBtnRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={props.item ? handleSubmit(props.modifyItemHandler) : handleSubmit(props.addNewItemHandler)}>
                            {/**@Name input */}
                            <div className="form mb3">
                                <label className="form-lable" htmlFor="name">Nombre del platillo:</label>
                                <input id='formName' {...register("name", { required: true, maxLength: 50, pattern: /^[a-zA-Z ]+$/ })} type="text" name="name" className="form-control form-control-sm" />
                            </div>
                            {errors.name && <p className="text-danger">No ingresar numeros</p>}
                            <br />
                            {/**@Description input */}
                            <div className="form mb3">
                                <label className="form-lable" htmlFor="description">Descripcion del platillo:</label>
                                <textarea id='formDescription' {...register("description", { required: true, maxLength: 150 })} name="description" className="form-control form-control-sm" style={{ height: "15vh" }}></textarea>
                            </div>
                            {errors.description && <p className="text-danger">No ingresar caracteres especiales</p>}
                            <br />
                            {/**@Price input */}
                            <div className="form mb3">
                                <label className="form-lable" htmlFor="price">Precio del platillo:</label>
                                <input id='formPrice' {...register("price")} type="number" name="price" step="0.01" className="form-control form-control-sm" />
                            </div>
                            {errors.price && <p className="text-danger">Error</p>}
                            <br />
                            {/**@Img input */}
                            <div className="mb3">
                                <label className="form-lable" htmlFor="img">Foto del platillo:</label>
                                <input id="formImg" {...register("img")} type="file" name="img" className="form-control form-control-sm" onChange={(e) => props.imageHandler(e, props.setImage)} />
                            </div>
                            <br />
                            <div className={``}>
                                <ImageFile imageURI={props.item && !props.image ? props.item.image : props.image} />
                            </div>
                            <br />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">{props.item ? 'Modifcar' : 'Añadir'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogModal