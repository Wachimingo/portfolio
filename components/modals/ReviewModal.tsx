import { useForm } from 'react-hook-form';
import { useEffect, memo } from 'react';
const classes = require('../../styles/modal.module.css');
import { closeButton, closeXButton, formInput, formLabel, h3Title, modalBox, submitButton } from '../../styles/modalsAndFormsInlineJS';
import { submitReview, modifyReview } from '../../controllers/reviewController';
export const ReviewModal: any = memo((props: any) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        if (props.review) {
            setValue('review', props.review.review);
        }
        if (props.showModal === 'hidden') {
            reset()
        }
    }, [props.showModal])

    const closeModal = () => {
        if (props.review) {
            modifyReview(props.userId, props.review._id, props.review.review, props.stars, props.token, props.setShowModal)
        }
        else {
            submitReview(props.userId, props.item._id, '', props.stars, props.token, props.setShowModal);
        }
        props.setShowModal('hidden');
    }

    return (
        <div id="review-modal" className={`${props.showModal} ${modalBox} ${classes.aligment}`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className={h3Title}>
                            {!props.review ? 'Reseñar' : `Modificar reseña de ${props.item.name}`}
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
                                !props.isNew
                                    ?
                                    handleSubmit((data: any) => modifyReview(props.userId, props.review._id, data.review, props.stars, props.token, props.setShowModal))
                                    :
                                    handleSubmit((data: any) => submitReview(props.userId, props.item._id, data.review, props.stars, props.token, props.setShowModal))}
                        >
                            {/**@Review input */}
                            <div className="form mb3">
                                <label className={formLabel} htmlFor="review">Reseña:</label>
                                <textarea id='formReview' {...register("review",
                                    {
                                        required: 'Ingrese la descripcion del producto',
                                        maxLength: { value: 150, message: 'No ingrese mas de 150 letras' }
                                    })} name="review" className={formInput} style={{ height: "15vh" }}></textarea>
                            </div>
                            {errors.review ? <p className="text-red-500">{errors.review.message}</p> : undefined}
                            <br />
                            <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" onClick={closeModal} className={closeButton}>Cerrar</button>
                                <button type="submit" className={submitButton}>{!props.isNew ? 'Modifcar' : 'Añadir'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
});