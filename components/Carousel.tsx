const carousel = require('../styles/carousel.module.css');

const Carousel = ({ items }: any) => {
    return (
        <div className="inline-block">
            <div className={carousel.slider}>
                {
                    items.map((item: any, i: number) => {
                        return (
                            <a key={`slideButton${i}`} href={`#slide-${i}`}>{i + 1}</a>
                        )
                    })
                }
                <div className={carousel.slides}>
                    {
                        items.map((item: any, i: number) => {
                            return (
                                <div key={`slide${i}`} id={`slide-${i}`}>
                                    <img className={carousel.img} src={item.image} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel;