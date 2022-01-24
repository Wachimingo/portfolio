import { memo, useEffect } from "react"

const classes = require('./../styles/star.module.css')

export const StarRating = memo((props: any) => {
    const starHandler = (star: number) => {
        props.setStars(star)
        props.setShowModal('')
    }
    useEffect(() => {
        const selectedStar = document.getElementById(`star${props.stars}`);
        selectedStar.checked = true
        // console.log(document.getElementById(`star${props.stars}`).checked)
    }, [props.star])
    return (
        <form className={classes.rating}>
            <label onClick={() => starHandler(1)}>
                <input type="radio" name="stars" value="1" id={`star${1}`} />
                <span className={classes.icon}>★</span>
            </label>
            <label onClick={() => starHandler(2)}>
                <input type="radio" name="stars" value="2" id={`star${2}`} />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label onClick={() => starHandler(3)}>
                <input type="radio" name="stars" value="3" id={`star${3}`} />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label onClick={() => starHandler(4)}>
                <input type="radio" name="stars" value="4" id={`star${4}`} />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label onClick={() => starHandler(5)}>
                <input type="radio" name="stars" value="5" id={`star${5}`} />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
        </form>
    )
});

export const drawStars = (amount: number) => {
    let starArray = ''
    for (let i = 0; i < amount; i++) {
        starArray = starArray + '★'
    }
    return starArray
}