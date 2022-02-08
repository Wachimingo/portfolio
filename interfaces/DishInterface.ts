export type Dish = {
    _id: string,
    ratingsAverage: number,
    ratingsQuantity: number
    image: string;
    createdAt: Date,
    forToday: boolean,
    name: string;
    description: string;
    price: number;
    category: string;
    reviews: [],
    favoriteQuantity: number
    __v: string
} | undefined

export type Response = {
    records: Array<Dish> | undefined,
    status: string,
    totalRecords: number
}

export type Favs = {
    id: string
}

export type Categories = {
    _id: string,
    name: string
}

export type SelectedDishes = {
    id: string,
    name: string,
    price: number
}