const classes = require('./../styles/star.module.css')

export const StarRating = () => {
    return (
        <form className={classes.rating}>
            <label>
                <input type="radio" name="stars" value="1" />
                <span className={classes.icon}>★</span>
            </label>
            <label>
                <input type="radio" name="stars" value="2" />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label>
                <input type="radio" name="stars" value="3" />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label>
                <input type="radio" name="stars" value="4" />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
            <label>
                <input type="radio" name="stars" value="5" />
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
                <span className={classes.icon}>★</span>
            </label>
        </form>
    )
}

export const drawStars = (amount: number) => {
    let starArray = ''
    for (let i = 0; i < amount; i++) {
        starArray = starArray + '★'
    }
    return starArray
}