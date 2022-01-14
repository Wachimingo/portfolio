export type Dish = {
    _id: string,
    ratingAverage: number,
    ratingsQuantity: number
    image: string;
    createdAt: Date,
    forToday: boolean,
    name: string;
    description: string;
    price: number;
} | undefined

export type Response = {
    records: Array<Dish> | undefined,
    status: string,
    totalRecords: number
}

export type Favs = {
    id: string
}