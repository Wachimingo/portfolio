import { Dish, Response } from '../interfaces/DishInterface'
import { resizedataURL } from './imgController'

export const getItems = async (setItems: Function) => {
    const response = await fetch('/api/comedor/dish?type=all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json();
    if (response.ok) {
        setItems(data.records)
    } else {
        console.log(data.error.message)
    }
}

// const handleResponse = (response: Response, stateFunction: Function) => {
//     if (response.records === undefined) {
//         stateFunction(response);
//     } else {
//         stateFunction(response.records);
//     }

// }

export const getFavorites = async (userId: string, token: string, setFavorites: Function) => {
    const response = await fetch(`/api/comedor/favoriteDish?userId=${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // .then(res => res.json())
    // .then((res) => handleResponse(res.records, setFavorites))
    const data = await response.json();
    if (response.ok) {
        setFavorites(data)
    } else {
        console.log(data.error.message)
    }
}

export const addNewItem = async (dish: any, image: any, token: string, setShowModal: Function, setItem: Function) => {
    // console.table(data)
    const optimizedImage = await resizedataURL(image, 100, 100)
    const response = await fetch('/api/comedor/dish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: dish?.name,
            description: dish?.description,
            price: dish?.price,
            category: dish?.category,
            image: optimizedImage
        })
    })
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .then(() => {
    //     setShowModal('hidden')
    //     setItem(undefined)
    // })
    const data = await response.json()
    if (response.ok) {
        console.log(data);
        setShowModal('hidden');
        setItem(undefined)
    } else {
        console.log(data.error.message)
    }
}

export const modifyItem = async (data: any, item: Dish, image: any, token: string, setShowModal: Function, setItem: Function) => {
    let optimizedImage: any = item?.image
    if (image) optimizedImage = await resizedataURL(image, 100, 100)

    fetch('/api/comedor/dish', {
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
        .then(() => {
            setShowModal('hidden')
            setItem(undefined)
        })
}

export const updateItem = (data: Dish, setShowModal: Function, setItem: Function) => {
    setItem(data);
    setShowModal('')
}

export const deleteItem = async (id: string, token: string) => {
    const response = await fetch('/api/comedor/dish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
    } else {
        console.log(data.error.message)
    }
}

// This function sets the item to either show it is in sale for the current day or not, if it is going to be sell in the current day and active border will be added to the div
export const changeStateOfItem = async (id: string, state: boolean, token: string, toggleCard: void) => {
    const response = await fetch('/api/comedor/dish', {
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
    });

    const data = await response.json();
    if (!response.ok) console.log(data.error.message);
}

export const setAsFavorite = async (dishId: string, userId: string, token: string, toggleStar: void) => {
    const response = await fetch('/api/comedor/favoriteDish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });

    const data = await response.json();
    if (!response.ok) console.log(data.error.message);
}

export const removeFavorite = async (dishId: string, userId: string, token: string, toggleStar: void) => {
    const response = await fetch('/api/comedor/favoriteDish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });
    const data = await response.json();
    if (!response.ok) console.log(data.error.message)
}

export const reviewItem = async (dishId: string, userId: string, token: string) => {
    const response = await fetch('/api/comedor/review', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });
    const data = await response.json();
    if (!response.ok) console.log(data.error.message)
}