import { Dish, Response } from '../interfaces/DishInterface'
import { resizedataURL } from './imgController'

export const getItems = (setItems: Function) => {
    fetch('/api/dish?type=all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(res => handleResponse(res, setItems))
}

const handleResponse = (response: Response, stateFunction: Function) => {
    // console.log(response.records === undefined)
    if (response.records === undefined) {
        stateFunction(response);
    } else {
        stateFunction(response.records);
    }

}

export const getFavorites = (userId: string, token: string, setFavorites: Function) => {
    fetch(`/api/favoriteDish?userId=${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then((res) => handleResponse(res.records, setFavorites))
}

export const addNewItem = async (data: Dish, image: any, token: string, setShowModal: Function) => {
    const optimizedImage = await resizedataURL(image, 100, 100)
    fetch('/api/dish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data?.name,
            description: data?.description,
            price: data?.price,
            image: optimizedImage
        })
    }).then(res => res.json()).then(res => console.log(res)).then(() => setShowModal('hidden'))
}

export const modifyItem = async (data: Dish, item: Dish, image: any, token: string, setShowModal: Function) => {
    let optimizedImage: any = item?.image
    if (image) optimizedImage = await resizedataURL(image, 100, 100)

    fetch('/api/dish', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id: item?._id,
            name: data?.name ?? item?.name,
            description: data?.description ?? item?.description,
            price: data?.price ?? item?.price,
            image: optimizedImage,
            type: 'modify'
        })
    })
        .then(res => res.json())
        .then(res => document.location.reload())
        .then(() => setShowModal('hidden'))
}

export const updateItem = (data: Dish, setShowModal: Function, setItem: Function) => {
    setItem(data);
    setShowModal('')
}

export const deleteItem = (id: string, token: string) => {
    fetch('/api/dish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    })
}

// This function sets the item to either show it is in sale for the current day or not, if it is going to be sell in the current day and active border will be added to the div
export const changeStateOfItem = (id: string, state: boolean, token: string, toggleCard: void) => {
    fetch('/api/dish', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id,
            state,
            type: 'state'
        })
    })
}

export const setAsFavorite = (dishId: string, userId: string, token: string, toggleStar: void) => {
    fetch('/api/favoriteDish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    })
}

export const removeFavorite = (dishId: string, userId: string, token: string, toggleStar: void) => {
    fetch('/api/favoriteDish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    })
}

export const reviewItem = (dishId: string, userId: string, token: string) => {
    fetch('/api/review', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    })
}