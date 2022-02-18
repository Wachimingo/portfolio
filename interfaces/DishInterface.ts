import { User } from "./AuthInterface"

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
    category: any;
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
    price: number,
    quantity: number | undefined
}

export type Order = {
    isFiado: Boolean,
    status: string,
    isPaid: Boolean,
    _id: string,
    user: User,
    customer: string,
    totalDishes: number,
    totalPrice: number,
    paymentIntent: string,
    body: SelectedDishes[],
    createdAt: string,
    __v: number,
    id: string
}